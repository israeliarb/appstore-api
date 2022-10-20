import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary;
      table
        .integer("institute_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("institutes")
        .onDelete("RESTRICT");
      table.string("name").notNullable();
      table.string("description").nullable();
      table.string("position").notNullable();
      table.boolean("active").notNullable().defaultTo(true);

      table.timestamps(true, true);
      table.timestamp("deleted_at").nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
