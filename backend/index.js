const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { readdirSync } = require('fs');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the Database
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Load routes dynamically
const loadRoutes = () => {
    readdirSync('./routes').forEach((route) => {
        app.use('/api/v1', require('./routes/' + route));
    });
};

// Initialize routes
loadRoutes();

// User authentication routes
const AuthRouter = require('./routes/userRoutes');
app.use('/api/v1/auth', AuthRouter);

// Start the server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
};

server();
