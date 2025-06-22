import { Module } from '@nestjs/common';
import { IdentityReconciliationService } from './identify-reconciliation.service';
import { IdentifyReconciliationController } from './identify-reconciliation.controller';

@Module({
  imports: [],
  providers: [IdentityReconciliationService],
  controllers: [IdentifyReconciliationController],
  exports: [IdentityReconciliationService],
})
export class IdentifyReconciliationModule {}
