import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Address from "App/Models/Address";

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public phone: string;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Address, {
    localKey: "id",
    foreignKey: "clientId", //puxa pelo nome do campo no model
  })
  public addresses: HasMany<typeof Address>;
}
