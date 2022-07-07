import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
	
	title: {
		type: String,
		required: true,
	},
	key: {
		type: String,
		default: "",
	},
	mode: {
		type: String,
		default: "",
	},
	bpm: {
		type: Number,
		default: 60
	},
	loops: {
		type: [{
			name: { type: String },
			placement: { type: Number },
			iteration: { type: Number },
			progression: {
				type: [{
					chord: { type: String },
					chordLength: { type: Number },
				}],
				default: [],
			},
		}],
		default: [],
	},
	uploadDate: {
		type: Date,
		default: Date.now(),
	},
	lastUpdate: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model('Projects', projectSchema);