import express from "express";

import { 
    signin, 
    signup, 
    deleteUser
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
router.delete("/:id", deleteUser);

router.get("/:id", getProjects);
router.get("/:id/search", searchProjects);
router.get("/", getProject);
router.post("/:id", createProject);
router.patch("/", updateProject);
router.delete("/:id", deleteProject);

export default router;