const { MongoClient } = require('mongodb');

// MongoDB connection URI
// const uri = "mongodb://root:password@127.0.0.1:27017";
const uri = "mongodb+srv://badbank1234:badbank1234@badbank.9ah3g.mongodb.net/?retryWrites=true&w=majority&appName=Badbank";;

// Create a MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Variable to store the database connection
let db;

// Connect to MongoDB and set up the database instance
async function connectToDB() {
    try {
        await client.connect();
        db = client.db('Badbank'); // Replace 'Badbank' with your database name if different
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

// Initialize the connection to MongoDB when this file is loaded
connectToDB();

// Function to create a new user in the 'users' collection
async function create(name, email, password) {
    if (!db) {
        console.error("Database connection not established");
        return null;
    }

    const usersCollection = db.collection('users');

    try {
        const result = await usersCollection.insertOne({ name, email, password, balance: 0 });
        return result.insertedId;
    } catch (err) {
        console.error("Error inserting user:", err);
        return null;
    }
}

// Function to find a user by email
async function find(email) {
    if (!db) {
        console.error("Database connection not established");
        return [];
    }

    const usersCollection = db.collection('users');

    try {
        const user = await usersCollection.findOne({ email });
        return user ? [user] : [];
    } catch (err) {
        console.error("Error finding user:", err);
        return [];
    }
}

// Function to update a user's balance
async function update(email, amount) {
    if (!db) {
        console.error("Database connection not established");
        return null;
    }

    const usersCollection = db.collection('users');

    try {
        const result = await usersCollection.findOneAndUpdate(
            { email },
            { $inc: { balance: amount } },
            { returnDocument: "after" }
        );
        return result.value;
    } catch (err) {
        console.error("Error updating user balance:", err);
        return null;
    }
}

async function update2(email, name, amount) {
    if (!db) {
        console.error("Database connection not established");
        return null;
    }

    const usersCollection = db.collection('users');

    try {
        const result = await usersCollection.findOneAndUpdate(
            { email },
            { $set: { name: name, balance: amount } },
            { returnDocument: "after" }
        );
        return result.value;
    } catch (err) {
        console.error("Error updating user balance:", err);
        return null;
    }
}

// Function to retrieve all users
async function all() {
    if (!db) {
        console.error("Database connection not established");
        return [];
    }

    const usersCollection = db.collection('users');

    try {
        const users = await usersCollection.find({}).toArray();
        return users;
    } catch (err) {
        console.error("Error retrieving all users:", err);
        return [];
    }
}

// Export the functions to match the names in index.js
module.exports = { create, find, update, update2, all };
