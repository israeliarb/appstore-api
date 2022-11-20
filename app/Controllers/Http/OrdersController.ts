import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Address from "App/Models/Address";
import Client from "App/Models/Client";
import InstitutesCity from "App/Models/InstitutesCity";
import Order from "App/Models/Order";
import OrderAddress from "App/Models/OrderAddress";
import OrderProduct from "App/Models/OrderProduct";
import OrderStatus from "App/Models/OrderStatus";
import Product from "App/Models/Product";
import CreateOrderValidator from "App/Validators/CreateOrderValidator";
var randomstring = require("randomstring");

export default class OrdersController {
  public async store({ auth, response, request }: HttpContextContract) {
    const payload = await request.validate(CreateOrderValidator);

    const userAuth = await auth.use("api").authenticate();
    const client = await Client.findByOrFail("user_id", userAuth.id);

    // Hash do pedido
    let hash_ok: boolean = false;
    let hash_id: string = "";
    while (!hash_ok) {
      hash_id = randomstring.generate({
        length: 6,
        charset: "alphanumeric",
        capitalization: "uppercase",
      });

      const hash = await Order.findBy("hash_id", hash_id);

      if (!hash) {
        hash_ok = true;
      }
    }

    // Transaction criando pedido e atualizando as tabelas relacionadas

    const trx = await Database.transaction();

    const address = await Address.findByOrFail("id", payload.address_id);

    try {
      const adr = await OrderAddress.create({
        city_id: address.cityId,
        street: address.street,
        number: address.number,
        district: address.district,
        cep: address.cep,
        complement: address.complement,
      });

      // Busca o custo de entrega e calcula o valor total do pedido

      const instituteCity = await InstitutesCity.query()
        .where("institute_id", payload.institute_id)
        .where("city_id", address.cityId)
        .firstOrFail();

      let totalPrice: number = 0;
      for await (const product of payload.products) {
        const prod = await Product.findByOrFail("id", product.product_id);
        totalPrice += product.quantity * prod.price;
      }

      totalPrice = totalPrice + instituteCity.delivery_costs;

      totalPrice = parseFloat(Number(totalPrice).toFixed(2));

      const order = await Order.create({
        hash_id: hash_id,
        client_id: client.id,
        institute_id: payload.institute_id,
        payment_type_id: payload.payment_type_id,
        order_address_id: adr.id,
        total_price: totalPrice,
        delivery_price: instituteCity ? instituteCity.delivery_costs : 0,
        observation: payload.observation,
      });

      // Cadastra produtos

      payload.products.forEach(async (product) => {
        let getProduct = await Product.findByOrFail("id", product.product_id);

        await OrderProduct.create({
          order_id: order.id,
          product_id: product.product_id,
          unit_price: getProduct.price,
          quantity: product.quantity,
          observation: product.observation,
        });
      });
      await OrderStatus.create({
        order_id: order.id,
        status_id: 1,
      });

      // Confirma a transação
      await trx.commit();

      return response.ok(order);
    } catch (error) {
      await trx.rollback();
      return response.badRequest("Something gone wrong in the request" + error);
    }
  }

  public async index({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const client = await Client.findByOrFail("user_id", userAuth.id);

    const orders = await Order.query()
      .where("client_id", client.id)
      .preload("institute")
      .preload("order_status", (statusQuery) => {
        statusQuery.preload("status");
      })
      .orderBy("order_id", "desc");
    return response.ok(orders);
  }

  public async show({ params, response }: HttpContextContract) {
    const orderId = params.hash_id;

    const order = await Order.query()
      .where("hash_id", orderId)
      .preload("products", (productQuery) => {
        productQuery.preload("product");
      })
      .preload("client")
      .preload("address")
      .preload("institute")
      .preload("payment_type")
      .preload("order_status", (statusQuery) => {
        statusQuery.preload("status");
      })
      .first();

    if (order == null) {
      return response.notFound("Pedido não encontrado");
    }
  }
}
