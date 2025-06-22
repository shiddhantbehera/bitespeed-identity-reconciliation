import { Contact, CreateContactParams } from '../../models';
import {
  FindAndCountOptions,
  FindOptions,
  Op,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { LinkPrecedence } from '../../common/enum/link-precedence.enum';
import { InjectModel } from '@nestjs/sequelize';

export class ContactRepository {
  constructor(
    @InjectModel(Contact)
    private readonly contactModel: typeof Contact,
  ) {}

  async createContact(
    contact: CreateContactParams,
    transaction?: Transaction,
  ): Promise<Contact> {
    return this.contactModel.create(contact, { transaction });
  }

  async findOneByClause(whereClause: FindOptions<Contact>) {
    return this.contactModel.findOne(whereClause);
  }

  async findAllByClause(whereClause: FindOptions<Contact>) {
    return this.contactModel.findAll(whereClause);
  }

  async findAll() {
    return this.contactModel.findAll();
  }

  async updateContact(
    contact: Contact,
    attributesToUpdate: Partial<Contact>,
    transaction?: Transaction,
  ): Promise<boolean> {
    const recordUpdated = await contact.update(attributesToUpdate, {
      transaction,
    });
    return !!recordUpdated;
  }

  findAndCountAllByClause(clause: FindAndCountOptions<Contact>) {
    return this.contactModel.findAndCountAll(clause);
  }

  async findContactsByEmailOrPhone(
    email?: string,
    phoneNumber?: string,
  ): Promise<Contact[]> {
    const whereOptions: WhereOptions<Contact> = {};
    if (email && phoneNumber) {
      whereOptions[Op.and] = [
        {
          [Op.or]: [{ emailAddress: email }, { phoneNumber }],
        },
      ];
    } else if (email) {
      whereOptions[Op.and] = [{ emailAddress: email }];
    } else if (phoneNumber) {
      whereOptions[Op.and] = [{ phoneNumber }];
    }
    return this.contactModel.findAll({ where: whereOptions });
  }

  async findSecondaryByPrimaryId(primaryId: number): Promise<Contact[]> {
    return this.contactModel.findAll({
      where: {
        linkedId: primaryId,
        linkPrecedence: LinkPrecedence.SECONDARY,
      },
    });
  }
}
