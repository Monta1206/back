const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/user.models');
const Category = require('../models/categories.models');
const MenuItem = require('../models/menuitems.models');
const Table = require('../models/table.models');

const connectDB = async () => {
   await mongoose.connect(process.env.mongoURI);    
    console.log("Database connected");
};


const seed = async () => {
    try {
        await connectDB();

        // Clear old data
        await User.deleteMany();
        await Category.deleteMany();
        await MenuItem.deleteMany();
        await Table.deleteMany();

        console.log("Old data deleted");


        // Create users
        const users = await User.create([
            {
                fullname: "Admin User",
                email: "admin@test.com",
                password: "Admin123",
                role: "admin"
            },
            {
                fullname: "Chef User",
                email: "chef@test.com",
                password: "Chef1234",
                role: "chef"
            },
            {
                fullname: "Waiter User",
                email: "waiter@test.com",
                password: "Waiter123",
                role: "waiter"
            }
        ]);

        console.log("Users created");


        // Create categories
        const categories = await Category.create([
            {
                name: "Pizza"
            },
            {
                name: "Drinks"
            },
            {
                name: "Desserts"
            }
        ]);

        console.log("Categories created");


        // Create menu items
        await MenuItem.create([
            {
                name: "Margherita Pizza",
                description: "Tomato sauce and cheese",
                price: 15,
                image: "uploads/pizza.jpg",
                category: categories[0]._id
            },
            {
                name: "Cola",
                description: "Cold soft drink",
                price: 3,
                image: "uploads/cola.jpg",
                category: categories[1]._id
            },
            {
                name: "Tiramisu",
                description: "Italian dessert",
                price: 8,
                image: "uploads/tiramisu.jpg",
                category: categories[2]._id
            }
        ]);

        console.log("Menu items created");


        // Create tables
        await Table.create([
            {
                tableNumber: 1
            },
            {
                tableNumber: 2
            },
            {
                tableNumber: 3
            }
        ]);

        console.log("Tables created");


        console.log("Seeding completed ✅");
        process.exit();

    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};


seed();