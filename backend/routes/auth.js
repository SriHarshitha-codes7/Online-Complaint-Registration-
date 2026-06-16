const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'agent', 'admin'], default: 'user' }
})

const User = mongoose.model('User', userSchema)

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Email already exists!' })
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashed, role })
    await user.save()
    res.json({ message: 'Registered successfully!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'User not found!' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Wrong password!' })
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1d' }
    )
    res.json({ token, role: user.role, name: user.name })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
module.exports.User = User