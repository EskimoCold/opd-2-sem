const express = require('express');
require('dotenv').config(); // Make sure to call this early to load environment variables
const sequelize = require('./db/index');
const userRoutes = require('./routes/users');
const protectedRoutes = require('./routes/protectedRoute'); // Import the protected routes

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', protectedRoutes); // Use the protected routes

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

start();
