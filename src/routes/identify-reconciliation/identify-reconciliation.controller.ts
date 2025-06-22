import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IdentityReconciliationService } from './identify-reconciliation.service';
import { IdentityReconciliationRequestDto } from './dto/identify-reconciliation-request.dto';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { IdentityReconciliationResponseDto } from './dto/identify-reconciliation-response.dto';

@ApiTags('Identify Reconciliation')
@Controller()
export class IdentifyReconciliationController {
  constructor(
    private readonly identifyReconciliationService: IdentityReconciliationService,
  ) {}

  @Post('/identify-reconciliation')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: IdentityReconciliationResponseDto })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async identifyReconciliation(
    @Body() request: IdentityReconciliationRequestDto,
  ): Promise<IdentityReconciliationResponseDto> {
    return this.identifyReconciliationService.reconcileIdentity(
      request.email,
      request.phoneNumber,
    );
  }
}
