import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
	
	_id: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	ip: {
		type: String,
		required: true,
	},
	authToken: {
		type: String,
		required: true,
	},
	loginTime: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model('Sessions', sessionSchema);