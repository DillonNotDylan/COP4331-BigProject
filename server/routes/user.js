import express from "express";

import { 
    signin, 
    signup, 
    deleteUser
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
router.delete("/:id/deleteUser", deleteUser);

router.get("/:id", getProgressions);
router.get("/:id/search", searchProgressions);
router.get("/", getProgression);
router.post("/:id", createProgression);
router.patch("/", updateProgression);
router.delete("/:id", deleteProgression);

export default router;