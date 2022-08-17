const express = require('express');
const {
	getBands,
	getBand,
	createBand,
	deleteBand,
	updateBand,
} = require('../controllers/bandController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// this fires the middleware function to ensure all workout routes require authentication
router.use(requireAuth);

// /api/workouts/

// GET all workouts
router.get('/', getBands);

// GET a single workout
router.get('/:id', getBand);

// POST a new workout
router.post('/', createBand);
// DELETE a workout
router.delete('/:id', deleteBand);
// UPDATE a new workout
router.patch('/:id', updateBand);

module.exports = router;
