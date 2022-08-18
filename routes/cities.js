const express = require('express');
const {
	getCities,
	getCity,
	createCity,
	deleteCity,
	updateCity,
} = require('../controllers/cityController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getCities);

// GET a single workout
router.get('/:id', getCity);

// POST a new workout
router.post('/', createCity);
// DELETE a workout
router.delete('/:id', deleteCity);
// UPDATE a new workout
router.patch('/:id', updateCity);

module.exports = router;
