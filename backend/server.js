const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
})

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch(err => console.log('MongoDB Error:', err))

const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  category: String,
  description: String,
  status: { type: String, default: 'Pending' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
})

const Complaint = mongoose.model('Complaint', complaintSchema)

app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find()
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/complaints', async (req, res) => {
  try {
    const complaint = new Complaint(req.body)
    await complaint.save()
    res.json(complaint)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/complaints/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    )
    res.json(complaint)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const authRoutes = require('./routes/auth')
const feedbackRoutes = require('./routes/feedback')
app.use('/api/auth', authRoutes)
app.use('/api/feedback', feedbackRoutes)

const messages = {}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join', (complaintId) => {
    socket.join(complaintId)
    if (!messages[complaintId]) messages[complaintId] = []
    socket.emit('previousMessages', messages[complaintId])
  })

  socket.on('sendMessage', ({ complaintId, sender, message }) => {
    const msg = { sender, message, time: new Date().toLocaleTimeString() }
    if (!messages[complaintId]) messages[complaintId] = []
    messages[complaintId].push(msg)
    io.to(complaintId).emit('receiveMessage', msg)

    if (sender !== 'Agent Bot') {
      setTimeout(() => {
        const botMsg = {
          sender: 'Agent Bot',
          message: 'Thank you for your message! Our team will respond shortly. 🙏',
          time: new Date().toLocaleTimeString()
        }
        messages[complaintId].push(botMsg)
        io.to(complaintId).emit('receiveMessage', botMsg)
      }, 1000)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

server.listen(5000, () => console.log('Server running on port 5000 🚀'))