import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Institute from "App/Models/Institute";
import User from "App/Models/User";

export default class InstituteSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: "institute@email.com",
      password: "123456",
      type: "institutes",
    });
    await Institute.create({
      name: "Institute",
      logo: "https://webevolui.com.br/principal/images/web-evolui-logo.png",
      active: true,
      online: true,
      userId: user.id,
    });
  }
}
