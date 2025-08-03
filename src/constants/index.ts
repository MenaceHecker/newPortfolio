const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 5, suffix: "+", label: "Hackathons" },
  { value: 75, suffix: "%", label: "Project Completion Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
   {
    imgPath: "/images/logos/company-logo-7.png",
  },
   {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Writing clean, scalable code with rigorous testing and optimization, ensuring robust performance across all platforms.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Maintaining transparent project workflows with regular stand-ups, documentation, and proactive problem-solving.",
  },
  {
  imgPath: "/images/devices.png",
  title: "Cross-Platform Development",
  desc: "Building versatile applications for iOS, Android, and web platforms using modern frameworks and unified codebases for maximum reach.",
},
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "AWS Solutions Architect",
    modelPath: "/models/aws_logo.glb",
    scale: 0.42,
    rotation: [0, Math.PI * 0.1, 0],
  },
  {
    name: "Android Developer",
    modelPath: "/models/android_logo.glb",
    scale: 0.015,
    rotation: [0,0, 0],
  },
];

const expCards = [
  {
    review: "Tushar's contributions significantly enhanced our frontend and microservice infrastructure. His ability to modernize enterprise systems and optimize performance was impressive.",
    imgPath: "/images/CRST_exp.png",
    logoPath: "/images/logo_CRST.png",
    title: "Software Engineer Intern",
    date: "June 2024 - August 2024",
    responsibilities: [
      "Rebuilt enterprise-facing Capacity Portal frontend using Angular and NgRx Store, improving UI responsiveness by 35%.",
      "Architected Java Spring Boot microservices on Kubernetes, accelerating API responses by 30% for 10,000+ daily requests.",
      "Implemented centralized logging with Elasticsearch/Kibana, halving issue resolution time.",
      "Established Prometheus-based monitoring with 25+ dashboards, improving production issue detection by 40%.",
    ],
  },
  {
    review: "Tushar played a key role in research-driven AI development. His expertise in machine learning and cloud deployment made impactful contributions to our lab projects.",
    imgPath: "/images/UGA_exp.png",
    logoPath: "/images/logo_UGA.png",
    title: "Lead Undergraduate Research Assistant",
    date: "January 2024 - May 2024",
    responsibilities: [
      "Built AI predictive models using Transformers and Graph Neural Networks, improving accuracy by 15%.",
      "Designed optimized SQL schemas and GraphQL APIs in PostgreSQL, enhancing query performance by 25%.",
      "Orchestrated ML models on AWS Lambda for scalable AI-based fact-checking.",
      "Refactored pipelines to improve cloud integration and reduce processing time by 20%.",
    ],
  },
  {
    review: "Tushar's support kept our technical systems running smoothly and securely. His proactive approach and cloud migration efforts enhanced service delivery across departments.",
    imgPath: "/images/caes_exp.png",
    logoPath: "/images/logo_UGAcaes.png",
    title: "Technology Support Assistant",
    date: "March 2023 - December 2023",
    responsibilities: [
      "Provided technical support to 1,000+ users, maintaining an 80% first contact resolution rate.",
      "Resolved 100+ hardware, software, and network issues, reducing recurring problems by 25%.",
      "Executed Azure-based cloud migrations for 6 departments, improving scalability and security.",
    ],
  },
];


const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];


const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    url: "https://www.instagram.com/tu.shaw.r25/"
  },
  {
    name: "x",
    imgPath: "/images/git-icon.png",
    url: "https://github.com/MenaceHecker"
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    url: "https://www.linkedin.com/in/tushar-mishra-7960b722b/"
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};