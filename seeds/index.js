const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR OWN USER ID
      author: '621e2dea3fdb985ad8e040d0',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price: price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dxooznuv5/image/upload/v1646224491/cld-sample.jpg',
          filename: 'pic1',
        },
        {
          url: 'https://res.cloudinary.com/dxooznuv5/image/upload/v1646224469/sample.jpg',
          filename: 'pic2',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ea totam velit, maxime non sequi id fuga fugit? Debitis quidem natus quo possimus dolorum molestiae, eos eaque perferendis dolore a.',
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
