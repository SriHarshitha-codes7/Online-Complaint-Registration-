import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

function Admin({ complaints, setComplaints }) {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    if (password === 'admin123') {
      setLoggedIn(true)
    } else {
      alert('Wrong password!')
    }
  }

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

  const counts = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  }

  const pieData = [
    { name: 'Pending', value: counts.pending },
    { name: 'In Progress', value: counts.inProgress },
    { name: 'Resolved', value: counts.resolved },
  ]

  const barData = [
    { name: 'Billing', value: complaints.filter(c => c.category === 'Billing Issue').length },
    { name: 'Service', value: complaints.filter(c => c.category === 'Service Issue').length },
    { name: 'Product', value: complaints.filter(c => c.category === 'Product Issue').length },
    { name: 'Other', value: complaints.filter(c => c.category === 'Other').length },
  ]

  const COLORS = ['#c62828', '#e65100', '#2e7d32']

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '80px auto', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔐</div>
        <h2 style={{ color: '#1565c0', marginBottom: '8px' }}>Admin Login</h2>
        <p style={{ color: '#777', marginBottom: '25px', fontSize: '0.9rem' }}>Enter password to access admin panel.</p>
        <input type="password" placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px 15px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box', backgroundColor: '#fafafa' }} />
        <button onClick={handleLogin} style={{
          backgroundColor: '#1565c0', color: 'white',
          padding: '14px', border: 'none',
          borderRadius: '8px', fontSize: '1rem',
          fontWeight: '600', cursor: 'pointer',
          width: '100%'
        }}>Login →</button>
        <p style={{ color: '#aaa', marginTop: '15px', fontSize: '0.8rem' }}>Hint: admin123</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ color: '#1565c0', marginBottom: '8px', fontSize: '1.8rem' }}>⚙️ Admin Dashboard</h2>
      <p style={{ color: '#777', marginBottom: '30px' }}>Manage complaints and view analytics.</p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '35px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: counts.total, color: '#1565c0', bg: '#e3f2fd' },
          { label: 'Pending', value: counts.pending, color: '#c62828', bg: '#ffebee' },
          { label: 'In Progress', value: counts.inProgress, color: '#e65100', bg: '#fff3e0' },
          { label: 'Resolved', value: counts.resolved, color: '#2e7d32', bg: '#e8f5e9' },
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: s.bg, borderRadius: '12px', padding: '20px 30px', textAlign: 'center', minWidth: '130px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: s.color }}>{s.value}</div>
            <div style={{ color: '#555', fontSize: '0.85rem', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', gap: '30px', marginBottom: '35px', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#1565c0', marginBottom: '15px' }}>Status Overview</h3>
          <PieChart width={280} height={250}>
            <Pie data={pieData} cx={130} cy={110} outerRadius={90} dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#1565c0', marginBottom: '15px' }}>Complaints by Category</h3>
          <BarChart width={320} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1565c0" />
          </BarChart>
        </div>
      </div>

      {/* Complaints List */}
      {complaints.map(c => (
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
      ))}
    </div>
  )
}

export default Admin