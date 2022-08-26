const Venue = require('../models/venueModel');
const mongoose = require('mongoose');

// get all gigs
const getVenues = async (req, res) => {
	const venues = await Venue.find({}).sort({ createdAt: -1 });
	res.status(200).json(venues);
};
// // get all gigs
// const getVenues = async (req, res) => {
// 	const user_id = req.user._id;

// 	// only finds gigs that match user_id
// 	const venues = await Venue.find({ user_id }).sort({ createdAt: -1 });
// 	res.status(200).json(venues);
// };

// get a single workout
const getVenue = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such venue' });
	}
	const venue = await Venue.findById(id);
	if (!venue) {
		return res.status(404).json({ error: 'No such venue' });
	}
	res.status(200).json(venue);
};

// create new workout
const createVenue = async (req, res) => {
	const { name } = req.body;
	// console.log(gig, 'gig');
	// const { title, name, reps } = req.body;

	// handles ui error message if not all fields are complete
	const emptyFields = [];

	// if (!title) {
	// 	emptyFields.push('title');
	// }
	if (!name) {
		emptyFields.push('name');
	}
	// if (!gig_date) {
	// 	emptyFields.push('gig_date');
	// }
	// if (!gig_details) {
	// 	emptyFields.push('gig_details');
	// }
	// if (!venue) {
	// 	emptyFields.push('venue');
	// }
	// if (!city) {
	// 	emptyFields.push('city');
	// }
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });
	}

	// add doc to db
	try {
		// user._id comes from middleware VITAL FOR venues SPECIFIC TO A USER
		const user_id = req.user._id;
		const venue = await Venue.create({
			name,
			user_id,
		});
		res.status(200).json(venue);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
const deleteVenue = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such venue' });
	}
	const venue = await Venue.findOneAndDelete({ _id: id });
	if (!venue) {
		return res.status(404).json({ error: 'No such venue' });
	}
	res.status(200).json(venue);
};

// update a venue
const updateVenue = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such venue' });
	}
	const venue = await Venue.findByIdAndUpdate(
		{ _id: id },
		// second object contains data to update
		{
			// gets all properties in body
			...req.body,
		}
	);
	if (!venue) {
		return res.status(404).json({ error: 'No such venue' });
	}
	res.status(200).json(venue);
};

module.exports = {
	getVenues,
	getVenue,
	createVenue,
	deleteVenue,
	updateVenue,
};
