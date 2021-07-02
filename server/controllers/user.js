import bcrypt from "bcryptjs";

import UserModal from "../models/user.js";
import Progression from "../models/progression.js";

export const signin = async (req, res) => {

	try {

		const { email, password } = req.body;
		const oldUser = await UserModal.findOne({ email });

		if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

		await UserModal.findByIdAndUpdate(oldUser._id, { lastLogin: new Date().toISOString() }, { new: true });
		res.status(200).json({ id: oldUser._id, email: oldUser.email });

	} catch (error) {

		res.status(500).json({ message: "Something went wrong" });
		console.log(error);
	}
};

export const signup = async (req, res) => {

	try {

		const { email, password } = req.body;
		const oldUser = await UserModal.findOne({ email });
		
		if (oldUser) return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await UserModal.create({ email, password: hashedPassword });

		res.status(201).json({ id: result._id, email: result.email });

	} catch (error) {

		res.status(500).json({ message: "Something went wrong" });
		console.log(error);
	}
};

export const deleteUser = async (req, res) => {

	try {

		const { id } = req.params;
		const user = UserModal.findById(id);

		for (let i = 0; i < user.progressions.length; i++)
			await Progression.findByIdAndRemove(user.progressions[i]);

		await UserModal.findByIdAndRemove(id);
		res.json({ message: "User deleted successfully." });

	} catch (error) {

		res.status(500).json({ message: "Something went wrong" });
	}
};