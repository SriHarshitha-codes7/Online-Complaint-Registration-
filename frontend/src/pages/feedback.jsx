import { useState } from 'react'

function Feedback() {
  const [form, setForm] = useState({
    complaintId: '', name: '', email: '', rating: 5, comment: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.comment) {
      alert('Please fill all required fields!')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (data.error) { alert(data.error); return }
      setSubmitted(true)
    } catch (err) {
      alert('Error connecting to server!')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 15px',
    marginBottom: '18px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '0.95rem',
    boxSizing: 'border-box', backgroundColor: '#fafafa'
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⭐</div>
        <h2 style={{ color: '#1565c0', marginBottom: '10px' }}>Thank You!</h2>
        <p style={{ color: '#777' }}>Your feedback has been submitted successfully.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1565c0', marginBottom: '8px', fontSize: '1.8rem' }}>⭐ Feedback</h2>
      <p style={{ color: '#777', marginBottom: '30px', fontSize: '0.9rem' }}>Share your experience with us.</p>

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Complaint ID (Optional)</label>
      <input placeholder="Enter complaint ID" value={form.complaintId}
        onChange={e => setForm({...form, complaintId: e.target.value})}
        style={inputStyle} />

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Full Name *</label>
      <input placeholder="Enter your name" value={form.name}
        onChange={e => setForm({...form, name: e.target.value})}
        style={inputStyle} />

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Email *</label>
      <input placeholder="Enter your email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})}
        style={inputStyle} />

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Rating *</label>
      <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} style={inputStyle}>
        <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
        <option value={4}>⭐⭐⭐⭐ Good</option>
        <option value={3}>⭐⭐⭐ Average</option>
        <option value={2}>⭐⭐ Poor</option>
        <option value={1}>⭐ Very Poor</option>
      </select>

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Comment *</label>
      <textarea placeholder="Share your experience..." value={form.comment}
        onChange={e => setForm({...form, comment: e.target.value})}
        rows={4} style={{...inputStyle, resize: 'vertical'}} />

      <button onClick={handleSubmit} style={{
        backgroundColor: '#1565c0', color: 'white',
        padding: '14px', border: 'none',
        borderRadius: '8px', fontSize: '1rem',
        fontWeight: '600', cursor: 'pointer',
        width: '100%', marginTop: '10px'
      }}>
        Submit Feedback →
      </button>
    </div>
  )
}

export default Feedback