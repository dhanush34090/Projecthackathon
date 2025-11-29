

import React, { useEffect, useState } from "react";

const Videos = ({ uploadedVideos = {}, selectedSubject = null }) => {
  const [urls, setUrls] = useState({}); // { subject: [ { name, fileName, url } ] }
  const [active, setActive] = useState({ subject: null, idx: null });

  useEffect(() => {
    const newUrls = {};
    Object.keys(uploadedVideos).forEach((sub) => {
      newUrls[sub] = uploadedVideos[sub].map((v) => ({
        name: v.name,
        fileName: v.file.name,
        url: URL.createObjectURL(v.file),
      }));
    });

    // revoke previous
    Object.values(urls)
      .flat()
      .forEach((b) => {
        try {
          if (b && b.url) URL.revokeObjectURL(b.url);
        } catch (e) {}
      });

    setUrls(newUrls);

    return () => {
      Object.values(newUrls)
        .flat()
        .forEach((b) => {
          try {
            if (b && b.url) URL.revokeObjectURL(b.url);
          } catch (e) {}
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedVideos]);

  const displaySubjects = selectedSubject ? [selectedSubject] : Object.keys(uploadedVideos || {});
  const found = displaySubjects.filter((sub) => uploadedVideos[sub] && uploadedVideos[sub].length > 0);

  if (found.length === 0)
    return (
      <div style={{ marginTop: 20 }}>
        <h3>🎥 Videos</h3>
        <p style={{ color: "#888", fontStyle: "italic" }}>No videos available for this subject.</p>
      </div>
    );

  return (
    <div style={{ marginTop: 20 }}>
      <h3>🎥 Videos</h3>

      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ minWidth: 300, maxWidth: 420, flex: "1 1 320px" }}>
          {found.map((sub) => (
            <div key={sub} style={{ marginBottom: 16, background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee" }}>
              <p style={{ fontWeight: 600, margin: "0 0 8px 0" }}>{sub}:</p>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {urls[sub] &&
                  urls[sub].map((v, idx) => (
                    <li key={idx} style={{ marginBottom: 8 }}>
                      <span style={{ marginRight: 8 }}>🎬 {v.name}</span>
                      <button
                        onClick={() => setActive({ subject: sub, idx })}
                        style={{ marginLeft: 8, padding: "4px 8px", borderRadius: 8 }}
                      >
                        Watch
                      </button>
                      {" • "}
                      <a href={v.url} download={v.fileName} style={{ textDecoration: "none", marginLeft: 6 }}>
                        Download
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ flex: "1 1 420px", minWidth: 320 }}>
          {active.subject !== null && active.idx !== null && urls[active.subject] && urls[active.subject][active.idx] ? (
            <div style={{ background: "#000", padding: 8, borderRadius: 8 }}>
              <div style={{ color: "#fff", marginBottom: 8 }}>{urls[active.subject][active.idx].name}</div>
              <video
                key={urls[active.subject][active.idx].url}
                src={urls[active.subject][active.idx].url}
                controls
                style={{ width: "100%", borderRadius: 6, background: "#000" }}
              />
            </div>
          ) : (
            <div style={{ background: "#fff", padding: 16, borderRadius: 8, border: "1px solid #eee" }}>
              <div style={{ color: "#666" }}>Select a video to watch</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;