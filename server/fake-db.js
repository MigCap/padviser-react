const Rental = require('./models/rental');

class FakeDb {
  constructor() {
    this.rentals = [
      {
        category: 'audio',
        type: 'Microphone',
        brand: 'Shure',
        model: 'SM58',
        description: 'Classic Mic',
        units: 4,
        condition: 'ok average',
        city: 'New York',
        street: 'Times Sqaure',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        dailyRate: 34
      },
      {
        category: 'video',
        type: 'Proyector',
        brand: 'Christie',
        model: 'C5000',
        description: '5000 Lumens proyector',
        units: 2,
        condition: 'mint',
        city: 'San Francisco',
        street: 'Main street',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        dailyRate: 12
      },
      {
        category: 'lights',
        type: 'Some lighting gear',
        brand: 'Robe',
        model: 'Robe-J3',
        units: 2,
        condition: 'bad',
        description: 'Some light description',
        city: 'Bratislava',
        street: 'Hlavna',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        dailyRate: 334
      }
    ];
  }

  async cleanDb() {
    await Rental.deleteMany({});
  }

  pushRentalstoDb() {
    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);

      newRental.save();
    });
  }

  seedDb() {
    this.cleanDb();
    this.pushRentalstoDb();
  }
}

module.exports = FakeDb;
