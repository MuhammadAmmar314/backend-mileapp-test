import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/login", authRoutes);
app.use("/tasks", taskRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});