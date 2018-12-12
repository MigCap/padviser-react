const Rental = require('./models/rental');
const User = require('./models/user');

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
        country: 'USA',
        city: 'New York',
        street: 'Times Square',
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
        country: 'USA',
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
        country: 'Slovakia',
        city: 'Bratislava',
        street: 'Hlavna',
        image:
          'https://cdn.robe.cz/fileadmin/_processed_/csm_dl7s-profile-01_33d201a970.png',
        dailyRate: 334
      }
    ];

    this.users = [
      {
        username: 'Test User',
        email: 'test@gmail.com',
        password: 'testtest'
      }
    ];
  }

  async cleanDb() {
    await User.deleteMany({});
    await Rental.deleteMany({});
  }

  pushDatatoDb() {
    const user = new User(this.users[0]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save();
    });

    user.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDatatoDb();
  }
}

module.exports = FakeDb;
