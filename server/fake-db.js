const Rental = require('./models/rental');

class FakeDb {
  constructor() {
    this.rentals = [
      {
        category: 'audio',
        type: 'Microphone',
        brand: 'Shure',
        model: 'SM58',
        description:
          'Legendary live vocal microphone known for its rugged reliability on tour.',
        units: 4,
        condition: 'Ok, Average',
        city: 'New York',
        street: 'Times Sqaure',
        image:
          'https://522bb370f5443d4fe5b9-f62de27af599bb6703e11b472beadbcc.ssl.cf2.rackcdn.com/product_image/zoomable_image/8248/SM58_HR.jpg',
        dailyRate: 34
      },
      {
        category: 'video',
        type: 'Proyector',
        brand: 'Barco',
        model: 'XDL-4K30',
        description:
          '30,000 lumens, 4K, 3-chip DLP RGB laser large venue projector',
        units: 2,
        condition: 'Mint',
        city: 'San Francisco',
        street: 'Main street',
        image:
          'https://az877327.vo.msecnd.net/~/media/images/products/u%20-%20z/xdl/xdl%204k60%20017%20onwhite%20jpg.jpg?v=2&mw=1200',
        dailyRate: 12
      },
      {
        category: 'lights',
        type: 'LED-based Moving Lights',
        brand: 'Robe',
        model: 'DL7S Profile',
        units: 2,
        condition: 'Bad',
        description:
          '800 W 7 colours LED engine. Rotating and static gobo wheel, animation wheel, framing shutters module, 5-facet rotating prism.',
        city: 'Bratislava',
        street: 'Hlavna',
        image:
          'https://cdn.robe.cz/fileadmin/_processed_/csm_dl7s-profile-01_33d201a970.png',
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
