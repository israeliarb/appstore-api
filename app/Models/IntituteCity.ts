import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class IntituteCity extends BaseModel {
  @column({ isPrimary: true })
  public city_id: number;

  @column({ isPrimary: true })
  public institute_id: number;

  @column()
  public delivery_costs: number;
}
