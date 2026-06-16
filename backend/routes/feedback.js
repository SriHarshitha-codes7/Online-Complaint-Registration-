const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const feedbackSchema = new mongoose.Schema({
  complaintId: String,
  name: String,
  email: String,
  rating: Number,
  comment: String,
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body)
    await feedback.save()
    res.json({ message: 'Feedback submitted successfully!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    res.json(feedbacks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router