import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Client from "App/Models/Client";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: "client@email.com",
      password: "123456",
      type: "clients",
    });
    await Client.create({
      name: "Client",
      phone: "62 99999-9999",
      cpf: "00000000000",
      userId: user.id,
    });
  }
}
