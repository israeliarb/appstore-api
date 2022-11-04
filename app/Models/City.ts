import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Institute from "./Institute";
import State from "./State";

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public state_id: number;

  @column()
  public name: string;

  @column()
  public active: boolean;

  @hasOne(() => State, {
    foreignKey: "id",
    localKey: "state_id",
  })
  public state: HasOne<typeof State>;

  @manyToMany(() => Institute, {
    pivotTable: "institutes_cities",
    localKey: "id",
    pivotForeignKey: "city_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "institute_id",
  })
  public institutes: ManyToMany<typeof Institute>
}
