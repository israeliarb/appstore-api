import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Institute from "App/Models/Institute";
import User from "App/Models/User";
import { faker } from "@faker-js/faker";
import State from "App/Models/State";
import City from "App/Models/City";
import InstitutesCity from "App/Models/InstitutesCity";

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

    for (let i = 2; i <= 20; i++) {
      await User.create({
        email: `institute${i}@email.com`,
        password: "123456",
        type: "institute,",
      });
    }

    for (let i = 2; i <= 20; i++) {
      await Institute.create({
        name: `Institute ${i}`,
        logo: `http://picsum.photos/id/${i}/200/200`,
        active: true,
        online: true,
        userId: i,
      });
    }

    await State.createMany([
      {
        name: "Goias",
        uf: "GO",
      },
      {
        name: "Distrito Federal",
        uf: "DF",
      },
    ]);

    await City.createMany([
      {
        name: "Anápolis",
        state_id: 1,
      },
      {
        name: "Águas Claras",
        state_id: 2,
      },
    ]);

    for (let i = 1; i <= 20; i++) {
      await InstitutesCity.create({
        city_id: faker.datatype.number({ min: 1, max: 2}),
        institute_id: i,
        delivery_costs: faker.datatype.float({
          min: 0,
          max: 10,
          precision: 0.01,
        }),
      });
    }
  }
}
