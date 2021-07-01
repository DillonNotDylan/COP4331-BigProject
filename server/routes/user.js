import express from "express";

import { 
    signin, 
    signup 
} from "../controllers/user.js";

import { 
    getProjects, 
    getProject, 
    createProject, 
    updateProject, 
    deleteProject 
} from '../controllers/projects.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.get('/:id', getProjects);
router.get('/', getProject);
router.post('/:id', createProject);
router.patch('/', updateProject);
router.delete('/:id', deleteProject);

export default router;