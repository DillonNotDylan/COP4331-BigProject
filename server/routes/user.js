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
	getProjects,
	searchProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject
} from "../controllers/projects.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/reset-password", resetPass);
router.patch("/change-password", changePassword);
router.get("/verify-account", verifyAccount);
router.post("/resend-verification", resendVerificationEmail);
router.delete("/:id/shutdown-account", shutdownAccount);

router.get("/:id/get-projects", getProjects);
router.post("/get-project", getProject);
router.post("/:id/search-projects", searchProjects);
router.post("/:id/new-project", createProject);
router.patch("/update-project", updateProject);
router.delete("/:id/delete-project", deleteProject);

export default router;