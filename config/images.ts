import type { StaticImageData } from "next/image";
import profile from "@/assets/images/profile/aticha.webp";
import eyeDetection from "@/assets/images/projects/eye-detection/cover.webp";
import smartCane from "@/assets/images/projects/smart-cane/cover.webp";
import apiLab from "@/assets/images/projects/api-lab/cover.webp";
import currencyApp from "@/assets/images/projects/currency-app/cover.webp";
import smeDatabase from "@/assets/images/projects/sme-database/cover.webp";
import teaching from "@/assets/images/activities/teaching.webp";
import research from "@/assets/images/activities/research-to-market.webp";
import games from "@/assets/images/activities/university-games.webp";

type PortfolioImage = { src: StaticImageData; alt: string };

/** Import all portfolio photos here. Components reference a key, never a file path. */
export const images = {
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
