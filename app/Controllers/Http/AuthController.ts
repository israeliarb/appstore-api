import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Admin from "App/Models/Admin";
import Client from "App/Models/Client";
import Institute from "App/Models/Institute";
import User from "App/Models/User";

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const user = await User.findByOrFail("email", email);

      let expire;

      switch (user.type) {
        case "clients":
          expire = "30days";
          break;
        case "institutes":
          expire = "7days";
        case "admins":
          expire = "1 days";
        default:
          expire = "30days";
          break;
      }
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: expire,
        name: user.serialize().email,
      });

      response.ok(token);
    } catch {
      return response.badRequest("Invalid credentials");
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use("api").revoke();
    } catch {
      return response.unauthorized("No authorization");
    }

    return response.ok({
      revoked: true,
    });
  }

  public async me({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();

    let data: any;

    switch (userAuth.type) {
      case "clients":
        const client = await Client.findByOrFail("userId", userAuth.id);
        data = {
          id_client: client.id,
          name: client.name,
          cpf: client.cpf,
          phone: client.phone,
          email: userAuth.email,
        };
        break;
      case "institutes":
        const institute = await Institute.findByOrFail("userId", userAuth.id);
        data = {
          id_institute: institute.id,
          name: institute.name,
          logo: institute.logo,
          active: institute.active,
          online: institute.online,
          email: userAuth.email,
        };
        break;
      case "admins":
        const admin = await Admin.findByOrFail("userId", userAuth.id);
        data = {
          id_admin: admin.id,
          name: admin.name,
          email: userAuth.email,
        };
        break;
      default:
        return response.unauthorized("Unauthorized user - type not found");
    }
    return response.ok(data);
  }
}
