const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startAt: {
    type: Date,
    required: 'Starting Date is require'
  },
  endAt: { type: Date, required: 'Ending Date is require' },
  days: Number,
  units: Number,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental' },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
