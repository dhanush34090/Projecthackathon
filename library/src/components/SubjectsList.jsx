
import React from "react";

const highlight = (text, term) => {
  if (!term) return text;
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "#fff176" }}>{text.slice(idx, idx + term.length)}</mark>
      {text.slice(idx + term.length)}
    </>
  );
};

const SubjectsList = ({ subjects, searchTerm, setSelectedSubject }) => {
  const filteredSubjects = Object.keys(subjects).filter((sub) =>
    sub.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 10,
        maxHeight: "520px",
        overflowY: "auto",
        padding: 8,
        borderRadius: 8,
        background: "#f7f9fb",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {filteredSubjects.length > 0 ? (
        filteredSubjects.map((sub) => (
          <div
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedSubject(sub);
            }}
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 8,
              cursor: "pointer",
              textAlign: "left",
              border: "1px solid #eee",
              userSelect: "none",
            }}
          >
            {highlight(sub, searchTerm)}
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", color: "#888", padding: 24 }}>
          ❌ No subjects found for <strong>"{searchTerm}"</strong>
        </div>
      )}
    </div>
  );
};

export default SubjectsList;