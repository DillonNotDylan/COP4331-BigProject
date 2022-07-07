import dotenv from 'dotenv';

import UserModal from '../models/user.js';
import ProjectModal from '../models/project.js';

dotenv.config();

// 200 Ok
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found
// 500 Internal Error

export const uploadProject = async (req, res) => {

	try {

		const { id, project } = req.body;

		const newProject = await ProjectModal.create(project);
		if (!newProject) return res.status(500).json({ message: "Failed to create project." });

		await UserModal.findByIdAndUpdate(id, { $push: { projects: newProject._id }});
		return res.status(200).json({ pid: newProject._id });

	} catch (error) {

		console.log("Internal server error while uploading project:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const updateProject = async (req, res) => {

	try {

		const { id, pid, project } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "Invalid user ID." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(403).json({ message: "Project does not belong to user or project ID is invalid." });
		await ProjectModal.findByIdAndUpdate(pid, { ...project, lastUpdate: Date.now() });
		
		return res.status(200).json({ message: "Successfully updated project." });

	} catch (error) {

		console.log("Internal server error while updating project:", error.message);
		return res.status(200).json({ message: error.message });
	}
};

export const deleteProject = async (req, res) => {

	try {

		const { id, pid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "Invalid user ID." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(403).json({ message: "Project does not belong to user or project does not exist." });

		await UserModal.findByIdAndUpdate(id, { $pull: { projects: pid }});
		await ProjectModal.findByIdAndDelete(pid);

		return res.status(200).json({ message: "Successfully deleted project." });

	} catch (error) {

		console.log("Internal server error while deleting project:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const searchProjects = async (req, res) => {

	try {

		const { id, criteria } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "Error: Invalid user ID." });

		const projects = [];

		for (let i in user.projects) {

			const project = await ProjectModal.findById(user.projects[i]);
			if (!project) continue;

			for (let j in criteria) {
				var addToList = true;
				let criterianRegex = new RegExp(criteria[j], "gi");
				if (!criterianRegex.test(project[j])) {
					addToList = false;
					break;
				}
			}

			if (addToList) {

				const pid = project._doc._id;
				delete project._doc._id;
				delete project._doc.__v;
				projects.push({ pid, ...project._doc });
			}
		}
		
		return res.status(200).json({ projects });

	} catch (error) {

		console.log("Internal server error while searching projects:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getProject = async (req, res) => {

	try {

		const { id, pid } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "User ID does not exist." });

		const isUsersProject = user.projects.some(function (projectId) {
			return projectId.equals(pid);
		});

		if (!isUsersProject) return res.status(403).json({ message: "Project does not belong to user." });
		
		const project = await ProjectModal.findById(pid);
		if (!project) return res.status(400).json({ message: "Project does not exist." });

		delete project._doc._id;
		delete project._doc.__v;
		return res.status(200).json({ pid, project: project._doc });

	} catch (error) {

		console.log("Internal server error while getting project:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getProjects = async (req, res) => {

	try {

		const { id } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "User ID does not exist." });

		const projects = [];
		for (let i in user.projects) {
			const project = await ProjectModal.findById(user.projects[i]);
			if (!project) continue;

			const pid = project._doc._id;
			delete project._doc._id;
			delete project._doc.__v;

			projects.push({ pid, ...project._doc });
		}

		return res.status(200).json({ projects });

	} catch (error) {

		console.log("Internal server error while getting project titles:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const getProjectTitles = async (req, res) => {

	try {

		const { id } = req.body;

		const user = await UserModal.findById(id);
		if (!user) return res.status(400).json({ message: "User ID does not exist." });

		const titles = [];
		for (let i in user.projects) {
			const project = await ProjectModal.findById(user.projects[i]);
			if (!project) continue;

			titles.push({ pid: project._doc._id, title: project._doc.title });
		}

		return res.status(200).json({ titles });

	} catch (error) {

		console.log("Internal server error while getting project titles:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};