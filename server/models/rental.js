const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  category: { type: String, required: true, lowercase: true },
  type: {
    type: String,
    required: true,
    max: [100, 'Too long, max is 100 characters']
  },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  units: Number,
  description: { type: String, required: true },
  condition: { type: String, required: true },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    min: [4, 'Too short, min is 4 characters']
  },
  image: { type: String, required: true },
  dailyRate: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rental', rentalSchema);
