
// Dashboard.jsx
import React from "react";
import SubjectsList from "./SubjectsList";
import Books from "./Books";
import AdminSection from "./AdminSection";
import Topics from "./Topics";
import Videos from "./Videos";

const Dashboard = ({
  currentUser,
  users,
  setUsers,
  subjects,
  uploadedBooks,
  setUploadedBooks,
  uploadedVideos,
  setUploadedVideos,
  searchTerm,
  setSearchTerm,
  selectedSubject,
  setSelectedSubject,
  handleLogout,
}) => {
  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Welcome, {currentUser.username}</h2>
          <small style={{ color: "#666" }}>{currentUser.role.toUpperCase()}</small>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div
        className="dashboard-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN: Search (moved here) + SubjectsList */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="🔍 Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: 8,
                width: "100%",
                borderRadius: 8,
                border: "1px solid #ddd",
                outline: "none",
              }}
            />
          </div>

          <SubjectsList
            subjects={subjects}
            searchTerm={searchTerm}
            setSelectedSubject={setSelectedSubject}
          />
        </div>

        {/* RIGHT COLUMN: Admin, Books, Videos, Topics */}
        <div>
          {currentUser.role === "admin" && (
            <AdminSection
              users={users}
              setUsers={setUsers}
              subjects={subjects}
              setUploadedBooks={setUploadedBooks}
              uploadedBooks={uploadedBooks}
              uploadedVideos={uploadedVideos}
              setUploadedVideos={setUploadedVideos}
            />
          )}

          <Books uploadedBooks={uploadedBooks} selectedSubject={selectedSubject} />

          <Videos uploadedVideos={uploadedVideos} selectedSubject={selectedSubject} />

          {selectedSubject && <Topics subject={selectedSubject} subjects={subjects} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;