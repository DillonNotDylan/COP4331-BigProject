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

		const { pid } = req.body;
		const project = await Project.findById(pid);

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

	try {

		const project = req.body;
		
		if (!mongoose.Types.ObjectId.isValid(project.pid)) return res.status(404).send(`Project id: ${project.pid} is not valid.`);
		await Project.findByIdAndUpdate(project.pid, { ...project, lastUpdate: new Date().toISOString() }, { new: true });

		res.json({ message: "Project updated successfully." });

	} catch (error) {

		res.json({ message: error.message });
	}
}

export const deleteProject = async (req, res) => {

	try {

		const { id } = req.params;
		const { projectId } = req.body;
		
		if (!mongoose.Types.ObjectId.isValid(projectId)) return res.status(404).send(`Project id: ${projectId} is not valid.`);
		await Project.findByIdAndRemove(projectId);

		const user = await UserModal.findById(id);
		const index = user.projects.indexOf(mongoose.Types.ObjectId(projectId));

		if (index > -1) user.projects.splice(index, 1);
		await UserModal.findByIdAndUpdate(id, user, { new: true });

		res.json({ message: "Project deleted successfully." });

	} catch (error) {

		res.json({ message: error.message });
	}
}

export default router;