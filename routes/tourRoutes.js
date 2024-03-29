const express = require('express')
const {
  getAllTours,
  getSingleTour,
  updateTour,
  createTour,
  deleteTour,
  checkID,
} = require('../controllers/tourController')

const router = express.Router()

router.param('id', checkID)

router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour)

module.exports = router
