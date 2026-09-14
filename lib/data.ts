import type { ImageKey } from "@/config/images";

// Adapted from the owner's previous portfolio. No current employment or graduation is assumed.
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

export const experiences = [
  {
    date: "2024",
    category: "TEACHING & COMMUNICATION",
    title: "Sharing what I know.",
    organization: "11th Thailand Teaching Academy Award",
    description:
      "Led a computer theory teaching session and received a silver medal. Adapted the lesson when the internet disconnected during the competition.",
    tag: "Silver medal",
    image: "teaching" as ImageKey,
  },
  {
    date: "2024",
    category: "RESEARCH & BUSINESS",
    title: "From research to the real world.",
    organization: "Research to Market (R2M)",
    description:
      "Researched production processes, product costs, and business opportunities. Joined the entrepreneurship bootcamp and received a commendation award with the team.",
    tag: "Commendation award",
    image: "research" as ImageKey,
  },
  {
    date: "2023 — 2024",
    category: "MENTORING",
    title: "Learning, then passing it on.",
    organization: "Physics & Calculus · Teaching Assistant",
    description:
      "Helped first-year students with physics during orientation and supported peers with calculus. Later helped junior students prepare and teach their own classes.",
    tag: "Peer learning",
    image: null,
  },
];

export const skillGroups = [
  {
    name: "Backend & data",
    icon: "database",
    items: ["Python", "Golang", "MySQL", "REST APIs"],
  },
  {
    name: "Web & mobile",
    icon: "code",
    items: ["Flutter", "Dart", "Bootstrap"],
  },
  {
    name: "Hardware & tools",
    icon: "cpu",
    items: ["C++", "Arduino", "NodeMCU", "MySQL Workbench"],
  },
] as const;

export type ProjectCategory = "Backend" | "IoT" | "Mobile";
export type Project = {
  number: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  image: ImageKey;
  href: string;
  role: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Drowsiness detection",
    category: "IoT",
    description:
      "Exploring eye tracking to detect driver drowsiness and help prevent traffic accidents.",
    tags: ["Eye tracking", "Detection", "Software"],
    image: "eyeDetection",
    href: "https://github.com/Jaosou/Eye-detection-project",
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
    href: "https://github.com/Jaosou/MiniPro-GpsTraker-XYZ",
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
    href: "https://github.com/Jaosou/Build-and-Test-API",
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
    href: "https://github.com/Jaosou/Develop-a-currency-exchange-rate-application-with-various-functions",
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
    href: "https://github.com/Jaosou/Jaosou-Database-design-model-for-small-SMEs",
    role: "Database connectivity & programming",
  },
];
