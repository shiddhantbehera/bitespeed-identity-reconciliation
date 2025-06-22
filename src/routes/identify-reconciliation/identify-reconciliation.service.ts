import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IdentityReconciliationResponseDto } from './dto/identify-reconciliation-response.dto';
import { ContactRepository } from '../../repository/contact/contact.repository';
import { Contact } from '../../models';
import { LinkPrecedence } from '../../common/enum/link-precedence.enum';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { mapIdentityReconciliationResponse } from './mapper';
import {
  emailAddressOrPhoneNumberNotProvided,
  primaryContactNotFound,
} from '../../common/exception/indentity-reconciliation.exception';

@Injectable()
export class IdentityReconciliationService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly sequelize: Sequelize,
  ) {}

  private async downgradeExtraPrimariesToSecondary(
    primaryContacts: Contact[],
    oldestPrimaryId: number,
  ): Promise<void> {
    const otherPrimaries = primaryContacts.filter(
      (contact) => contact.id !== oldestPrimaryId,
    );
    for (const contact of otherPrimaries) {
      await this.sequelize.transaction(async (transaction: Transaction) => {
        await this.contactRepository.updateContact(
          contact,
          {
            linkPrecedence: LinkPrecedence.SECONDARY,
            linkedId: oldestPrimaryId,
          },
          transaction,
        );
      });
    }
  }

  async reconcileIdentity(
    email?: string,
    phoneNumber?: string,
  ): Promise<IdentityReconciliationResponseDto> {
    try {
      if (!email && !phoneNumber) {
        throw new NotFoundException(
          emailAddressOrPhoneNumberNotProvided(email, phoneNumber),
        );
      }
      const existingContacts =
        await this.contactRepository.findContactsByEmailOrPhone(
          email,
          phoneNumber,
        );
      if (existingContacts.length === 0) {
        const newContact = await this.sequelize.transaction((transaction) =>
          this.contactRepository.createContact(
            {
              emailAddress: email,
              phoneNumber,
              linkPrecedence: LinkPrecedence.PRIMARY,
            },
            transaction,
          ),
        );
        return mapIdentityReconciliationResponse(newContact, [newContact]);
      }
      const primaryContacts = existingContacts.filter(
        (c) => c.linkPrecedence === LinkPrecedence.PRIMARY,
      );
      if (primaryContacts.length === 0) {
        throw new NotFoundException(primaryContactNotFound(email, phoneNumber));
      }
      primaryContacts.sort(
        (a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0),
      );
      const oldestPrimary = primaryContacts[0];
      await this.downgradeExtraPrimariesToSecondary(
        primaryContacts,
        oldestPrimary.id,
      );
      const hasExactMatch = existingContacts.some(
        (c) => c.emailAddress === email && c.phoneNumber === phoneNumber,
      );
      let newSecondaryContact: Contact | null = null;
      if (!hasExactMatch && (email || phoneNumber)) {
        newSecondaryContact = await this.sequelize.transaction((transaction) =>
          this.contactRepository.createContact(
            {
              emailAddress: email,
              phoneNumber,
              linkedId: oldestPrimary.id,
              linkPrecedence: LinkPrecedence.SECONDARY,
            },
            transaction,
          ),
        );
      }
      const linkedContacts =
        await this.contactRepository.findSecondaryByPrimaryId(oldestPrimary.id);
      const allContacts: Contact[] = [
        oldestPrimary,
        ...linkedContacts,
        ...(newSecondaryContact ? [newSecondaryContact] : []),
      ];
      return mapIdentityReconciliationResponse(oldestPrimary, allContacts);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
