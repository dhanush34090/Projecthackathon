import React, { useState, useEffect } from "react";
import LoginRole from "./components/LoginRole";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { generateSubjects, initialUsers, initialUploadedBooks, initialUploadedVideos } from "./utils.jsx";

const App = () => {
  const [step, setStep] = useState("chooseRole");
  const [role, setRole] = useState(null);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [uploadedBooks, setUploadedBooks] = useState(initialUploadedBooks);
  const [uploadedVideos, setUploadedVideos] = useState(initialUploadedVideos);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  // ---- Alphabet Captcha state ----
  const [captchaValue, setCaptchaValue] = useState(""); // displayed captcha (e.g. "aBcXd")
  const [captchaExpected, setCaptchaExpected] = useState(""); // expected answer (normalized)
  const [captchaInput, setCaptchaInput] = useState("");

  const subjects = generateSubjects();

  // helper: generate random alphabet string (letters only)
  const generateAlphaCaptcha = (length = 5) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let out = "";
    for (let i = 0; i < length; i++) {
      // randomly choose upper or lower for display variety
      const ch = letters.charAt(Math.floor(Math.random() * letters.length));
      out += Math.random() > 0.5 ? ch : ch.toLowerCase();
    }
    setCaptchaValue(out);
    // store normalized expected (uppercase) for case-insensitive compare
    setCaptchaExpected(out.toUpperCase());
    setCaptchaInput("");
  };

  useEffect(() => {
    // whenever we show the credential entry step, generate a fresh captcha
    if (step === "enterCreds") generateAlphaCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, role]);

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
    setStep("enterCreds");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate captcha (case-insensitive)
    if (!captchaInput || captchaInput.trim().toUpperCase() !== captchaExpected) {
      alert("❌ Captcha incorrect. Please try again.");
      generateAlphaCaptcha();
      return;
    }

    const user = users.find(
      (u) =>
        u.username === userid &&
        u.password === password &&
        u.role === role &&
        (role === "admin" || u.access)
    );
    if (user) {
      setCurrentUser(user);
      setStep("dashboard");
      setUserid("");
      setPassword("");
      setCaptchaInput("");
    } else {
      alert(role === "student" ? "❌ Student access denied or invalid credentials." : "❌ Invalid credentials.");
      // regenerate captcha after failed attempt
      generateAlphaCaptcha();
    }
  };

  const handleLogout = () => {
    setStep("chooseRole");
    setRole(null);
    setCurrentUser(null);
    setSelectedSubject(null);
  };

  return (
    <>
      {step === "chooseRole" && <LoginRole handleRoleClick={handleRoleClick} />}
      {step === "enterCreds" && (
        <LoginForm
          role={role}
          userid={userid}
          password={password}
          setUserid={setUserid}
          setPassword={setPassword}
          handleLogin={handleLogin}
          captchaValue={captchaValue}
          captchaInput={captchaInput}
          setCaptchaInput={setCaptchaInput}
          refreshCaptcha={() => generateAlphaCaptcha()}
        />
      )}
      {step === "dashboard" && (
        <Dashboard
          currentUser={currentUser}
          users={users}
          setUsers={setUsers}
          subjects={subjects}
          uploadedBooks={uploadedBooks}
          setUploadedBooks={setUploadedBooks}
          uploadedVideos={uploadedVideos}
          setUploadedVideos={setUploadedVideos}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default App;