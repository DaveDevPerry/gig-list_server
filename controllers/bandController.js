const Band = require('../models/bandModel');
const mongoose = require('mongoose');

// get all gigs
const getBands = async (req, res) => {
	// const user_id = req.user._id;
	// only finds gigs that match user_id
	const bands = await Band.find({}).sort({ createdAt: -1 });
	res.status(200).json(bands);
};
// // get all bands specific to user - WORKING
// const getBands = async (req, res) => {
// 	const user_id = req.user._id;
// 	// only finds gigs that match user_id
// 	const bands = await Band.find({ user_id }).sort({ createdAt: -1 });
// 	res.status(200).json(bands);
// };

// get a single workout
const getBand = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such band' });
	}
	const band = await Band.findById(id);
	if (!band) {
		return res.status(404).json({ error: 'No such band' });
	}
	res.status(200).json(band);
};

// create new workout
const createBand = async (req, res) => {
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
		// user._id comes from middleware VITAL FOR bands SPECIFIC TO A USER
		const user_id = req.user._id;
		const band = await Band.create({
			name,
			user_id,
		});
		res.status(200).json(band);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
const deleteBand = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such band' });
	}
	const band = await Band.findOneAndDelete({ _id: id });
	if (!band) {
		return res.status(404).json({ error: 'No such band' });
	}
	res.status(200).json(band);
};

// update a band
const updateBand = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such band' });
	}
	const band = await Band.findByIdAndUpdate(
		{ _id: id },
		// second object contains data to update
		{
			// gets all properties in body
			...req.body,
		}
	);
	if (!band) {
		return res.status(404).json({ error: 'No such band' });
	}
	res.status(200).json(band);
};

module.exports = {
	getBands,
	getBand,
	createBand,
	deleteBand,
	updateBand,
};
