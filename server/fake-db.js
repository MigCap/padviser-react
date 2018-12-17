const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
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
  }

  pushDatatoDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save();
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
