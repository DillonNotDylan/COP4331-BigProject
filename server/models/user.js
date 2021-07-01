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
	verified: {
		type: Boolean,
		default : false,
	},
	projects: {
		type: [mongoose.Types._ObjectId],
		default: []
	},
	dateCreated: {
		type: Date,
		default: new Date(),
	},
	lastLogin: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model('User', userSchema);