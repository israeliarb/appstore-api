import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "institute_payment_types";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("institute_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("institutes");
      table
        .integer("payment_type_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("payment_types");
      table.primary(["institute_id", "payment_type_id"]); //vincula tabelas muitos para muitos
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
