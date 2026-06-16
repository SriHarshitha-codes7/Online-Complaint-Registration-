import { useState, useEffect } from 'react'

function Agent({ user }) {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/complaints')
      .then(res => res.json())
      .then(data => setComplaints(Array.isArray(data) ? data : []))
      .catch(err => console.log(err))
  }, [])

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch('http://localhost:5000/api/complaints/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      setComplaints(complaints.map(c => c._id === id ? {...c, status: newStatus} : c))
    } catch (err) {
      console.log(err)
    }
  }

  const getStatusColor = (status) => {
    if (status === 'Resolved') return { backgroundColor: '#e8f5e9', color: '#2e7d32' }
    if (status === 'In Progress') return { backgroundColor: '#fff3e0', color: '#e65100' }
    return { backgroundColor: '#ffebee', color: '#c62828' }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '950px', margin: '0 auto' }}>
      <h2 style={{ color: '#1565c0', marginBottom: '8px', fontSize: '1.8rem' }}>👷 Agent Dashboard</h2>
      <p style={{ color: '#777', marginBottom: '30px' }}>Manage and resolve assigned complaints.</p>
      {complaints.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center', marginTop: '50px' }}>No complaints yet.</p>
      ) : (
        complaints.map(c => (
          <div key={c._id} style={{ backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px 25px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: '700', color: '#1565c0', marginBottom: '5px' }}>{c.name}</p>
                <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '5px' }}>{c.category} | {c.date}</p>
                <p style={{ color: '#777', fontSize: '0.85rem' }}>{c.description}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', marginLeft: '20px' }}>
                <span style={{ ...getStatusColor(c.status), padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{c.status}</span>
                <select value={c.status} onChange={e => updateStatus(c._id, e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Agent