import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";
import User from "App/Models/User";
import CreateClientValidator from "App/Validators/CreateClientValidator";

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClientValidator);

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      type: "clients",
    });

    const client = await Client.create({
      name: payload.name,
      cpf: payload.cpf,
      phone: payload.phone,
      userId: user.id,
    });

    return response.ok({
      id: client.id,
      name: client.name,
      cpf: client.cpf,
      email: user.email,
      phone: client.phone,
    });
  }
}
