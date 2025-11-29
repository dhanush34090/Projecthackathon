
import React from "react";

const AdminSection = ({
  users,
  setUsers,
  subjects,
  setUploadedBooks,
  uploadedBooks,
  uploadedVideos,
  setUploadedVideos,
}) => {
  const handleUpload = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.bookName.value.trim();
    const subject = form.bookSubject.value;
    const file = form.bookFile.files[0];
    if (!name || !subject || !file) {
      alert("Please fill all fields.");
      return;
    }
    setUploadedBooks((prev) => {
      const updated = { ...prev };
      if (!updated[subject]) updated[subject] = [];
      updated[subject].push({ name, file });
      return updated;
    });
    alert(`📚 Book "${name}" uploaded under ${subject}`);
    form.reset();
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const access = form.access.checked;
    if (!username || !password) {
      alert("Please fill all fields.");
      return;
    }
    setUsers((prev) => [...prev, { username, password, role: "student", access }]);
    alert(`✅ Student "${username}" added successfully`);
    form.reset();
  };

  const toggleAccess = (username) => {
    setUsers((prev) => prev.map((u) => (u.username === username ? { ...u, access: !u.access } : u)));
  };

  // ---- Video upload handler ----
  const handleVideoUpload = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.videoName.value.trim();
    const subject = form.videoSubject.value;
    const file = form.videoFile.files[0];
    if (!name || !subject || !file) {
      alert("Please fill all fields for video.");
      return;
    }
    // simple validation for mp4
    if (file.type !== "video/mp4" && !file.name.toLowerCase().endsWith(".mp4")) {
      if (!window.confirm("The uploaded file is not an MP4. Continue anyway?")) {
        return;
      }
    }
    setUploadedVideos((prev) => {
      const updated = { ...prev };
      if (!updated[subject]) updated[subject] = [];
      updated[subject].push({ name, file });
      return updated;
    });
    alert(`🎬 Video "${name}" uploaded under ${subject}`);
    form.reset();
  };

  return (
    <>
      <div style={{ marginTop: 30 }}>
        <h3>📤 Upload Book</h3>
        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input type="text" name="bookName" placeholder="Book Name" required />
          <select name="bookSubject" required>
            <option value="">Select Subject</option>
            {Object.keys(subjects).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="file"
              name="bookFile"
              accept="application/pdf, .doc, .docx"
              required
            />
            <small style={{ color: "#666" }}>PDF, DOC, or DOCX</small>
          </label>

          <button type="submit">Upload</button>
        </form>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>🎥 Upload Video (MP4)</h3>
        <form onSubmit={handleVideoUpload} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input type="text" name="videoName" placeholder="Video Title" required />
          <select name="videoSubject" required>
            <option value="">Select Subject</option>
            {Object.keys(subjects).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="file" name="videoFile" accept="video/mp4" required />
            <small style={{ color: "#666" }}>MP4 only (recommended)</small>
          </label>

          <button type="submit">Upload Video</button>
        </form>

        {/* Show a quick list of uploaded videos for admin */}
        <div style={{ marginTop: 12 }}>
          <h4 style={{ marginBottom: 8 }}>Uploaded Videos (by subject)</h4>
          {Object.keys(uploadedVideos || {}).length === 0 ? (
            <div style={{ color: "#888" }}>No videos uploaded yet.</div>
          ) : (
            Object.keys(uploadedVideos).map((sub) => (
              <div key={sub} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{sub}:</div>
                <ul>
                  {uploadedVideos[sub].map((v, i) => (
                    <li key={i}>
                      🎬 {v.name} ({v.file.name})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>👨‍🎓 Add Student</h3>
        <form onSubmit={handleAddStudent} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" name="access" defaultChecked /> <span>Access Granted</span>
          </label>
          <button type="submit">Add Student</button>
        </form>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>🔑 Student Access Control</h3>
        {users
          .filter((u) => u.role === "student")
          .map((stu) => (
            <div key={stu.username} style={{ marginBottom: 10 }}>
              <strong>{stu.username}</strong> - Access: {stu.access ? "✅" : "❌"}
              <button
                style={{ marginLeft: 10 }}
                onClick={() => toggleAccess(stu.username)}
              >
                Toggle Access
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminSection;