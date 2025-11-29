
import React, { useEffect, useState } from "react";

const Books = ({ uploadedBooks, selectedSubject }) => {
  const [urls, setUrls] = useState({}); // { subject: [ { name, fileName, url } ] }

  useEffect(() => {
    // Create object URLs for each uploaded file
    const newUrls = {};
    Object.keys(uploadedBooks || {}).forEach((sub) => {
      newUrls[sub] = uploadedBooks[sub].map((book) => ({
        name: book.name,
        fileName: book.file.name,
        url: URL.createObjectURL(book.file),
      }));
    });

    // Revoke previous URLs
    Object.values(urls)
      .flat()
      .forEach((b) => {
        try {
          if (b && b.url) URL.revokeObjectURL(b.url);
        } catch (e) {
          // ignore
        }
      });

    setUrls(newUrls);

    // Cleanup on unmount
    return () => {
      Object.values(newUrls)
        .flat()
        .forEach((b) => {
          try {
            if (b && b.url) URL.revokeObjectURL(b.url);
          } catch (e) {
            // ignore
          }
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedBooks]);

  const displaySubjects = selectedSubject ? [selectedSubject] : Object.keys(uploadedBooks || {});
  const foundBooks = displaySubjects.filter((sub) => uploadedBooks[sub] && uploadedBooks[sub].length > 0);

  if (foundBooks.length === 0)
    return (
      <p style={{ color: "#888", fontStyle: "italic", marginTop: 20 }}>
        ❌ No books available for this subject.
      </p>
    );

  return (
    <div style={{ marginTop: 20 }}>
      <h3>📚 Books</h3>
      {foundBooks.map((sub) => (
        <div
          key={sub}
          style={{
            marginBottom: 18,
            background: "#fff",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #eee",
          }}
        >
          <p style={{ fontWeight: 600, margin: "0 0 8px 0" }}>{sub}:</p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {urls[sub] &&
              urls[sub].map((book, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>
                  <span style={{ marginRight: 8 }}>📘 {book.name}</span>
                  <a
                    href={book.url}
                    download={book.fileName}
                    style={{ marginLeft: 8, textDecoration: "none" }}
                  >
                    Download
                  </a>
                  {" • "}
                  <a href={book.url} target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Books;