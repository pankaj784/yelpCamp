const mongoose = require('mongoose')
const Campground = require('../models/campground')
const { descriptors, places } = require('./seedHelper')
const cities = require('./cities')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 100; i++) {
        const rand = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            author: '62a977e5750d25afb6e72858',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand].city}, ${cities[rand].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand].longitude,
                    cities[rand].latitude,
                ]
            },
            price: Math.floor(Math.random() * 20) + 10,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            images: [
                { url : "https://res.cloudinary.com/dlgzuhlc6/image/upload/v1655474804/YelpCamp/xv1g2l8tirx1ke0jgikv.jpg",
                  filename : "YelpCamp/xv1g2l8tirx1ke0jgikv"}
            ],
        })
        const campground = await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
