const Gig = require('../models/gigModel');
const mongoose = require('mongoose');

// get all gigs
const getGigs = async (req, res) => {
	const user_id = req.user._id;

	// only finds gigs that match user_id
	const gigs = await Gig.find({ user_id }).sort({ createdAt: -1 });
	res.status(200).json(gigs);
};

// get a single workout
const getGig = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such gig' });
	}
	const gig = await Gig.findById(id);
	if (!gig) {
		return res.status(404).json({ error: 'No such gig' });
	}
	res.status(200).json(gig);
};

// create new workout
const createGig = async (req, res) => {
	const { headline_band, venue, gig_date, gig_details, city, isFestival } =
		req.body;
	// console.log(gig, 'gig');
	// const { title, headline_band, reps } = req.body;

	// handles ui error message if not all fields are complete
	const emptyFields = [];

	// if (!title) {
	// 	emptyFields.push('title');
	// }
	if (!headline_band) {
		emptyFields.push('headline_band');
	}
	if (!gig_date) {
		emptyFields.push('gig_date');
	}
	if (!gig_details) {
		emptyFields.push('gig_details');
	}
	if (!venue) {
		emptyFields.push('venue');
	}
	if (!city) {
		emptyFields.push('city');
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });
	}

	// add doc to db
	try {
		// user._id comes from middleware VITAL FOR gigs SPECIFIC TO A USER
		const user_id = req.user._id;
		const gig = await Gig.create({
			headline_band,
			venue,
			gig_date,
			gig_details,
			city,
			user_id,
			isFestival,
		});
		// gig.support_bands.push()
		res.status(200).json(gig);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
const deleteGig = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such gig' });
	}
	const gig = await Gig.findOneAndDelete({ _id: id });
	if (!gig) {
		return res.status(404).json({ error: 'No such gig' });
	}
	res.status(200).json(gig);
};

// update a gig
const updateGig = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such gig' });
	}
	const gig = await Gig.findByIdAndUpdate(
		{ _id: id },
		// second object contains data to update
		{
			// gets all properties in body
			...req.body,
		}
	);
	if (!gig) {
		return res.status(404).json({ error: 'No such gig' });
	}
	res.status(200).json(gig);
};

module.exports = {
	getGigs,
	getGig,
	createGig,
	deleteGig,
	updateGig,
};
