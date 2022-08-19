const express = require('express');
const {
	getVenues,
	getVenue,
	createVenue,
	deleteVenue,
	updateVenue,
} = require('../controllers/venueController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getVenues);

// GET a single workout
router.get('/:id', getVenue);

// POST a new workout
router.post('/', createVenue);
// DELETE a workout
router.delete('/:id', deleteVenue);
// UPDATE a new workout
router.patch('/:id', updateVenue);

module.exports = router;
