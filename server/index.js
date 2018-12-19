const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals'),
  userRoutes = require('./routes/users'),
  bookingRoutes = require('./routes/bookings'),
  imageUploadRoutes = require('./routes/image-upload');

mongoose
  .connect(
    config.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  });

mongoose.set('useCreateIndex', true);

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1', imageUploadRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log('App is running!');
});
