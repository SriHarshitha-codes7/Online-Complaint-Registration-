import { useState } from 'react'

function Login({ setPage, setUser }) {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      const url = isRegister
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (data.error) { setError(data.error); return }
      if (isRegister) {
        setError('')
        alert('Registered! Please login.')
        setIsRegister(false)
      } else {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('name', data.name)
        setUser({ token: data.token, role: data.role, name: data.name })
        if (data.role === 'admin') setPage('admin')
        else if (data.role === 'agent') setPage('agent')
        else setPage('home')
      }
    } catch (err) {
      setError('Error connecting to server!')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 15px',
    marginBottom: '18px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '0.95rem',
    boxSizing: 'border-box', backgroundColor: '#fafafa'
  }

  return (
    <div style={{ maxWidth: '450px', margin: '60px auto', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1565c0', marginBottom: '8px', fontSize: '1.8rem' }}>
        {isRegister ? '📝 Register' : '🔐 Login'}
      </h2>
      <p style={{ color: '#777', marginBottom: '25px', fontSize: '0.9rem' }}>
        {isRegister ? 'Create your account' : 'Login to your account'}
      </p>

      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

      {isRegister && (
        <>
          <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Full Name</label>
          <input placeholder="Enter your name" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            style={inputStyle} />
        </>
      )}

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Email</label>
      <input placeholder="Enter your email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})}
        style={inputStyle} />

      <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Password</label>
      <input type="password" placeholder="Enter your password" value={form.password}
        onChange={e => setForm({...form, password: e.target.value})}
        style={inputStyle} />

      {isRegister && (
        <>
          <label style={{ fontWeight: '600', color: '#444', fontSize: '0.9rem' }}>Role</label>
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={inputStyle}>
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}

      <button onClick={handleSubmit} style={{
        backgroundColor: '#1565c0', color: 'white',
        padding: '14px', border: 'none', borderRadius: '8px',
        fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
        width: '100%', marginBottom: '15px'
      }}>
        {isRegister ? 'Register →' : 'Login →'}
      </button>

      <p style={{ textAlign: 'center', color: '#555', fontSize: '0.9rem' }}>
        {isRegister ? 'Already have an account? ' : "Don't have an account? "}
        <span onClick={() => setIsRegister(!isRegister)}
          style={{ color: '#1565c0', cursor: 'pointer', fontWeight: '600' }}>
          {isRegister ? 'Login' : 'Register'}
        </span>
      </p>
    </div>
  )
}

export default Login