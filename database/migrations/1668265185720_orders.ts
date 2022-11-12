import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("hash_id").unique().notNullable();
      table
        .integer("client_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clients");
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
        .inTable("payment_type");
      table
        .integer("order_address_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("order_adresses");
      table.decimal("total_price", 10, 2).notNullable();
      table.decimal("delivery_price", 10, 2).notNullable().defaultTo(0);
      table.string("observation").nullable();

      table.timestamp("created_at").notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
