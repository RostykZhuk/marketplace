import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;
	const hashedPassword = await bcryptjs.hash(password, 10);
	const newUser = new User({ username, email, password: hashedPassword });
	try {
		await newUser.save();
		res.status(201).json('New user created successfully');
	} catch (error) {
		next(error);
	}
	console.log(username, email, password);
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, 'User not found'));
		}
		const validPassword = await bcryptjs.compare(password, validUser.password);
		if (!validPassword) {
			return next(errorHandler(401, 'Invalid password'));
		}
		const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		const { password: hashedPassword, ...rest } = validUser._doc;
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json(rest);
	} catch (error) {
		next(error);
	}
};

export const google = async (req, res, next) => {
	const { email, name, photo } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			const { password: pass, ...rest } = user._doc;
			res
				.cookie('access_token', token, {
					httpOnly: true,
				})
				.status(200)
				.json(rest);
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
			const newUser = new User({
				username:
					name.split(' ').join('').toLowerCase() +
					Math.random().toString(36).slice(-4),
				email,
				password: hashedPassword,
				avatar: photo,
			});
			await newUser.save();

			const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
			const { password: pass, ...rest } = newUser._doc;
			res
				.cookie('access_token', token, {
					httpOnly: true,
				})
				.status(200)
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};
