import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    institute_id: schema.number([
      rules.exists({ table: "institutes", column: "id" }),
    ]),
    payment_type_id: schema.number([
      rules.exists({ table: "payment_types", column: "id" }),
    ]),
    observation: schema.string.nullableAndOptional({ trim: true }),
    products: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        product_id: schema.number([
          rules.exists({ table: "products", column: "id" }),
        ]),
        quantity: schema.number(),
        observation: schema.string.nullableAndOptional({ trim: true }),
      })
    ),
    address_id: schema.number([
      rules.exists({ table: "addresses", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
