const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bandSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			lowercase: true, // Always convert `headline_band` to lowercase
		},
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Band', bandSchema);
