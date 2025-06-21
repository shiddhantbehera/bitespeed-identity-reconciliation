import { Global, Module } from '@nestjs/common';
import { ContactRepository } from './contact/contact.repository';

const repositories = [ContactRepository];

@Global()
@Module({
  imports: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
export * from './contact';
