import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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
}
