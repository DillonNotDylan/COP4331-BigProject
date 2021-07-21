import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

import UserModal from "../models/user.js";
import Project from "../models/project.js";

dotenv.config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
	   user: process.env.EMAIL,
	   pass: process.env.EMAIL_PASSWORD,
	},
});

var __dirname = path.resolve();

export const signin = async (req, res) => {

	try {

		const { email, password } = req.body;
		const oldUser = await UserModal.findOne({ email });

		if (!oldUser) return res.send({ message: "User doesn't exist." });
		if (!oldUser.verified) return res.send({ message: "User email is not verified." });

		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
		if (!isPasswordCorrect) return res.send({ message: "Invalid credentials." });

		await UserModal.findByIdAndUpdate(oldUser._id, { lastLogin: new Date().toISOString() }, { new: true });
		return res.json({ id: oldUser._id, nickname: oldUser.nickname });

	} catch (error) {

		console.log(error);
		return res.send({ message: error.message });
	}
};

export const signup = async (req, res) => {

	try {

		const { email, password, nickname } = req.body;
		const oldUser = await UserModal.findOne({ email });
		
		if (oldUser) return res.send({ message: "User already exists." });

		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await UserModal.create({ email, nickname, password: hashedPassword });
		
		const verificationToken = await jwt.sign(
			{ id: result._id },
			process.env.VERIFICATION_SECRET,
			{ expiresIn: "12h" }
		);
		const url = `https://chordeo-grapher.herokuapp.com/user/verify-account/${verificationToken}`;

		transporter.sendMail({
			to: email,
			subject: 'Verify your Chordeographer account.',
			html: 	`<div><img src="https://i.imgur.com/9CSWeNf.gif" alt="imgur gif here" /></div>
					<div><a href = '${url}'>Verify your email.</a></div>`
		});

		return res.send({ message: `Email verification link sent to '${email}'.` });

	} catch (error) {

		console.log(error);
		return res.send({ message: error.message });
	}
};

export const changePassword = async (req, res) => {

	try {

		const { email, password } = req.body;
		if (!email) return res.send({ message: "Missing user email." });

		const user = await UserModal.findOne({ email: email });
		if (!user) return res.send({ message: "Email not registered." });

		const hashedPassword = await bcrypt.hash(password, 12);
		user.password = hashedPassword;
		await user.save();

		return res.send({ message: "Password successfully changed." });
	
	} catch (error) {
		
		console.log(error);
		return res.send({ message: error.message });
	}
}

export const resetPass = async (req, res) => {

	try {

		const { email } = req.body;
		const oldUser = await UserModal.findOne({ email });
		
		if (oldUser) return res.send({ message: "User already exists." });
		
		const verificationToken = await jwt.sign(
			{ id: result._id },
			process.env.VERIFICATION_SECRET,
			{ expiresIn: "12h" }
		);
		
		const url = `https://chordeo-grapher.herokuapp.com/user/verify-account/${verificationToken}`;

		transporter.sendMail({
			to: email,
			subject: 'Verify your Chordeographer account.',
			html: 	`<div style=display: block; margin: auto; width: 50%;><img src="https://i.imgur.com/9CSWeNf.gif" alt="ayyeee" /></div>
					<div style=text-align: center;><a href = '${url}'>Confirm your email.</a></div>`
		});

		return res.send({ message: `Email verification link sent to '${email}'.` });

	} catch (error) {

		console.log(error);
		return res.send({ message: error.message });
	}
}

export const verifyAccount = async (req, res) => {

	try {

		const { token } = req.params;
		if (!token) return res.send({ message: "Missing verification token." });

		let payload = jwt.verify(token, process.env.VERIFICATION_SECRET);

		const user = await UserModal.findById(payload.id);
		if (!user) return res.send({ message: "Verification token invalid." });

		user.verified = true;
		await user.save();

		// return res.send({ message: "Account successfully verified." });
		return res.sendFile(path.resolve("html/verification.html"));
	
	} catch (error) {
		
		console.log(error);
		return res.send({ message: error.message });
	}
}

export const resendVerificationEmail = async (req, res) => {

	try {

		const { email } = req.body;
		const user = await UserModal.findOne({ email });
		
		if (!user) return res.send({ message: "Email not registered." });
		
		const verificationToken = await jwt.sign(
			{ id: user._id },
			process.env.VERIFICATION_SECRET,
			{ expiresIn: "12h" }
		);
		const url = `https://chordeo-grapher.herokuapp.com/user/verify-account/${verificationToken}`;

		transporter.sendMail({
			from: 'Chordeographer',
			to: email,
			subject: 'Verify your email.',
			html: 	`<div style=display: block; margin: auto; width: 50%><img src="https://i.imgur.com/9CSWeNf.gif" alt="ayyeee" /></div>
					<div style=text-align: center;><a href = '${url}'>Verify your email.</a></div>`
		});

		return res.send({ message: `Email verification link sent to '${email}'.` });

	} catch (error) {

		console.log(error);
		return res.send({ message: error.message });
	}
}

export const shutdownAccount = async (req, res) => {

	try {

		const { id } = req.params;
		const user = await UserModal.findById(id);

		if (!user) return res.send({ message: "User id not found." });

		for (let i = 0; i < user.projects.length; i++)
			await Project.findByIdAndRemove(user.projects[i]);

		await UserModal.findByIdAndRemove(id);
		return res.send({ message: "User deleted successfully." });

	} catch (error) {

		console.log(error);
		return res.send({ message: error.message });
	}
};