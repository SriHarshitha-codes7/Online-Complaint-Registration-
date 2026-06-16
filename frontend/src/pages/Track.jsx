import { useState } from 'react'

function Track({ complaints }) {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)

  const handleTrack = () => {
    if (!search) {
      alert('Please enter your name or email!')
      return
    }
    const found = complaints.find(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    )
    if (found) {
      setResult(found)
    } else {
      alert('Complaint not found!')
      setResult(null)
    }
  }

  const getStatusColor = (status) => {
    if (status === 'Resolved') return { backgroundColor: '#e8f5e9', color: '#2e7d32' }
    if (status === 'In Progress') return { backgroundColor: '#fff3e0', color: '#e65100' }
    return { backgroundColor: '#ffebee', color: '#c62828' }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1565c0', marginBottom: '8px', fontSize: '1.8rem' }}>🔍 Track Complaint</h2>
      <p style={{ color: '#777', marginBottom: '30px', fontSize: '0.9rem' }}>Enter your name or email to check status.</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input placeholder="Enter your name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fafafa' }} />
        <button onClick={handleTrack} style={{
          backgroundColor: '#1565c0', color: 'white',
          padding: '12px 25px', border: 'none',
          borderRadius: '8px', fontWeight: '600',
          cursor: 'pointer', fontSize: '0.95rem'
        }}>Track</button>
      </div>

      {result && (
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '25px', backgroundColor: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#1565c0' }}>Complaint Details</h3>
            <span style={{ ...getStatusColor(result.status), padding: '5px 15px', borderRadius: '20px', fontWeight: '600', fontSize: '0.85rem' }}>{result.status}</span>
          </div>
          {[
            { label: 'Name', value: result.name },
            { label: 'Email', value: result.email },
            { label: 'Category', value: result.category },
            { label: 'Description', value: result.description },
            { label: 'Date', value: result.date },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
              <span style={{ fontWeight: '600', color: '#555', width: '140px', flexShrink: 0 }}>{item.label}:</span>
              <span style={{ color: '#333' }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Track