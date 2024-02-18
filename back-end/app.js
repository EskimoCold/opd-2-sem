const express = require('express');
require('dotenv').config(); // Make sure to call this early to load environment variables
const sequelize = require('./db/index');
const userRoutes = require('./routes/users');
const protectedRoutes = require('./routes/protectedRoute'); // Import the protected routes

const Quality = require('./db/models/Quality');
const Expert = require('./db/models/Expert');
const Rating = require('./db/models/Ratings');

const ratingRoutes = require('./routes/ratingRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', protectedRoutes); // Use the protected routes
app.use('/ratings', ratingRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await sequelize.sync();

        await Quality.create({ name: 'Some Quality' });
        await Expert.create({ name: 'Some Expert' });
        await Rating.create({ qualityId: 1, expertId: 1, points: 5 });

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

start();
