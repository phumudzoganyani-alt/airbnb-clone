function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        padding: "120px 20px",
      }}
    >
      <h1 style={{ fontSize: "48px" }}>
        Find your next stay
      </h1>

      <p style={{ fontSize: "20px" }}>
        Search low prices on homes, apartments and holiday rentals.
      </p>
    </section>
  );
}

export default Hero;