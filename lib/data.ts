import type { ImageKey } from "@/config/images";
import { github } from "@/config/github";

// Historical education from the previous portfolio; internship details are supplied by the owner.
export const education = [
  {
    date: "Started in 2022",
    name: "King Mongkut’s University of Technology Thonburi",
    detail: "Electrical Engineering · KMUTT",
    mark: "K",
  },
  {
    date: "2019 — 2022",
    name: "Princess Chulabhorn Science High School Chonburi",
    detail: "Secondary education",
    mark: "P",
  },
];

export type WorkExperience = {
  date: string | null;
  category: string;
  title: string;
  organization: string;
  description: string | null;
  tag: string;
  image: ImageKey | null;
  featured?: boolean;
  repository?: string | null;
  role?: string;
  award?: boolean;
  highlights?: string[];
  projectTitle?: string;
  technologies?: string[];
};

export const experiences: WorkExperience[] = [
  {
    date: "2 June — 31 August 2025 · 3 months",
    category: "WORK EXPERIENCE",
    title: "Internship at Adapter",
    organization: "Adapter",
    projectTitle: "A CMS for the company’s main website",
    description:
      "Built an internal CMS for Adapter in an Nx monorepo, with a Next.js frontend and an Express.js backend. The CMS lets the team add content and control which information appears on the company’s main website.",
    tag: "Internship",
    image: null,
    featured: true,
    highlights: [
      "Integrated Google OAuth 2.0 sign-in with organization access checks to reject unauthorized accounts, and added reCAPTCHA for bot protection.",
      "Implemented pagination to limit the records returned per query and reduce query load when working with large datasets.",
      "Configured GitHub Actions workflows for CI/CD and automated deployment.",
      "Automated image migration from the legacy website to the new site using Python scripts and APIs.",
    ],
    technologies: [
      "Nx",
      "Next.js",
      "Express.js",
      "Google OAuth 2.0",
      "reCAPTCHA",
      "GitHub Actions",
      "Python",
    ],
  },
  {
    date: "2026",
    category: "PERSONAL APP · FULL-STACK & DEVOPS",
    title: "Edu Flow",
    organization: "A self-built education ERP",
    role: "Full-Stack Developer & DevOps",
    description:
      "Built an ERP web app for exam management and monitoring student cheating. Ran the database in Docker during testing, then deployed separate services using Dockerfiles and Docker Compose. A Cloudflare container makes the app accessible to users, while OAuth 2.0 and an allowlist restrict access.",
    tag: "Built for personal use",
    image: "eduFlow",
    repository: github.experiences.eduFlow,
    technologies: ["Docker", "Docker Compose", "Cloudflare", "OAuth 2.0"],
  },
  {
    date: "2026",
    category: "PERSONAL APP · RETAIL OPERATIONS",
    title: "Grocery Store App",
    organization: "Built for my family’s grocery store",
    role: "Builder & grandson of the store owner",
    description:
      "Created a tool to manage products, track inventory, and record sales in my family’s grocery store. QR codes and barcode scanning help retrieve the correct price and keep track of stock running low. The app is now being used to support the shop’s daily work.",
    tag: "In use at the family store",
    image: "groceryStore",
    repository: github.experiences.groceryStore,
    technologies: ["Inventory management", "Barcode & QR", "Sales tracking"],
  },
  {
    date: "2026",
    category: "PERSONAL AUTOMATION · EDUCATION",
    title: "Google Classroom Automation",
    organization: "Google Apps Script for my teaching workflow",
    role: "Teacher & automation builder",
    description:
      "Used Google Apps Script and the Google Classroom API to manage classes and retrieve assignment data. Automated repetitive work, added assignment updates, and surfaced ungraded work with reminders to make the grading workflow easier to follow.",
    tag: "Built for my teaching workflow",
    image: "classroomAutomation",
    repository: github.experiences.classroomAutomation,
    technologies: ["Google Apps Script", "Google Classroom API", "Automation"],
  },
  {
    date: "2026",
    category: "ROBOTICS & TECHNICAL LEADERSHIP",
    title: "Leading the code. Solving the challenge.",
    organization: "Teaching Academy Thailand 12th · Robot",
    role: "Lead Coder",
    description:
      "Led Arduino programming with a junior teammate, designing the robot’s control logic and troubleshooting software and hardware. The team earned a gold medal and finished as runner-up.",
    tag: "Gold medal · Runner-up",
    award: true,
    image: "robotics12",
    technologies: ["Arduino", "Robot control", "Technical leadership"],
  },
  {
    date: "2026",
    category: "TECHNICAL DEMONSTRATION",
    title: "Bringing the robot to a live audience.",
    organization: "Exhibition booth at ASEFA Co., Ltd.",
    role: "Lead Coder & Commentator",
    description:
      "Demonstrated the competition robot lifting boxes like a forklift, crossing a bridge, and completing its mission. Explained the robot’s capabilities and exchanged technical knowledge with company executives.",
    tag: "Live robot demonstration",
    image: "asefaDemo",
    technologies: ["Robotics", "Technical communication"],
  },
  {
    date: "2025",
    category: "POSITIONING & HARDWARE",
    title: "Learning through low-cost positioning.",
    organization: "GNSS Low Cost Robotic",
    role: "Coder & Hardware",
    description:
      "Contributed coding and hardware work to a low-cost satellite positioning competition. Used the experience as a foundation for solving problems in later robotics competitions.",
    tag: "Competition participant",
    image: "gnssRobotic",
    technologies: ["GNSS", "Hardware", "Problem solving"],
  },
  {
    date: "2025",
    category: "ROBOTICS & CONTROL",
    title: "Making autonomous movement smoother.",
    organization: "Teaching Academy Thailand 11th · Robot",
    role: "Assistant Coder",
    description:
      "Supported the design and programming of an automatic can-gripping robot. Used line tracking and PID control to help the robot move steadily and smoothly.",
    tag: "Autonomous robot development",
    image: "robotics11",
    technologies: ["Line tracking", "PID control", "Robotics"],
  },
  {
    date: "2025",
    category: "DESIGN THINKING & DEVELOPMENT",
    title: "Connecting code with a business idea.",
    organization: "Design Thinking Workshop · Gosoft (Thailand) Co., Ltd.",
    role: "Coder & Presenter",
    description:
      "Joined a design thinking workshop and mini hackathon to model a business idea for Gosoft. Contributed coding and presentation work in a team whose members brought different specialties.",
    tag: "Workshop & mini hackathon",
    image: "gosoftWorkshop",
    technologies: ["Design thinking", "Prototyping", "Presentation"],
  },
];

export const skillGroups = [
  {
    name: "CI/CD",
    icon: "workflow",
    items: ["GitHub Actions", "GitHub Workflows"],
  },
  {
    name: "Services",
    icon: "services",
    items: ["Docker", "Docker Compose", "Cloudflare"],
  },
  {
    name: "Backend",
    icon: "server",
    items: ["Express.js", "FastAPI", "Python", "Golang", "REST APIs"],
  },
  {
    name: "Frontend",
    icon: "frontend",
    items: ["Next.js", "React", "Bootstrap"],
  },
  { name: "Deployment", icon: "cloud", items: ["Netlify", "Vercel"] },
  { name: "Object-oriented programming", icon: "code", items: ["Java"] },
  { name: "Mobile", icon: "mobile", items: ["Dart", "Flutter"] },
  { name: "Data", icon: "database", items: ["MySQL", "MySQL Workbench"] },
  { name: "Hardware & IoT", icon: "cpu", items: ["C++", "Arduino", "NodeMCU"] },
] as const;

export const projectCategories = [
  "Full-stack",
  "Automation",
  "Robotics",
  "Backend",
  "IoT",
  "Mobile",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];
export type Project = {
  number: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  image: ImageKey;
  href: string | null;
  status?: string;
  role: string;
};

const legacyProjects: Project[] = [
  {
    number: "01",
    title: "Drowsiness detection",
    category: "IoT",
    description:
      "Exploring eye tracking to detect driver drowsiness and help prevent traffic accidents.",
    tags: ["Eye tracking", "Detection", "Software"],
    image: "eyeDetection",
    href: github.projects.eyeDetection,
    role: "Program design, development & testing",
  },
  {
    number: "02",
    title: "A smarter walking cane",
    category: "IoT",
    description:
      "A fall-detection cane that connects NodeMCU to a Telegram bot and sends a location link when a fall is detected.",
    tags: ["NodeMCU", "Telegram API", "GPS"],
    image: "smartCane",
    href: github.projects.smartCane,
    role: "End-to-end project development",
  },
  {
    number: "03",
    title: "From database to API",
    category: "Backend",
    description:
      "Designed and tested a Python API to retrieve database records and display them on a webpage.",
    tags: ["Python", "REST API", "Database"],
    image: "apiLab",
    href: github.projects.apiLab,
    role: "API design, implementation & peer support",
  },
  {
    number: "04",
    title: "Currency, converted.",
    category: "Mobile",
    description:
      "A Flutter app that fetches online exchange rates and makes currency conversion easy to explore.",
    tags: ["Flutter", "Dart", "API integration"],
    image: "currencyApp",
    href: github.projects.currencyApp,
    role: "End-to-end app development",
  },
  {
    number: "05",
    title: "Small business, connected data",
    category: "Backend",
    description:
      "A data collection model for a computer assembly shop, from process flowcharts to a working database connection.",
    tags: ["Python", "MySQL", "Data modeling"],
    image: "smeDatabase",
    href: github.projects.smeDatabase,
    role: "Database connectivity & programming",
  },
];

/** Reuse experience content and image keys so both sections stay in sync. */
const projectFromExperience: Partial<
  Record<ImageKey | "adapterCms", { title: string; category: ProjectCategory }>
> = {
  adapterCms: { title: "Adapter Website CMS", category: "Full-stack" },
  eduFlow: { title: "Edu Flow", category: "Full-stack" },
  groceryStore: { title: "Grocery Store App", category: "Full-stack" },
  classroomAutomation: {
    title: "Google Classroom Automation",
    category: "Automation",
  },
  robotics12: {
    title: "Competition Robot · Teaching Academy 12",
    category: "Robotics",
  },
  gnssRobotic: { title: "Low-cost GNSS Robot", category: "Robotics" },
  robotics11: { title: "Line-tracking & PID Robot", category: "Robotics" },
};
const experienceProjects: Omit<Project, "number">[] = experiences.flatMap(
  (experience) => {
    const key = experience.featured ? "adapterCms" : experience.image;
    const selection = key ? projectFromExperience[key] : undefined;
    if (!key || !selection) return [];
    return [
      {
        title: selection.title,
        category: selection.category,
        description: experience.description ?? "",
        tags: experience.technologies ?? [],
        image: key,
        href: experience.featured
          ? github.experiences.adapterCms
          : (experience.repository ?? null),
        role: experience.role ?? "Full-stack development & CI/CD",
        status: experience.featured ? "Company project" : experience.tag,
      },
    ];
  },
);

export const projects: Project[] = [
  ...experienceProjects,
  ...legacyProjects,
].map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, "0"),
}));
