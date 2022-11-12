import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import City from "./City";

export default class OrderAdress extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public city_id: number;

  @column()
  public street: string;

  @column()
  public number: string | null;

  @column()
  public district: string;

  @column()
  public cep: string;

  @column()
  public complement: string | null;

  @hasOne(() => City, {
    localKey: "city_id", //puxa pelo nome do campo no model
    foreignKey: "id",
  })
  public city: HasOne<typeof City>;
}
