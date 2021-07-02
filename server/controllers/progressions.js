import express from "express";
import mongoose from "mongoose";

import UserModal from "../models/user.js";
import Progression from "../models/progression.js";

const router = express.Router();

export const getProgressions = async (req, res) => { 

	try {
		
		const { id } = req.params;
		const user = await UserModal.findById(id);
		res.status(200).json({ progressions: user.progressions });

	} catch (error) {
	
		res.status(404).json({ message: error.message });
	}
}

export const searchProgressions = async (req, res) => { 

	try {
		
		const { id } = req.params;
		const criteria = req.body;
		
		const user = await UserModal.findById(id);
		const progressions = new Array();

		for (let i = 0; i < user.progressions.length; i++)
		{
			const progression = await Progression.findById(user.progressions[i]);

			for (let x in criteria)
			{
				var addToList = true;
				let criterianRegex = new RegExp(criteria[x], "gi");
				if (!criterianRegex.test(progression[x]))
				{
					addToList = false;
					break;
				}
			}

			if (addToList) progressions.push(progression._id);
		}
		
		res.status(200).json({ progressions: progressions });

	} catch (error) {
	
		res.status(404).json({ message: error.message });
	}
}

export const getProgression = async (req, res) => { 

	try {

		const { pid } = req.body;
		const progression = await Progression.findById(pid);

		res.status(200).json(progression);
	
	} catch (error) {
	
		res.status(404).json({ message: error.message });
	}
}

export const createProgression = async (req, res) => {

	try {

		const { id } = req.params;
		const progression = req.body;
		
		const newProgression = new Progression({ ...progression });
		await newProgression.save();
		
		const user = await UserModal.findById(id);
		user.progressions.push(newProgression._id);
		await UserModal.findByIdAndUpdate(id, user, { new: true });

		res.status(201).json(newProgression);

	} catch (error) {

		res.status(409).json({ message: error.message });
	}
}

export const updateProgression = async (req, res) => {

	try {

		const progression = req.body;
		
		if (!mongoose.Types.ObjectId.isValid(progression.pid)) return res.status(404).send(`Progression id: ${progression.pid} is not valid.`);
		await Progression.findByIdAndUpdate(progression.pid, { ...progression, lastUpdate: new Date().toISOString() }, { new: true });

		res.json({ message: "Progression updated successfully." });

	} catch (error) {

		res.json({ message: error.message });
	}
}

export const deleteProgression = async (req, res) => {

	try {
		
		const { id } = req.params;
		const { pid } = req.body;

		if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(404).send(`Progression id: ${pid} is not valid.`);
		await Progression.findByIdAndRemove(pid);

		const user = await UserModal.findById(id);
		const index = user.progressions.indexOf(mongoose.Types.ObjectId(pid));

		if (index > -1) user.progressions.splice(index, 1);
		await UserModal.findByIdAndUpdate(id, user, { new: true });

		res.json({ message: "Progression deleted successfully." });
	
	} catch (error) {
	
		res.json({ error: error.message });
	}
}

export default router;