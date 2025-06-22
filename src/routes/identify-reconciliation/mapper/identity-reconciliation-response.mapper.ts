import { Contact } from '../../../models';
import { IdentityReconciliationResponseDto } from '../dto/identify-reconciliation-response.dto';

export function mapIdentityReconciliationResponse(
  primaryContact: Contact,
  allContacts: Contact[],
): IdentityReconciliationResponseDto {
  const emails = Array.from(
    new Set(allContacts.map((c) => c.emailAddress).filter(Boolean)),
  );
  const phoneNumbers = Array.from(
    new Set(allContacts.map((c) => c.phoneNumber).filter(Boolean)),
  );
  const secondaryContactIds = Array.from(
    new Set(
      allContacts.filter((c) => c.id !== primaryContact.id).map((c) => c.id),
    ),
  );
  return {
    contact: {
      primaryContactId: primaryContact.id,
      emails: emails as string[],
      phoneNumbers: phoneNumbers as string[],
      secondaryContactIds,
    },
  };
}
