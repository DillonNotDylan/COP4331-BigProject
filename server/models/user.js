import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	nickname: {
		type: String,
		default: "",
	},
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
		default: false,
	},
	projects: {
		type: [mongoose.Schema.Types.ObjectId],
		default: []
	},
	registerDate: {
		type: Date,
		default: new Date(),
	},
	lastLogin: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model("User", userSchema);