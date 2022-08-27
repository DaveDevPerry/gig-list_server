const City = require('../models/cityModel');
const mongoose = require('mongoose');

// get all gigs
// const getCities = async (req, res) => {
// 	const cities = await City.find({}).sort({ createdAt: -1 });
// 	res.status(200).json(cities);
// };
// get all cities - user specific - WORKING
const getCities = async (req, res) => {
	const user_id = req.user._id;

	// only finds gigs that match user_id
	const cities = await City.find({ user_id }).sort({ createdAt: -1 });
	res.status(200).json(cities);
};

// get a single workout
const getCity = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such city' });
	}
	const city = await City.findById(id);
	if (!city) {
		return res.status(404).json({ error: 'No such city' });
	}
	res.status(200).json(city);
};

// create new workout
const createCity = async (req, res) => {
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
		// user._id comes from middleware VITAL FOR cities SPECIFIC TO A USER
		const user_id = req.user._id;
		const city = await City.create({
			name,
			user_id,
		});
		res.status(200).json(city);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a workout
const deleteCity = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such city' });
	}
	const city = await City.findOneAndDelete({ _id: id });
	if (!city) {
		return res.status(404).json({ error: 'No such city' });
	}
	res.status(200).json(city);
};

// update a city
const updateCity = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such city' });
	}
	const city = await City.findByIdAndUpdate(
		{ _id: id },
		// second object contains data to update
		{
			// gets all properties in body
			...req.body,
		}
	);
	if (!city) {
		return res.status(404).json({ error: 'No such city' });
	}
	res.status(200).json(city);
};

module.exports = {
	getCities,
	getCity,
	createCity,
	deleteCity,
	updateCity,
};
