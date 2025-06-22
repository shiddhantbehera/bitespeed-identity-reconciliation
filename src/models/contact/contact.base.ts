import { LinkPrecedence } from '@/common/enum/link-precedence.enum';
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

type CreationColumns =
  | 'emailAddress'
  | 'phoneNumber'
  | 'linkedId'
  | 'linkPrecedence';

export type CreateContactParams = Pick<ContactBase, CreationColumns>;

@Table({
  tableName: 'tbl_contact',
  underscored: true,
})
export class ContactBase extends Model<ContactBase, CreateContactParams> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  emailAddress?: string;

  @Column(DataType.STRING)
  phoneNumber?: string;

  @Column(DataType.INTEGER)
  linkedId?: number;

  @Column(DataType.ENUM(...Object.values(LinkPrecedence)))
  linkPrecedence?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}
