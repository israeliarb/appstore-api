import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class InstitutePaymentType extends BaseModel {
  @column({ isPrimary: true })
  public institute_id: number;

  @column({ isPrimary: true })
  public payment_type_id: number;
}
