function Footer() {
  return (
    <footer
      style={{
        marginTop: "60px",
        background: "#f7f7f7",
        borderTop: "1px solid #ddd",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "30px",
        }}
      >
        <div>
          <h3>Airbnb Clone</h3>
          <p>
            Find unique places to stay around the world. Built with React,
            Node.js, Express and MongoDB.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <p>Homes</p>
          <p>Apartments</p>
          <p>Cabins</p>
          <p>Beach Houses</p>
        </div>

        <div>
          <h3>Support</h3>
          <p>Help Centre</p>
          <p>Safety</p>
          <p>Contact</p>
        </div>

        <div>
          <h3>Developer</h3>
          <p>Phumudzo Ganyani</p>
          <p>Airbnb</p>
          <p>2026</p>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <p
        style={{
          textAlign: "center",
          color: "#666",
        }}
      >
        © 2026 Airbnb. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;