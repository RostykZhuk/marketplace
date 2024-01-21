import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
dotenv.config();
const app = express();
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database is connected');
	})
	.catch(err => {
		console.log(err);
	});
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
