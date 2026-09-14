import eduFlowConcept from "@/assets/images/experience/placeholders/edu-flow.svg";
import groceryStoreConcept from "@/assets/images/experience/placeholders/grocery-store.svg";
import classroomConcept from "@/assets/images/experience/placeholders/classroom.svg";
import roboticsConcept from "@/assets/images/experience/placeholders/robotics.svg";
import gnssConcept from "@/assets/images/experience/placeholders/gnss.svg";
import designThinkingConcept from "@/assets/images/experience/placeholders/design-thinking.svg";
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

type PortfolioImage = {
  src: StaticImageData;
  alt: string;
  placeholder?: boolean;
};

/** Import all portfolio photos here. Components reference a key, never a file path. */
export const images = {
  eduFlow: {
    src: eduFlowConcept,
    alt: "Concept illustration of an exam management dashboard",
    placeholder: true,
  },
  groceryStore: {
    src: groceryStoreConcept,
    alt: "Concept illustration of store inventory and barcode scanning",
    placeholder: true,
  },
  classroomAutomation: {
    src: classroomConcept,
    alt: "Concept illustration of assignments and grading reminders",
    placeholder: true,
  },
  robotics12: {
    src: roboticsConcept,
    alt: "Concept illustration of a programmable competition robot",
    placeholder: true,
  },
  asefaDemo: {
    src: roboticsConcept,
    alt: "Concept illustration of a robot for a live demonstration",
    placeholder: true,
  },
  gnssRobotic: {
    src: gnssConcept,
    alt: "Concept illustration of satellite positioning",
    placeholder: true,
  },
  robotics11: {
    src: roboticsConcept,
    alt: "Concept illustration of an autonomous competition robot",
    placeholder: true,
  },
  gosoftWorkshop: {
    src: designThinkingConcept,
    alt: "Concept illustration of ideas, code, and teamwork",
    placeholder: true,
  },
  adapterLogo: { src: adapterLogo, alt: "Adapter Digital Group logo" },
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
