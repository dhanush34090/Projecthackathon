import React, { useState, useEffect } from "react";

const LoginForm = ({
  role,
  userid,
  password,
  setUserid,
  setPassword,
  handleLogin,
  captchaValue,
  captchaInput,
  setCaptchaInput,
  refreshCaptcha,
}) => {
  // Local UI state for simple inline validation messaging
  const [captchaValid, setCaptchaValid] = useState(true);

  useEffect(() => {
    // reset captcha validation when captcha changes
    setCaptchaValid(true);
  }, [captchaValue]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
      <div
        style={{
          background: "#fff",
          padding: 28,
          borderRadius: 12,
          width: 420,
          boxShadow: "0 6px 24px rgba(2,8,23,0.06)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Login as {role}</h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="Username"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Alphabet Captcha block */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                background: "#0b79d0",
                color: "white",
                borderRadius: 8,
                padding: "10px 14px",
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: "2px",
                fontSize: 20,
                userSelect: "none",
                minWidth: 140,
                textAlign: "center",
              }}
              aria-hidden
            >
              {captchaValue || "-----"}
            </div>

            <input
              type="text"
              placeholder="Type letters"
              value={captchaInput}
              onChange={(e) => {
                // allow only letters
                const sanitized = e.target.value.replace(/[^a-zA-Z]/g, "");
                setCaptchaInput(sanitized);
                setCaptchaValid(true);
              }}
              style={{ width: 140, padding: "10px 8px" }}
              required
              aria-label="Captcha answer"
            />

            <button
              type="button"
              onClick={refreshCaptcha}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                background: "#eef6fb",
                border: "1px solid #d0e8fb",
                cursor: "pointer",
              }}
              title="Refresh captcha"
            >
              ↻
            </button>
          </div>

          {!captchaValid && (
            <div style={{ color: "crimson", fontSize: 13 }}>Captcha looks incorrect — try again.</div>
          )}

          <button type="submit">Login</button>
        </form>

        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          Tip: type the letters shown (case-insensitive).
        </div>
      </div>
    </div>
  );
};

export default LoginForm;