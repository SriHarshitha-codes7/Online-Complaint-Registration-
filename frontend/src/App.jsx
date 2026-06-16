import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Track from './pages/Track'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Agent from './pages/Agent'
import Feedback from './pages/Feedback'
import Chat from './pages/Chat'

function App() {
  const [page, setPage] = useState('home')
  const [complaints, setComplaints] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/complaints')
      .then(res => res.json())
      .then(data => setComplaints(Array.isArray(data) ? data : []))
      .catch(err => console.log(err))
  }, [])

  const addComplaint = (complaint) => {
    setComplaints([...complaints, complaint])
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    setPage('home')
  }

  return (
    <div>
      <Navbar setPage={setPage} user={user} handleLogout={handleLogout} />
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'login' && <Login setPage={setPage} setUser={setUser} />}
      {page === 'register' && <Register addComplaint={addComplaint} setPage={setPage} />}
      {page === 'track' && <Track complaints={complaints} />}
      {page === 'admin' && <Admin complaints={complaints} setComplaints={setComplaints} />}
      {page === 'agent' && <Agent user={user} />}
      {page === 'feedback' && <Feedback />}
      {page === 'chat' && <Chat user={user} complaintId="general" />}
    </div>
  )
}

export default App