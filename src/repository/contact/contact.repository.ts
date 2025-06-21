import { Contact, CreateContactParams } from '../../models';
import { FindAndCountOptions, FindOptions, Transaction } from 'sequelize';
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
}
