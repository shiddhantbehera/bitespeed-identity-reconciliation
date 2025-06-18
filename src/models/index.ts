import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './contact';

const models = [Contact];

@Global()
@Module({
  imports: [SequelizeModule.forFeature(models)],
  exports: [SequelizeModule.forFeature(models)],
})
export class ModelsModule {}

export * from './contact';
