import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IdentityReconciliationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber!: string;
}
