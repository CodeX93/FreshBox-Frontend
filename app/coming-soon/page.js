export default function ComingSoon() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#E3FEF7',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#1D555F', marginBottom: 16 }}>Coming Soon</h1>
      <p style={{ fontSize: '1.2rem', color: '#0099A8' }}>
        This page is under construction or does not exist.<br />
        Please check back soon!
      </p>
      <a href="/" style={{
        marginTop: 32,
        padding: '12px 32px',
        background: 'linear-gradient(90deg, #0099A8 0%, #16D9E3 100%)',
        color: 'white',
        borderRadius: 20,
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.1rem'
      }}>
        Go Home
      </a>
    </div>
  );
} 