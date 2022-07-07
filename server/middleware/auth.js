import dotenv from "dotenv";
import SessionModal from "../models/session.js";

dotenv.config();

export const authenticate = async (req, res, next) => {

	try {

		const { ip, authToken } = req.body;

		const session = await SessionModal.findOne({ authToken });
		if (!session) return res.status(401).json({ message: "Invalid authentication token." });

		if (ip != session.ip) {
			await SessionModal.findByIdAndDelete(session._id);
			return res.status(401).json({ message: "IP address does not match active session." });
		}

		var timeElapsed = Date.now() - session.loginTime;
		var seconds = timeElapsed / 1000;
		var minutes = seconds / 60;
		var hours = minutes / 60;

		// console.log('hours passed:', hours);

		if (hours >= process.env.SESSION_LIMIT) {
			await SessionModal.findByIdAndDelete(session._id);
			return res.status(401).json({ message: "Authentication token expired." });
		}

		req.body.id = session._id;

		next();
	
	} catch (error) {

		console.log("Internal server error during authentication:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const finish = async (req, res) => {

	try {

		return res.status(200).json({ message: "Successfully authenticated user." });
	
	} catch (error) {

		console.log("Internal server error while finishing:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};