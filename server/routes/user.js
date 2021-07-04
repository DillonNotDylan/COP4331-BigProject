import express from "express";

import {
	signin,
	signup,
	changePassword,
	verifyAccount,
	resendVerificationEmail,
	shutdownAccount
} from "../controllers/user.js";

import {
	getProgressions,
	searchProgressions,
	getProgression,
	createProgression,
	updateProgression,
	deleteProgression
} from "../controllers/progressions.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/reset-password", changePassword);
router.get("/verify-account/:token", verifyAccount);
router.post("/resend-verification", resendVerificationEmail);
router.delete("/:id/shutdown-account", shutdownAccount);

router.get("/:id/get-all", getProgressions);
router.get("/", getProgression);
router.get("/:id/search", searchProgressions);
router.post("/:id/new", createProgression);
router.patch("/update", updateProgression);
router.delete("/:id/remove", deleteProgression);

export default router;