const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Link Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB Connection String
// 'task_manager_db' is the database name that will be automatically created in MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/task_manager_db'; 

mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch((err) => {
        console.error('Database connection error:', err.message);
        process.exit(1); // Terminate process if database connection fails
    });

// Sample Route
app.get('/', (req, res) => {
    res.send('Task Manager API is running smoothly.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is operating on port ${PORT}`);
});