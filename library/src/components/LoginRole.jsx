
import React from "react";

const LoginRole = ({ handleRoleClick }) => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
    <div
      style={{
        textAlign: "center",
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h1 style={{ margin: 0 }}>📘 Engineering Library Portal</h1>
      <p>Select your role:</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
        <button onClick={() => handleRoleClick("admin")}>Admin</button>
        <button onClick={() => handleRoleClick("student")}>Student</button>
      </div>
    </div>
  </div>
);

export default LoginRole;