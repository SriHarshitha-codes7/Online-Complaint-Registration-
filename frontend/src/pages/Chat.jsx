import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

function Chat({ user, complaintId }) {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.emit('join', complaintId || 'general')
    socket.on('previousMessages', (msgs) => setMessages(msgs))
    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg])
    })
    return () => {
      socket.off('previousMessages')
      socket.off('receiveMessage')
    }
  }, [complaintId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!message.trim()) return
    socket.emit('sendMessage', {
      complaintId: complaintId || 'general',
      sender: user?.name || 'User',
      message
    })
    setMessage('')
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1565c0', marginBottom: '20px' }}>💬 Live Chat</h2>

      <div style={{ height: '350px', overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '15px', marginBottom: '15px', backgroundColor: '#f9f9f9' }}>
        {messages.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', marginTop: '140px' }}>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{
              marginBottom: '12px',
              display: 'flex',
              flexDirection: msg.sender === (user?.name || 'User') ? 'row-reverse' : 'row',
              gap: '8px'
            }}>
              <div style={{
                backgroundColor: msg.sender === (user?.name || 'User') ? '#1565c0' : '#e0e0e0',
                color: msg.sender === (user?.name || 'User') ? 'white' : '#333',
                padding: '8px 14px',
                borderRadius: '18px',
                maxWidth: '70%',
                fontSize: '0.9rem'
              }}>
                <div style={{ fontWeight: '600', fontSize: '0.75rem', marginBottom: '3px' }}>{msg.sender}</div>
                {msg.message}
                <div style={{ fontSize: '0.7rem', opacity: '0.7', marginTop: '3px' }}>{msg.time}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem' }}
        />
        <button onClick={sendMessage} style={{
          backgroundColor: '#1565c0', color: 'white',
          padding: '12px 20px', border: 'none',
          borderRadius: '8px', cursor: 'pointer',
          fontWeight: '600'
        }}>Send</button>
      </div>
    </div>
  )
}

export default Chat