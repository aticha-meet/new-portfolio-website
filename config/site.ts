import { github } from "@/config/github";

export const site = {
  name: "Aticha Meetunyakron",
  nickname: "Jaosou",
  title: "Aticha Meetunyakron — Developer Portfolio",
  description:
    "Engineering curiosity meets software development. Explore Aticha's projects in backend development, databases, APIs, and connected devices.",
  email: "aticha0991862895@gmail.com",
  // Set after choosing the new deployment. Do not canonicalize a preview to the old site.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.URL ||
    (process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""),
  location: "Thailand",
  resume: {
    url: "https://canva.link/resume-aticha",
    label: "View resume",
    // Set to /assets/documents/resume.pdf when a real PDF is added to public/.
    downloadUrl: null as string | null,
  },
  social: {
    github: github.profile,
    linkedin: "https://www.linkedin.com/in/aticha-meetunyakron-98b470337/",
    instagram: "https://www.instagram.com/jaosoung_.jjjj/",
    facebook: "https://web.facebook.com/profile.php?id=100010298761769",
  },
} as const;

export const navigation = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "/beyond", label: "Beyond" },
] as const;
