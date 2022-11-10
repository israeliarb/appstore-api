import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "institutes_cities";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("city_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cities");
      table
        .integer("institute_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("institutes");
      table.decimal("delivery_costs", 8, 2).notNullable();
      table.primary(["city_id", "institute_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
