const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is require',
    min: [4, 'Username too short. Need to be at least 4 characters'],
    max: [12, 'Username too long. 12 characters max']
  },
  password: {
    type: String,
    required: 'Password is require',
    min: [8, 'Password must have at least 8 characters'],
    max: [15, 'Password is too long, max is 15 characters']
  },
  email: {
    type: String,
    required: 'Email is require',
    unique: true,
    lowercase: true,
    min: [4, 'Username too short. Need to be at least 4 characters'],
    max: [32, 'Too long. Max 32 characters'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  image: { type: String, required: true },
  stripeCustomerId: String,
  revenue: Number,
  rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental' }],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
