const mongoose = require('mongoose');
const Product = require('./src/models/product');
const Category = require('./src/models/category');


require('dotenv').config();

const insertSeedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {}
        ).then(() => {
            console.log("Connected to the database")
        }).catch(e => console.log(e));

        const categories = CATEGORY_GROUPS.reduce((prev, group) => prev.concat(group.categories), []);

       
        await Product.deleteMany()
        await Category.deleteMany()

        await Category.insertMany(
            categories
        );

        for (const product of products) {
            const category = await Category.findOne({ name: product.category });
            product.category = category._id;
        }
        await Product.insertMany(
            products
        );

        console.log(' data inserted successfully');
    } catch (error) {
        console.error('Error inserting  data:', error);

    } finally {
        try {
            await mongoose.connection.close();
            console.log('Connection closed');
        } catch (error) {
            console.error('Error closing connection:', error);
        }
    }
};



CATEGORY_GROUPS = [
    {
        groupName: 'Outerwear',
        categories: [
            { name: 'Rain Jackets', slug: 'rain-jackets' },
            { name: 'Winter Jackets', slug: 'winter-jackets' },
            { name: 'Puffer Jackets', slug: 'puffer-jackets' },
            { name: 'Parkas', slug: 'parkas' },
        ],
    },
    {
        groupName: 'Tops',
        categories: [
            { name: 'Shirts', slug: 'shirts' },
            { name: 'Vests', slug: 'vests' },
            { name: 'Sweaters', slug: 'sweaters' },
            { name: 'Thermal Shirts', slug: 'thermal-shirts' },
        ],
    },
    {
        groupName: 'Bottoms',
        categories: [
            { name: 'Pants', slug: 'pants' },
            { name: 'Leggings', slug: 'leggings' },
            { name: 'Thermal Pants', slug: 'thermal-pants' },
        ],
    },
    {
        groupName: 'Footwear',
        categories: [
            { name: 'Sneakers', slug: 'sneakers' },
            { name: 'Boots', slug: 'boots' },
            { name: 'Slippers', slug: 'slippers' },
        ],
    },
    {
        groupName: 'Accessories',
        categories: [
            { name: 'Gloves', slug: 'gloves' },
            { name: 'Hats', slug: 'hats' },
            { name: 'Umbrellas', slug: 'umbrellas' },
        ],
    },
];

const products = [
    {
        id: 1,
        name: 'Raincoat',
        price: 55,
        category: 'Rain Jackets',
        size: 'M',
        color: 'Black',
        imageUrl: '/images/rainwear_photos/black_rain_coat.jpg',
    },
    {
        id: 2,
        name: 'Puffer Coat',
        price: 65,
        category: 'Puffer Jackets',
        size: 'L',
        color: 'Black',
        imageUrl: '/images/rainwear_photos/black_rain_coat_2.jpg',
    },
    {
        id: 3,
        name: 'Raincoat',
        price: 50,
        category: 'Rain Jackets',
        size: 'M',
        color: 'Blue',
        imageUrl: '/images/rainwear_photos/blue_rain_coat.jpg',
    },
    {
        id: 4,
        name: 'Fur-Hooded Raincoat',
        price: 75,
        category: 'Rain Jackets',
        size: 'XL',
        color: 'Dark Blue',
        imageUrl: '/images/rainwear_photos/blue_fur_rain_coat.jpg',
    },
    {
        id: 5,
        name: 'Faux Fur Coat',
        price: 80,
        category: 'Puffer Jackets',
        size: 'XL',
        color: 'Light Brown',
        imageUrl: '/images/rainwear_photos/brown_fur_rain_coat.jpg',
    },
    {
        id: 6,
        name: 'Classic Raincoat',
        price: 48,
        category: 'Rain Jackets',
        size: 'S',
        color: 'Yellow',
        imageUrl: '/images/rainwear_photos/yellow_rain_coat.jpg',
    },
    {
        id: 7,
        name: 'Classic Hoodie',
        price: 55,
        category: 'Sweaters',
        size: 'L',
        color: 'Blue',
        imageUrl: '/images/rainwear_photos/blue_sweater.jpg',
    },
    {
        id: 8,
        name: 'Sweater',
        price: 60,
        category: 'Sweaters',
        size: 'M',
        color: 'Green',
        imageUrl: '/images/rainwear_photos/green_sweater.jpg',
    },
    {
        id: 9,
        name: 'Umbrella',
        price: 35,
        category: 'Umbrellas',
        size: 'One Size',
        color: 'Black',
        imageUrl: '/images/rainwear_photos/black_umbrella.jpg',
    },
    {
        id: 10,
        name: 'Umbrella',
        price: 30,
        category: 'Umbrellas',
        size: 'One Size',
        color: 'Blue',
        imageUrl: '/images/rainwear_photos/blue_umbrella.jpg',
    },
    {
        id: 11,
        name: 'Umbrella Set',
        price: 55,
        category: 'Umbrellas',
        size: 'One Size',
        color: 'Multi',
        imageUrl: '/images/rainwear_photos/umbrella_set.jpg',
    },
];



insertSeedData();