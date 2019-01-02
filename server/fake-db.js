const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const Review = require('./models/review');
const Payment = require('./models/payment');
const fakeDbData = require('./data.json');

class FakeDb {
  constructor() {
    this.rentals = fakeDbData.rentals;
    this.users = fakeDbData.users;
  }

  async cleanDb() {
    await User.deleteMany({});
    await Rental.deleteMany({});
    await Booking.deleteMany({});
    await Payment.deleteMany({});
    await Review.deleteMany({});
  }

  pushDatatoDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach(rental => {
      if (rental.brand !== 'Yamaha') {
        const newRental = new Rental(rental);
        newRental.user = user;
        user.rentals.push(newRental);
        newRental.save();
      }
    });

    this.rentals.forEach(rental => {
      if (rental.brand === 'Yamaha') {
        const newRental = new Rental(rental);
        newRental.user = user2;
        user2.rentals.push(newRental);
        newRental.save();
      }
    });

    user.save();
    user2.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDatatoDb();
  }
}

module.exports = FakeDb;
