function StatCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4
          style={{
            margin: 0,
            color: "#666",
            fontSize: "15px",
          }}
        >
          {title}
        </h4>

        <h2
          style={{
            marginTop: "10px",
            fontSize: "28px",
          }}
        >
          {value}
        </h2>
      </div>

      <div
        style={{
          fontSize: "40px",
          color: color,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;