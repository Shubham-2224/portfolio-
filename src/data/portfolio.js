// Single source of truth for all portfolio content.
// Edit here — every section reads from this file.

export const personalInfo = {
  name: "Shubham Desai",
  firstName: "Shubham",
  lastName: "Desai",
  initials: "SD",
  role: "AI Engineer & Data Analyst",
  location: "Aurangabad, Maharashtra",
  country: "India",
  timeZone: "Asia/Kolkata",
  availability: "Open to AI & data roles",
  workMode: "Remote or on-site",
  profileImage: "/profile.webp",
  profileImageSmall: "/profile-400.webp",
  email: "desaishubham248@gmail.com",
  phone: "+91 7219429987",
  github: "Shubham-2224",
  githubUrl: "https://github.com/Shubham-2224",
  // Drop your CV at public/resume.pdf and set this to "/resume.pdf" to show
  // the "Résumé" buttons. Left empty so the site never links to a missing file.
  resumeUrl: "",
  about:
    "AI and Data Science Engineer with hands-on experience in Python, Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI, and cloud deployment. I focus on building practical AI systems that automate workflows, surface actionable insights, and solve real business challenges with measurable impact.",
};

// Headline numbers — each one is taken from the experience / project entries below.
export const metrics = [
  { value: 40, suffix: "%", label: "Workflow automation gain", source: "Coreline IT Solution" },
  { value: 90, suffix: "%+", label: "OCR extraction accuracy", source: "Voter data extraction" },
  { value: 30, suffix: "%", label: "Faster reporting cycles", source: "Dhoot Automation Systems" },
  { value: 10, suffix: "K+", label: "Production records analysed", source: "Dhoot Automation Systems" },
];

export const disciplines = [
  {
    key: "ai",
    title: "AI Engineering",
    summary: "LLM applications, document intelligence and model-backed APIs, built to run in production.",
    points: [
      "LLM-powered apps with OpenAI APIs, LangChain and RAG",
      "Intelligent document processing and OCR pipelines",
      "REST API services deployed on AWS",
    ],
  },
  {
    key: "data",
    title: "Data Analysis",
    summary: "From raw production data to dashboards that stakeholders actually use to decide.",
    points: [
      "Power BI and Tableau dashboards for monitoring",
      "EDA and statistics with Pandas, NumPy and SQL",
      "Trend and bottleneck analysis on 10,000+ records",
    ],
  },
];

export const skills = [
  { category: "Programming", items: ["Python", "SQL"] },
  { category: "Data Science", items: ["NumPy", "Pandas", "Statistics", "EDA", "Data Visualization"] },
  { category: "Analytics & BI", items: ["Power BI", "Tableau", "Excel Reporting"] },
  {
    category: "Machine Learning",
    items: ["Scikit-learn", "TensorFlow", "Keras", "CNN", "ANN", "RNN", "Transfer Learning"],
  },
  {
    category: "NLP & Generative AI",
    items: ["LLMs", "RAG", "LangChain", "Prompt Engineering", "OpenAI API", "BERT", "NLTK"],
  },
  { category: "Computer Vision", items: ["OpenCV", "YOLOv8", "OCR"] },
  { category: "MLOps", items: ["MLflow", "Docker", "Databricks", "CI/CD"] },
  { category: "Cloud & Tooling", items: ["AWS", "REST APIs", "Postman", "Git"] },
];

export const marqueeTech = [
  "Python",
  "LangChain",
  "OpenAI API",
  "RAG",
  "TensorFlow",
  "Scikit-learn",
  "Pandas",
  "SQL",
  "Power BI",
  "Tableau",
  "OpenCV",
  "YOLOv8",
  "AWS",
  "Docker",
  "MLflow",
];

export const experience = [
  {
    role: "Python & GenAI Developer",
    company: "Coreline IT Solution",
    period: "Jun 2025 — Present",
    current: true,
    track: "AI Engineering",
    summary: "Building LLM-powered applications and automation for business workflows.",
    achievements: [
      "Engineered LLM-powered AI applications for business automation use cases",
      "Integrated OpenAI APIs into production workflows and internal tools",
      "Built intelligent document processing pipelines for faster data extraction",
      "Improved operational workflow automation by 40%",
      "Deployed AI services on AWS with scalable API architecture",
      "Developed REST API-based AI systems for model integration",
    ],
    stack: ["Python", "OpenAI API", "LLMs", "AWS", "REST APIs"],
  },
  {
    role: "Assistant Data Analyst",
    company: "Dhoot Automation Systems",
    period: "Jan 2025 — Jun 2025",
    current: false,
    track: "Data Analysis",
    summary: "Turning production data into monitoring dashboards and stakeholder reports.",
    achievements: [
      "Developed interactive Power BI dashboards for production monitoring",
      "Created Tableau reports for stakeholder decision support",
      "Analyzed production datasets of 10,000+ records to identify trends and bottlenecks",
      "Improved reporting efficiency by 30% through structured dashboard workflows",
    ],
    stack: ["Power BI", "Tableau", "SQL", "Excel"],
  },
];

export const projects = [
  {
    title: "Voter Data Extraction",
    kind: "Computer Vision · OCR",
    visual: "ocr",
    description:
      "OCR-driven voter data extraction system using Python and OpenCV with multilingual text recognition and high-accuracy parsing.",
    highlight: { value: "90%+", label: "extraction accuracy" },
    features: ["OCR Automation", "OpenCV Processing", "Multilingual Recognition"],
    github: "https://github.com/Shubham-2224/maharashtra-voter-list-extraction-",
  },
  {
    title: "Real-Time Web Scraping System",
    kind: "Data Engineering · Automation",
    visual: "pipeline",
    description:
      "Automated real-time web scraping pipeline with scheduled collection, live updates, and export-ready Excel reporting.",
    features: ["Beautiful Soup", "Scheduler Automation", "Live Updates", "Excel Integration"],
    github: "https://github.com/Shubham-2224/DPBoss-Live-result-",
  },
  {
    title: "AI Text-to-Image Generator",
    kind: "Generative AI · Diffusion",
    visual: "diffusion",
    description:
      "Prompt-based image generation application built on Hugging Face diffusion models with iterative prompt refinement.",
    features: ["Stable Diffusion", "Prompt Engineering", "Dynamic Prompt Refinement"],
    github: "https://github.com/Shubham-2224/text-to-image-genration-ai-model",
  },
];

export const education = [
  {
    title: "B.Tech in Artificial Intelligence & Data Science",
    place: "Marathwada Institute of Technology, Aurangabad",
    period: "2022 — 2025",
    score: "CGPA 8.2",
  },
  {
    title: "Diploma in Computer Engineering",
    place: "MIT Polytechnic, Aurangabad",
    period: "2019 — 2022",
    score: "82.17%",
  },
];

export const certifications = [
  { title: "Data Science & GenAI Developer", place: "Naresh IT, Hyderabad" },
  { title: "Python Programming Certification", place: "IT Council, New Delhi", score: "81%" },
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Work", href: "#work" },
  { name: "Credentials", href: "#credentials" },
  { name: "Contact", href: "#contact" },
];
