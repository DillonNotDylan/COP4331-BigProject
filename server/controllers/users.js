import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import SessionModal from "../models/session.js";

import { generateToken } from "../other/token.js";
import { getTransporter } from "../other/mail.js";

dotenv.config();

export const signup = async (req, res) => {

	try {

		const { email, password, nickname } = req.body;
		
		const user = await UserModal.findOne({ email });
		if (user) return res.status(400).json({ message: "Email already belongs to an existing user." });

		const hashedPassword = await bcrypt.hash(password, 11);
		const newUser = await UserModal.create({ email, password: hashedPassword, nickname });
		if (!newUser) return res.status(500).json({ message: "User could not be added to database." });

		const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
		const verificationUrl = `${process.env.BASE_URL}/user/verify-email/${verificationToken}`;

		const transporter = await getTransporter();
		if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		const mailOptions = {

			from: "Chordeographer <chordeographer.official@gmail.com>",
			to: email,
			subject: "Verify your email.",
			text: `Verify your email: ${verificationUrl}`,
			html: 	`<div>
						<img src="https://i.imgur.com/9CSWeNf.gif" alt="imgur gif" />
						<a href='${verificationUrl}'>Verify your email.</a>
					</div>`
		};

		const result = await transporter.sendMail(mailOptions);
		if (!result) return res.status(500).json({ message: "Could not send verification email to user." });
		return res.status(200).json({ result, message: "Successfully signed up. Verify your email before logging in." });

	} catch (error) {

		console.log("Internal server error during sign up:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const signin = async (req, res) => {

	try {

		const { ip, email, password } = req.body;
		
		const user = await UserModal.findOne({ email });
		if (!user) return res.status(400).json({ message: "Email does not belong to an existing user." });
		
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials." });

		if (!user.isVerified) return res.status(403).json({ message: "User has not verified their email." });
		await SessionModal.findByIdAndDelete(user._id);

		let authToken = "";
		do { authToken = generateToken(69); }
		while (await SessionModal.findOne({ authToken }));

		const session = await SessionModal.create({ _id: user._id, ip, authToken });
		if (!session) return res.status(500).json({ message: "Could not create logged in session for user." });
		await UserModal.findByIdAndUpdate(user._id, { lastLogin: Date.now() });

		return res.status(200).json({ authToken });

	} catch (error) {

		console.log("Internal server error during sign in:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const signout = async (req, res) => {

	try {

		const { authToken } = req.body;

		await SessionModal.findOneAndDelete({ authToken });
		return res.status(200).json({ message: "Successfully signed out." });

	} catch (error) {

		console.log("Internal server error during sign out:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const verifyEmail = async (req, res) => {

	try {

		const { verificationToken } = req.body;

		const payload = jwt.verify(verificationToken, process.env.JWT_SECRET);
		if (!payload.email) return res.status(401).json({ message: "Invalid verification token." });

		const user = await UserModal.findOne({ email: payload.email });
		if (!user) return res.status(400).json({ message: "Email not registered." });

		user.isVerified = true;
		await user.save();

		return res.status(200).json({ message: "Successfully verified email." });

	} catch (error) {

		console.log("Internal server error while verifying email:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const resendVerificationEmail = async (req, res) => {

	try {

		const { email } = req.body;

		const user = await UserModal.findOne({ email });
		if (!user) return res.status(400).json({ message: "Email not registered." });
		
		const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
		const verificationUrl = `${process.env.BASE_URL}/user/verify-email/${verificationToken}`;

		const transporter = await getTransporter();
		if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		const mailOptions = {

			from: "Chordeographer <chordeographer.official@gmail.com>",
			to: email,
			subject: "Verify your email.",
			text: `Verify your email: ${verificationUrl}`,
			html: 	`<div>
						<img src="https://i.imgur.com/9CSWeNf.gif" alt="imgur gif" />
						<a href='${verificationUrl}'>Verify your email.</a>
					</div>`
		};

		const result = await transporter.sendMail(mailOptions);
		if (!result) return res.status(500).json({ message: "Could not send verification email to user." });
		return res.status(200).json({ result, message: `Email verification link sent to ${email}.` });

	} catch (error) {

		console.log("Internal server error while resending verification email:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const tryReset = async (req, res) => {

	try {

		const { email } = req.body;

		const user = await UserModal.findOne({ email });
		if (!user) return res.status(400).json({ message: "Email not registered." });
		
		const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30m" });
		const resetUrl = `${process.env.BASE_URL}/user/reset-password/${verificationToken}`;

		const transporter = await getTransporter();
		if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		const mailOptions = {

			from: "Chordeographer <chordeographer.official@gmail.com>",
			to: email,
			subject: "Reset your password.",
			text: `Verify your email: ${resetUrl}`,
			html: `<div><a href='${resetUrl}'>Reset your password.</a></div>`
		};

		const result = await transporter.sendMail(mailOptions);
		if (!result) return res.status(500).json({ message: "Could not send email for password recovery." });
		return res.status(200).json({ result, message: `Password reset link sent to ${email}.` });

	} catch (error) {

		console.log("Internal server error while trying to reset password:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const resetPassword = async (req, res) => {

	try {

		const { verificationToken, password } = req.body;
		
		const payload = jwt.verify(verificationToken, process.env.JWT_SECRET);
		if (!payload.email) return res.status(401).json({ message: "Invalid verification token." });

		const user = await UserModal.findOne({ email: payload.email });
		if (!user) return res.status(400).json({ message: "Email not registered." });

		const hashedPassword = await bcrypt.hash(password, 12);
		user.password = hashedPassword;
		await user.save();

		return res.status(200).json({ message: "Successfully reset password." });

	} catch (error) {

		console.log("Internal server error during authentication:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};