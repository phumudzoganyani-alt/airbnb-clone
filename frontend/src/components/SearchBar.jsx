function SearchBar() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        display: "flex",
        gap: "15px",
      }}
    >
      <input
        type="text"
        placeholder="Search destination..."
        style={{
          flex: 1,
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      />

      <button
        style={{
          background: "#ff385c",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;