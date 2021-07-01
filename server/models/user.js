import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	email: { 
		type: String, 
		unique: true, 
		required: true,
	},
	password: { 
		type: String, 
		required: true, 
	},
	projects:  {
		type: [ObjectId],
		default: []
	},
	dateCreated: {
		type: Date,
		default: new Date(),
	},
	lastLogin: {
		type: Date,
	},
});

export default mongoose.model('User', userSchema);