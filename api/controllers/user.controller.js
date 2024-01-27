import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
export const test = (req, res) => {
	res.json({
		message: 'Testing API endpoint',
	});
};

export const updateUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return next(errorHandler(403, 'Forbidden'));
	}
	try {
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10);
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					avatar: req.body.avatar,
				},
			},
			{ new: true },
		);
		const { password, ...others } = updatedUser._doc;
		res.status(200).json(others);
	} catch (error) {
		next(error);
	}
};
