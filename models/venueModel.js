const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const venueSchema = new Schema(
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
// fd?
module.exports = mongoose.model('Venue', venueSchema);
