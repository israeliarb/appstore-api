import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run () {
    for (let instituteIndex = 1; instituteIndex <= 20; instituteIndex++){
      let category = await Category.create({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        position: 1,
        institute_id: instituteIndex,
      })

      await Product.createMany([
        {
          name: faker.commerce.productName(),
          image: faker.image.food(300, 300),
          description: faker.lorem.sentence(),
          price: faker.datatype.number({min: 5, max: 10, precision: 0.5}),
          category_id: category.id,
          position: 1,
          unit:  "KG",
        },
        {
          name: faker.commerce.productName(),
          image: faker.image.food(300, 300),
          description: faker.lorem.sentence(),
          price: faker.datatype.number({min: 5, max: 10, precision: 0.5}),
          category_id: category.id,
          position: 2,
          unit:  "KG",
        },
        {
          name: faker.commerce.productName(),
          image: faker.image.food(300, 300),
          description: faker.lorem.sentence(),
          price: faker.datatype.number({min: 5, max: 10, precision: 0.5}),
          category_id: category.id,
          position: 3,
          unit:  "UN",
        },
      ])
    }
  }
}
