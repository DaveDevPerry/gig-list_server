const mongoose = require('mongoose');

// @note - Schema defines the structure of the documents we save to a collection
const Schema = mongoose.Schema;

const gigSchema = new Schema(
	{
		gig_date: {
			type: Date,
			required: true,
		},
		headline_band: {
			type: String,
			required: true,
		},
		venue: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		gig_details: {
			type: String,
		},
		user_id: {
			type: String,
			required: true,
		},
		// automatically created timestamp when created or updated
	},
	{ timestamps: true }
);

// 'Workout' is the name of the model
module.exports = mongoose.model('Gig', gigSchema);
