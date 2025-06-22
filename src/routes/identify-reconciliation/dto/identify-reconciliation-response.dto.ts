import { ApiProperty } from '@nestjs/swagger';

export class UserContactsDto {
  @ApiProperty()
  primaryContactId!: number;

  @ApiProperty()
  emails!: string[];

  @ApiProperty()
  phoneNumbers!: string[];

  @ApiProperty()
  secondaryContactIds?: number[];
}

export class IdentityReconciliationResponseDto {
  @ApiProperty()
  contact!: UserContactsDto;
}
