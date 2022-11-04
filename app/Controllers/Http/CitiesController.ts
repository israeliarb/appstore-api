import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import City from "App/Models/City";

export default class CitiesController {
  public async index({ response }: HttpContextContract) {
    const cities = await City.query()
      .whereHas("institutes", (query) => {
        query.where("active", true);
      })
      .preload("state");

    return response.ok(cities);
  }
}
