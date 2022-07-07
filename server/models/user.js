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
	nickname: {
		type: String,
		required: true,
	},
	projects: {
		type: [mongoose.Schema.Types.ObjectId],
		default: [],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	lastLogin: {
		type: Date,
		default: Date.now(),
	},
	signUpDate: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model('Users', userSchema);