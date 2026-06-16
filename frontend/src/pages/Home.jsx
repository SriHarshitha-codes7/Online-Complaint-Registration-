function Home({ setPage }) {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        padding: '80px 40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '15px' }}>
          🛡️ ComplaintEase
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.9', marginBottom: '10px' }}>
          Online Complaints Registration and Management System
        </p>
        <p style={{ fontSize: '1rem', opacity: '0.75', marginBottom: '40px' }}>
          Lodge, track and resolve complaints — transparently and efficiently.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={() => setPage('register')} style={{
            backgroundColor: 'white', color: '#1565c0',
            padding: '14px 35px', border: 'none',
            borderRadius: '8px', fontSize: '1rem',
            fontWeight: '600', cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>Register Complaint</button>
          <button onClick={() => setPage('track')} style={{
            backgroundColor: 'transparent', color: 'white',
            padding: '14px 35px', border: '2px solid white',
            borderRadius: '8px', fontSize: '1rem',
            fontWeight: '600', cursor: 'pointer'
          }}>Track Complaint</button>
        </div>
      </div>

      {/* Stats Section */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '50px 40px', flexWrap: 'wrap' }}>
  {[
    { icon: '📝', title: 'Submit Easily', desc: 'Register your complaint in just a few clicks.' },
    { icon: '🔍', title: 'Track Anytime', desc: 'Check your complaint status in real-time.' },
    { icon: '⚡', title: 'Quick Action', desc: 'Admin team reviews and resolves complaints fast.' },
  ].map((item, i) => (
    <div key={i} style={{
      backgroundColor: 'white', borderRadius: '12px',
      padding: '30px 40px', textAlign: 'center',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      minWidth: '220px'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1565c0', marginBottom: '8px' }}>{item.title}</div>
      <div style={{ color: '#777', fontSize: '0.9rem' }}>{item.desc}</div>
    </div>
  ))}
</div>

      {/* Features Section */}
      <div style={{ padding: '20px 40px 60px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1565c0', marginBottom: '30px', fontSize: '1.8rem' }}>Why ComplaintEase?</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '📝', title: 'Easy Registration', desc: 'Submit complaints in minutes with our simple form.' },
            { icon: '🔍', title: 'Real-time Tracking', desc: 'Track your complaint status anytime, anywhere.' },
            { icon: '⚡', title: 'Fast Resolution', desc: 'Our admin team resolves complaints quickly and efficiently.' },
            { icon: '🔒', title: 'Secure & Private', desc: 'Your data is safe and handled with full confidentiality.' },
          ].map((f, i) => (
            <div key={i} style={{
              backgroundColor: 'white', borderRadius: '12px',
              padding: '25px', width: '220px',
              boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{f.icon}</div>
              <div style={{ fontWeight: '600', color: '#1565c0', marginBottom: '8px' }}>{f.title}</div>
              <div style={{ color: '#777', fontSize: '0.85rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home