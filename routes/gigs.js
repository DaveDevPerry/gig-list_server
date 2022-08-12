const express = require('express');
const {
	getGigs,
	getGig,
	createGig,
	deleteGig,
	updateGig,
} = require('../controllers/gigController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getGigs);

// GET a single workout
router.get('/:id', getGig);

// POST a new workout
router.post('/', createGig);
// DELETE a workout
router.delete('/:id', deleteGig);
// UPDATE a new workout
router.patch('/:id', updateGig);

module.exports = router;
