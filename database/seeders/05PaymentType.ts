import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Institute from 'App/Models/Institute';
import InstitutePaymentType from 'App/Models/InstitutePaymentType';
import PaymentType from 'App/Models/PaymentType'

export default class extends BaseSeeder {
  public async run () {
    await PaymentType.createMany([
      {name: "Dinheiro"},
      {name: "Cartão Crédito/Débito"},
      {name: "Pix"},
    ]);

    const institutes = await Institute.all();
    for(const institute of institutes) {
      await InstitutePaymentType.createMany([
        {
          institute_id: institute.id,
          payment_type_id: 1
        },
        {
          institute_id: institute.id,
          payment_type_id: 2
        },
        {
          institute_id: institute.id,
          payment_type_id: 3
        },
      ])
    }
  }
}
