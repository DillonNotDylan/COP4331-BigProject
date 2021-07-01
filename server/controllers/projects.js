import express from 'express';
import mongoose from 'mongoose';

import UserModal from '../models/user.js';
import Project from '../models/project.js';

const router = express.Router();

export const getProjects = async (req, res) => { 

	try {
		
		const { id } = req.params;
		const user = await UserModal.findById(id);
		res.status(200).json({ projects: user.projects });

	} catch (error) {
	
		res.status(404).json({ message: error.message });
	}
}

export const getProject = async (req, res) => { 

	try {

		const { projectId } = req.body;
		const project = await Project.findById(projectId);
		
		res.status(200).json(project);
	
	} catch (error) {
	
		res.status(404).json({ message: error.message });
	}
}

export const createProject = async (req, res) => {

	try {

		const { id } = req.params;
		const project = req.body;
		
		const newProject = new Project({ ...project });
		await newProject.save();
		
		const user = await UserModal.findById(id);
		user.projects.push(newProject._id);
		
		await UserModal.findByIdAndUpdate(id, user, { new: true });
		res.status(201).json(newProject);

	} catch (error) {

		res.status(409).json({ message: error.message });
	}
}

export const updateProject = async (req, res) => {

	res.json({ message: "updateProject call successful" });
}

export const deleteProject = async (req, res) => {

	res.json({ message: "deleteProject call successful" });
}

export default router;