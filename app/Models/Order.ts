import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Order extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public hash_id: string;

  @column()
  public client_id: number;

  @column()
  public institute_id: number;

  @column()
  public payment_type_id: number;

  @column()
  public order_address_id: number;

  @column()
  public total_price: number;

  @column()
  public delivery_price: number;

  @column()
  public observation: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
}
