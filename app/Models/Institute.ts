import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";
import PaymentType from "./PaymentType";

export default class Institute extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public name: string;

  @column()
  public logo: string | null;

  @column()
  public active: boolean;

  @column()
  public online: boolean;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Category, {
    foreignKey: "institute_id",
    localKey: "id",
  })
  public categories: HasMany<typeof Category>;

  @manyToMany(() => PaymentType, {
    pivotTable: "institute_payment_types",
    localKey: "id",
    pivotForeignKey: "institute_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "payment_type_id",
  })
  public paymenttypes: ManyToMany<typeof PaymentType>;
}
