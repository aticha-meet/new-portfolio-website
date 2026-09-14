import { experiences } from "@/lib/data";
import type { ImageKey } from "@/config/images";

export type Activity = {
  id: string;
  date: string;
  title: string;
  organization: string;
  role: string;
  description: string;
  highlights: string[];
  image: ImageKey;
  caption: string;
  gallery?: { image: ImageKey; caption: string }[];
};

// Historical activities from the owner's original portfolio, not current employment.
export const teachingActivities: Activity[] = [
  {
    id: "teaching-assistant",
    date: "2023 — 2024",
    title: "Making difficult subjects feel a little easier.",
    organization: "Physics & Calculus · KMUTT",
    role: "Teaching assistant & peer mentor",
    description:
      "Helped first-year students learn physics during orientation camp and supported classmates with calculus. Later, I helped younger students prepare their own lessons and taught physics and calculus sessions myself.",
    highlights: [
      "Explaining ideas clearly",
      "Supporting younger students",
      "Learning through teaching",
    ],
    image: "teachingAssistant",
    caption: "Teaching and learning together during university activities.",
    gallery: [
      {
        image: "teachingAssistantClass",
        caption:
          "Another moment from the physics and calculus teaching activities.",
      },
    ],
  },
  {
    id: "teaching-academy",
    date: "2024",
    title: "A classroom, a challenge, and a silver medal.",
    organization: "11th Thailand Teaching Academy Award",
    role: "Lead teacher · Computer Theory category",
    description:
      "Led the teaching session with a friend as my assistant and received a silver medal. When the internet disconnected during the competition, I adapted the session and kept the lesson going.",
    highlights: ["Silver medal", "Lesson delivery", "Adapting under pressure"],
    image: "teachingSession",
    caption: "Taking part in the Thailand Teaching Academy Award competition.",
    gallery: [
      {
        image: "teaching",
        caption: "A shared memory from the 2024 teaching competition.",
      },
    ],
  },
];

const historicalCommunityActivities: Activity[] = [
  {
    id: "research-to-market",
    date: "2024",
    title: "Looking at research through a business lens.",
    organization: "Research to Market (R2M)",
    role: "Competition participant · Cost research & analysis",
    description:
      "Explored production processes, product costs, and entrepreneurship through a business bootcamp and competition. Our team received a commendation award.",
    highlights: ["Commendation award", "Cost analysis", "Entrepreneurship"],
    image: "research",
    caption: "With the Research to Market team.",
  },
  {
    id: "university-games",
    date: "50th UNIVERSITY GAMES",
    title: "Showing up for the team.",
    organization: "KMUTT · University Games, Thailand",
    role: "University athlete",
    description:
      "Selected to represent King Mongkut’s University of Technology Thonburi at the 50th University Games, hosted at Kasetsart University, Kamphaeng Saen. A memorable experience of commitment and being part of a team.",
    highlights: ["University representative", "Teamwork", "Discipline"],
    image: "games",
    caption: "A moment with fellow university athletes.",
  },
  {
    id: "four-tien-games",
    date: "2023",
    title: "A shared effort. A second-place finish.",
    organization: "4-Tien Games · KMUTNB",
    role: "University sports team member",
    description:
      "Joined the inter-university games hosted by King Mongkut’s University of Technology North Bangkok. Our team finished in second place.",
    highlights: ["Second place", "Team spirit", "Inter-university sports"],
    image: "fourTienGames",
    caption: "Taking part in the 4-Tien Games.",
  },
  {
    id: "world-scout-jamboree",
    date: "2019",
    title: "A wider world, and new perspectives.",
    organization: "24th World Scout Jamboree · West Virginia, USA",
    role: "Thai Scout delegation member",
    description:
      "Selected as part of the Thai Scout delegation to the World Scout Jamboree at the Summit Bechtel Reserve. An opportunity to meet people from different backgrounds and experience life beyond familiar surroundings.",
    highlights: ["International experience", "Cultural exchange", "Scouting"],
    image: "worldScout",
    caption:
      "With fellow scouts at the World Scout Jamboree in the United States.",
  },
];

const technicalActivityImages = new Set<ImageKey>([
  "robotics12",
  "asefaDemo",
  "gnssRobotic",
  "robotics11",
  "gosoftWorkshop",
]);

export const technicalActivities: Activity[] = experiences.flatMap(
  (experience) => {
    if (!experience.image || !technicalActivityImages.has(experience.image))
      return [];
    return [
      {
        id: "activity-" + experience.image,
        date: experience.date ?? "",
        title: experience.title,
        organization: experience.organization,
        role: experience.role ?? "",
        description: experience.description ?? "",
        highlights: [experience.tag, ...(experience.technologies ?? [])],
        image: experience.image,
        caption: experience.organization,
      },
    ];
  },
);

export const communityActivities: Activity[] = [
  ...technicalActivities,
  ...historicalCommunityActivities,
];
