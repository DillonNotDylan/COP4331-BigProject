import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
	title: { 
		type: String, 
		required: true,
		unique: true,
	},
	key: { 
		type: String, 
		default: "",
	},
	mode: { 
		type: String, 
		default: "",
	},
	loops: { 
		type: [{
			length: Number,
			placement: Number,
			iterations: Number,
			progress: String, 
		}], 
		default: [], 
	},
	dateCreated: {
		type: Date,
		default: new Date(),
	},
	lastUpdate: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model('Project', projectSchema);;