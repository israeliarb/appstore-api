import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import City from "App/Models/City";
import Institute from "App/Models/Institute";
import InstitutesCity from "App/Models/InstitutesCity";
import Order from "App/Models/Order";

export default class InstitutesController {
  public async orders({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const institute = await Institute.findByOrFail("user_id", userAuth.id);

    const orders = await Order.query()
      .where("institute_id", institute.id)
      .preload("client")
      .preload("order_status", (statusQuery) => {
        statusQuery.preload("status");
      })
      .orderBy("order_id", "desc");

    return response.ok(orders);
  }

  public async show({ params, response }: HttpContextContract) {
    const instituteId: number = params.id;
    let citiesArray: any = [];
    const cities = await InstitutesCity.query().where(
      "institute_id",
      instituteId
    );

    for await (const city of cities) {
      const city_ = await City.findByOrFail("id", city.city_id);
      citiesArray.push({
        id: city_.id,
        city: city_.name,
        delivery_costs: city.delivery_costs,
      });
    }

    const institute = await Institute.query()
      .where("id", instituteId)
      .preload("categories", (categoriesQuery) => {
        categoriesQuery.preload("products");
      })
      .preload("paymenttypes")
      .firstOrFail();

    return response.ok({
      id: institute.id,
      name: institute.name,
      logo: institute.logo,
      active: institute.active,
      online: institute.online,
      cities: citiesArray,
      payment_types: institute.paymenttypes,
      categories: institute.categories,
    });
  }
}
