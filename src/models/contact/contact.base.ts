import { LinkPrecedence } from '@/common/enum/link-precedence.enum';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  IsUUID,
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
  @IsUUID('all')
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  emailAddress?: string;

  @Column(DataType.STRING)
  phoneNumber?: string;

  @Column(DataType.INTEGER)
  linkedId?: number;

  @Column(DataType.ENUM(...Object.values(LinkPrecedence)))
  linkPrecedence?: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  status!: boolean;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}
