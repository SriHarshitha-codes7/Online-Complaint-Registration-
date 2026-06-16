import { useState } from 'react'

function Register({ addComplaint, setPage }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', category: '', description: ''
  })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.description || !form.category) {
      alert('Please fill all required fields!')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      addComplaint(data)
      alert('Complaint Registered Successfully! 🎉')
      setPage('track')
      setForm({ name: '', email: '', phone: '', category: '', description: '' })
    } catch (err) {
      alert('Error connecting to server!')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 15px',
    marginBottom: '18px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '0.95rem',
    boxSizing: 'border-box', outline: 'none',
    backgroundColor: '#fafafa'
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1565c0', marginBottom: '8px', fontSize: '1.8rem' }}>📝 Register Complaint</h2>
      <p style={{ color: '#777', marginBottom: '30px', fontSize: '0.9rem' }}>Fill the form below to submit your complaint.</p>

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Full Name *</label>
      <input placeholder="Enter your full name" value={form.name}
        onChange={e => setForm({...form, name: e.target.value})}
        style={inputStyle} />

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Email Address *</label>
      <input placeholder="Enter your email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})}
        style={inputStyle} />

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Phone Number</label>
      <input placeholder="Enter your phone number" value={form.phone}
        onChange={e => setForm({...form, phone: e.target.value})}
        style={inputStyle} />

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Complaint Category *</label>
      <select value={form.category}
        onChange={e => setForm({...form, category: e.target.value})}
        style={inputStyle}>
        <option value="">Select Category</option>
        <option value="Billing Issue">Billing Issue</option>
        <option value="Service Issue">Service Issue</option>
        <option value="Product Issue">Product Issue</option>
        <option value="Other">Other</option>
      </select>

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Description *</label>
      <textarea placeholder="Describe your complaint in detail..." value={form.description}
        onChange={e => setForm({...form, description: e.target.value})}
        rows={4} style={{...inputStyle, resize: 'vertical'}} />

      <button onClick={handleSubmit} style={{
        backgroundColor: '#1565c0', color: 'white',
        padding: '14px', border: 'none',
        borderRadius: '8px', fontSize: '1rem',
        fontWeight: '600', cursor: 'pointer',
        width: '100%', marginTop: '10px',
        boxShadow: '0 4px 15px rgba(21,101,192,0.3)'
      }}>
        Submit Complaint →
      </button>
    </div>
  )
}

export default Register