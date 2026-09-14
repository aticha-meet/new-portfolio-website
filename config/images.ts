import roboticsPlaceholder from "@/assets/images/activities/teaching-academy-11/teaching-11-renew.jpg";
import kmuttLogo from "@/assets/images/education/kmutt.png";
import pcshsChonburiLogo from "@/assets/images/education/pcshs-chonburi.png";
import eduFlowScreenshot from "@/assets/images/projects/edu-flow/dashboard-score.png";
import groceryStoreScreenshot from "@/assets/images/projects/grocery-store/point-of-sale.png";
import classroomScreenshot from "@/assets/images/projects/classroom-automation/apps-script.png";
import robotics12Poster from "@/assets/images/activities/teaching-academy-12/award-poster.jpg";
import asefaBooth from "@/assets/images/activities/asefa/robot-demo.jpg";
import gnssTeamPhoto from "@/assets/images/activities/gnss-low-cost/team.jpg";
import gosoftCertificate from "@/assets/images/activities/gosoft/design-thinking-certificate.jpg";
import type { StaticImageData } from "next/image";
import adapterLogo from "@/assets/images/companies/adapter/logo.png";
import profile from "@/assets/images/profile/aticha.webp";
import eyeDetection from "@/assets/images/projects/eye-detection/cover.webp";
import smartCane from "@/assets/images/projects/smart-cane/cover.webp";
import apiLab from "@/assets/images/projects/api-lab/cover.webp";
import currencyApp from "@/assets/images/projects/currency-app/cover.webp";
import smeDatabase from "@/assets/images/projects/sme-database/cover.webp";
import teaching from "@/assets/images/activities/teaching.webp";
import research from "@/assets/images/activities/research-to-market.webp";
import games from "@/assets/images/activities/university-games.webp";
import teachingAssistant from "@/assets/images/activities/teaching-assistant.webp";
import teachingAssistantClass from "@/assets/images/activities/teaching-assistant-class.webp";
import teachingSession from "@/assets/images/activities/teaching-academy-session.webp";
import fourTienGames from "@/assets/images/activities/four-tien-games.webp";
import worldScout from "@/assets/images/activities/world-scout-jamboree.webp";
import adapterCms from "@/assets/images/companies/adapter/cms-dashboard.jpg";

type PortfolioImage = {
  src: StaticImageData;
  alt: string;
  placeholder?: boolean;
  kind?: "photo" | "screenshot" | "certificate" | "poster" | "logo";
  fit?: "contain" | "cover";
};

/** Import all portfolio photos here. Components reference a key, never a file path. */
export const images = {
  kmuttLogo: {
    kind: "logo",
    src: kmuttLogo,
    alt: "King Mongkut’s University of Technology Thonburi emblem",
  },
  pcshsChonburiLogo: {
    kind: "logo",
    src: pcshsChonburiLogo,
    alt: "Princess Chulabhorn Science High School Chonburi emblem",
  },
  adapterCms: {
    src: adapterCms,
    alt: "Adapter CMS dashboard for managing company website content",
    placeholder: false,
    kind: "screenshot",
  },
  eduFlow: {
    src: eduFlowScreenshot,
    alt: "Edu Flow exam score dashboard",
    placeholder: false,
    kind: "screenshot",
  },
  groceryStore: {
    src: groceryStoreScreenshot,
    alt: "Grocery Store App point-of-sale screen",
    placeholder: false,
    kind: "screenshot",
  },
  classroomAutomation: {
    src: classroomScreenshot,
    alt: "Google Apps Script code for Classroom automation",
    placeholder: false,
    kind: "screenshot",
  },
  robotics12: {
    src: robotics12Poster,
    alt: "Award announcement for the Teaching Academy Thailand 12 robot contest",
    placeholder: false,
    kind: "poster",
  },
  asefaDemo: {
    src: asefaBooth,
    alt: "The team demonstrating its robot at the ASEFA exhibition booth",
    placeholder: false,
    kind: "photo",
  },
  gnssRobotic: {
    src: gnssTeamPhoto,
    alt: "The low-cost GNSS robotics team with its robot outside the faculty building",
    placeholder: false,
    kind: "photo",
    fit: "contain",
  },
  robotics11: {
    src: roboticsPlaceholder,
    alt: "Concept illustration of an autonomous competition robot",
    placeholder: false,
    kind: "photo",
    fit: "contain",
  },
  gosoftWorkshop: {
    src: gosoftCertificate,
    alt: "Aticha’s certificate of participation in the Gosoft Design Thinking 2025 workshop",
    placeholder: false,
    kind: "certificate",
  },
  adapterLogo: {
    src: adapterLogo,
    alt: "Adapter Digital Group logo",
    kind: "logo",
  },
  teachingAssistant: {
    src: teachingAssistant,
    alt: "Participants in a university teaching activity",
  },
  teachingAssistantClass: {
    src: teachingAssistantClass,
    alt: "Students and teaching assistants during a physics and calculus learning activity",
  },
  teachingSession: {
    src: teachingSession,
    alt: "The silver medal presentation at the Thailand Teaching Academy Award competition",
  },
  fourTienGames: {
    src: fourTienGames,
    alt: "University athletes taking part in the 4-Tien Games",
  },
  worldScout: {
    src: worldScout,
    alt: "Members of the Scout delegation at the World Scout Jamboree in the USA",
  },
  profile: {
    src: profile,
    alt: "Aticha Meetunyakron standing in front of a museum exhibit",
  },
  eyeDetection: {
    src: eyeDetection,
    alt: "Illustration of an eye-tracking system for drowsiness detection",
  },
  smartCane: {
    src: smartCane,
    alt: "Concept illustration for a connected smart walking cane",
  },
  apiLab: {
    src: apiLab,
    alt: "Concept illustration for an API and database development project",
  },
  currencyApp: {
    src: currencyApp,
    alt: "Concept illustration for a currency exchange application",
  },
  smeDatabase: {
    src: smeDatabase,
    alt: "Concept illustration for a small business database system",
  },
  teaching: {
    src: teaching,
    alt: "Aticha taking part in the Thailand Teaching Academy Award competition",
  },
  research: { src: research, alt: "The Research to Market competition team" },
  games: {
    src: games,
    alt: "University athletes at the 50th University Games",
  },
} satisfies Record<string, PortfolioImage>;

export type ImageKey = keyof typeof images;

/** Preserve detailed text in screenshots, certificates, posters, and logos. */
export function getImageOptions(image: PortfolioImage) {
  return {
    unoptimized: isDetailImage(image) || image.kind === "logo",
    quality: 90 as const,
    style: image.fit ? { objectFit: image.fit } : undefined,
  };
}

/** These images show their full aspect ratio and offer a full-size link. */
export function isDetailImage(image: PortfolioImage) {
  return (
    image.kind === "screenshot" ||
    image.kind === "certificate" ||
    image.kind === "poster"
  );
}
