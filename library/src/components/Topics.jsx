
import React from "react";

const Topics = ({ subject, subjects }) => (
  <div style={{ marginTop: 20 }}>
    <h3>{subject} Topics</h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
      {subjects[subject].map((topic) => (
        <div
          key={topic}
          style={{
            background: "#fff",
            padding: "8px 12px",
            borderRadius: 20,
            cursor: "pointer",
            border: "1px solid #e6f0ff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            userSelect: "none",
          }}
        >
          {topic}
        </div>
      ))}
    </div>
  </div>
);

export default Topics;