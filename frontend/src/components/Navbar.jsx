function Navbar({ setPage, user, handleLogout }) {
  return (
    <nav style={{
      backgroundColor: '#1565c0',
      padding: '0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '65px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setPage('home')}>
        <span style={{ fontSize: '1.6rem' }}>🛡️</span>
        <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: '700', letterSpacing: '1px' }}>ComplaintEase</span>
      </div>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        {['home', 'register', 'track', 'feedback', 'chat'].map(p => (
          <span key={p} onClick={() => setPage(p)}
            style={{ color: 'white', textTransform: 'capitalize', fontWeight: '500', fontSize: '0.95rem', cursor: 'pointer' }}>
            {p === 'home' ? 'Home' : p === 'register' ? 'Register' : p === 'track' ? 'Track' : p === 'feedback' ? 'Feedback' : 'Chat'}
          </span>
        ))}
        {user ? (
          <>
            {user.role === 'admin' && (
              <span onClick={() => setPage('admin')}
                style={{ color: 'white', fontWeight: '500', cursor: 'pointer' }}>Admin</span>
            )}
            {user.role === 'agent' && (
              <span onClick={() => setPage('agent')}
                style={{ color: 'white', fontWeight: '500', cursor: 'pointer' }}>Agent</span>
            )}
            <span style={{ color: '#90caf9', fontSize: '0.9rem' }}>Hi, {user.name}!</span>
            <span onClick={handleLogout}
              style={{ color: 'white', cursor: 'pointer', backgroundColor: '#c62828', padding: '6px 15px', borderRadius: '6px', fontSize: '0.9rem' }}>
              Logout
            </span>
          </>
        ) : (
          <span onClick={() => setPage('login')}
            style={{ color: 'white', cursor: 'pointer', backgroundColor: '#0d47a1', padding: '6px 15px', borderRadius: '6px', fontWeight: '600' }}>
            Login
          </span>
        )}
      </div>
    </nav>
  )
}

export default Navbar