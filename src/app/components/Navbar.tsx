export default function Navbar() {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "50px",
      backgroundColor: "rgba(15, 15, 35, 0.95)",
      display: "flex",
      alignItems: "center",
      padding: "0 1rem",
      zIndex: 1000,
    }}>
      <div style={{
        color: "white",
        fontSize: "1rem",
        fontWeight: "600",
      }}>
        Three.js App
      </div>
      
      <div style={{ flex: 1 }} />
      
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {['Home', 'Globe', 'SolarSystem'].map((item) => (
          <a 
            key={item}
            href="#" 
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "0.85rem",
              opacity: 0.8,
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}