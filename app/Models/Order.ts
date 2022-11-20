import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Client from "App/Models/Client";
import OrderStatus from "App/Models/OrderStatus";
import Institute from "./Institute";
import PaymentType from "./PaymentType";
import OrderAddress from "App/Models/OrderAddress";
import OrderProduct from "./OrderProduct";

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

  @hasOne(() => Client, {
    foreignKey: "id",
    localKey: "client_id",
  })
  public client: HasOne<typeof Client>;

  @hasMany(() => OrderStatus, {
    foreignKey: "order_id",
    localKey: "id",
  })
  public order_status: HasMany<typeof OrderStatus>;

  @hasOne(() => Institute, {
    foreignKey: "id",
    localKey: "institute_id",
  })
  public institute: HasOne<typeof Institute>;

  @hasMany(() => OrderProduct, {
    foreignKey: "order_id",
    localKey: "id",
  })
  public products: HasMany<typeof OrderProduct>;

  @hasOne(() => OrderAddress, {
    foreignKey: "id",
    localKey: "order_address_id",
  })
  public address: HasOne<typeof OrderAddress>

  @hasOne(() => PaymentType, {
    foreignKey: "id",
    localKey: "payment_type_id",
  })
  public payment_type: HasOne<typeof PaymentType>
}
