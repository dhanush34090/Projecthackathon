

// utils.jsx

// -----------------------------
// 📄 Sample PDF content generator
// -----------------------------
export const samplePDF = new Blob(["This is a sample PDF content."], {
  type: "application/pdf",
});

// -----------------------------
// 🎬 Sample video content generator (tiny placeholder blob)
// -----------------------------
export const sampleVideo = new Blob(["\u0000\u0001sample video content"], { type: "video/mp4" });

// -----------------------------
// 👥 Initial Users
// -----------------------------
export const initialUsers = [
  { username: "admin", password: "AdminLibrary@2025", role: "admin" },
  { username: "student1", password: "Student@2006", role: "student", access: true },
  { username: "student2", password: "pass456", role: "student", access: true },
];

// -----------------------------
// 📚 Initial Uploaded Books
// -----------------------------
export const initialUploadedBooks = {
  Maths: [{ name: "Algebra Basics", file: new File([samplePDF], "Algebra.pdf") }],
  DBMS: [{ name: "Intro to SQL", file: new File([samplePDF], "SQL.pdf") }],
  "C Programming": [
    { name: "Pointers Deep Dive", file: new File([samplePDF], "Pointers.pdf") },
  ],
  "Data Structures": [
    {
      name: "Data Structures Fundamentals",
      file: new File([samplePDF], "DataStructures.pdf"),
    },
  ],
  Algorithms: [
    { name: "Sorting and Searching", file: new File([samplePDF], "Algorithms.pdf") },
  ],
  "Operating Systems": [
    { name: "OS Concepts", file: new File([samplePDF], "OperatingSystems.pdf") },
  ],
  "Computer Networks": [
    {
      name: "Network Basics",
      file: new File([samplePDF], "ComputerNetworks.pdf"),
    },
  ],
};

// -----------------------------
// 🎥 Initial Uploaded Videos
// -----------------------------
export const initialUploadedVideos = {
  "Computer Networks": [
    { name: "Networking Basics (Intro)", file: new File([sampleVideo], "network_intro.mp4") },
  ],
  "Operating Systems": [
    { name: "Processes & Threads Lecture", file: new File([sampleVideo], "os_processes.mp4") },
  ],
};

// -----------------------------
// 🧠 Subject Generator (150 total)
// -----------------------------
export const generateSubjects = () => {
  const baseSubjects = {
    Maths: ["Algebra", "Calculus", "Geometry", "Trigonometry"],
    "C Programming": ["Variables", "Loops", "Functions", "Pointers"],
    DBMS: ["ER Diagrams", "Normalization", "SQL Queries", "Transactions"],
    "Front-End": ["HTML", "CSS", "JavaScript", "React"],
    English: ["Grammar", "Vocabulary", "Comprehension", "Writing Skills"],
    Sports: ["Football", "Basketball", "Cricket", "Athletics"],
  };

  // -----------------------------
  // 🧑‍💻 Engineering Subjects
  // -----------------------------
  const engineeringSubjects = [
    "Data Structures",
    "Algorithms",
    "Computer Networks",
    "Operating Systems",
    "Power Systems",
    "Machine Design",
    "Thermodynamics",
    "Embedded Systems",
    "Cloud Computing",
    "Cyber Security",
    "AI & ML",
    "Database Design",
    "Software Engineering",
    "Digital Logic Design",
    "Microprocessors",
    "VLSI Design",
    "Data Mining",
    "Mobile Computing",
    "Compiler Design",
    "Discrete Mathematics",
    "Numerical Methods",
    "Control Systems",
    "Robotics",
    "Image Processing",
    "Signal Processing",
    "Neural Networks",
    "Internet of Things",
    "Computer Graphics",
    "Parallel Computing",
    "Quantum Computing",
    "Big Data Analytics",
  ];

  // -----------------------------
  // 🔬 Science Subjects
  // -----------------------------
  const scienceSubjects = [
    "Physics",
    "Chemistry",
    "Biology",
    "Environmental Science",
    "Genetics",
    "Zoology",
    "Botany",
    "Microbiology",
    "Molecular Biology",
    "Biotechnology",
    "Astronomy",
    "Astrophysics",
    "Geology",
    "Oceanography",
    "Meteorology",
    "Analytical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry",
    "Material Science",
    "Nanotechnology",
  ];

  // -----------------------------
  // 💼 Commerce & Management Subjects
  // -----------------------------
  const commerceSubjects = [
    "Accounting",
    "Business Studies",
    "Economics",
    "Finance",
    "Marketing",
    "Human Resource Management",
    "Supply Chain Management",
    "Entrepreneurship",
    "Investment Banking",
    "Auditing",
    "E-Commerce",
    "Business Analytics",
    "Risk Management",
    "Corporate Law",
    "Cost Accounting",
    "International Business",
    "Managerial Economics",
    "Operations Management",
    "Taxation",
    "Organizational Behavior",
  ];

  // -----------------------------
  // 🎨 Arts & Humanities Subjects
  // -----------------------------
  const artsSubjects = [
    "History",
    "Political Science",
    "Sociology",
    "Philosophy",
    "Psychology",
    "Geography",
    "Public Administration",
    "Fine Arts",
    "Music",
    "Dance",
    "Film Studies",
    "Media and Communication",
    "Cultural Studies",
    "Ethics",
    "Education",
    "Linguistics",
    "Literature",
    "Archaeology",
    "International Relations",
    "Law and Society",
  ];

  // -----------------------------
  // ⚙️ Skill Development & Emerging Fields
  // -----------------------------
  const skillSubjects = [
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "Web Development",
    "Mobile App Development",
    "Game Development",
    "UI/UX Design",
    "Blockchain",
    "Cloud Infrastructure",
    "DevOps",
    "Automation Testing",
    "Cyber Forensics",
    "Digital Marketing",
    "SEO Optimization",
    "Content Writing",
    "Graphic Design",
    "Video Editing",
    "3D Animation",
    "Virtual Reality",
    "Augmented Reality",
    "Product Design",
    "Entrepreneurial Thinking",
    "Leadership Skills",
    "Project Management",
    "Negotiation Skills",
    "Public Speaking",
    "Critical Thinking",
    "Time Management",
    "Creative Writing",
    "Innovation & Design Thinking",
  ];

  // Combine all subject categories
  const allSubjects = [
    ...engineeringSubjects,
    ...scienceSubjects,
    ...commerceSubjects,
    ...artsSubjects,
    ...skillSubjects,
  ];

  // Generate dynamic topics for each subject
  const subjectsMap = {};
  allSubjects.forEach((subject) => {
    subjectsMap[subject] = [
      `Introduction to ${subject}`,
      `${subject} Basics`,
      `${subject} Advanced Concepts`,
      `Applications of ${subject}`,
      `Recent Trends in ${subject}`,
    ];
  });

  // Return total subjects
  return { ...baseSubjects, ...subjectsMap };
};

// ✅ Log total subjects count (for quick verification)
console.log("Total subjects loaded:", Object.keys(generateSubjects()).length);