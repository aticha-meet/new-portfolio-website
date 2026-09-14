import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { Container } from "@/components/Container";
import { GlassBox } from "@/components/GlassBox";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ActivityCard } from "@/components/ActivityCard";
import { communityActivities, teachingActivities } from "@/lib/activities";
import { site } from "@/config/site";
import "./beyond.css";

const title = "Beyond the Code — Teaching & Activities | Aticha Meetunyakron";
const description =
  "The other side of Jaosou: teaching, mentoring, university activities, competitions, and experiences beyond software development.";

export const metadata: Metadata = {
  title,
  description,
  ...(site.url ? { alternates: { canonical: "/beyond" } } : {}),
  openGraph: {
    title,
    description,
    type: "website",
    ...(site.url ? { url: new URL("/beyond", site.url).href } : {}),
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function BeyondPage() {
  return (
    <div className="site-shell appendix-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <BackgroundBlobs />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section id="beyond-top" className="appendix-hero">
          <Container>
            <Link className="text-link appendix-back" href="/">
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>
            <div className="grid items-center gap-9 md:grid-cols-[1.45fr_1fr] md:gap-16">
              <div>
                <p className="eyebrow">
                  THE OTHER SIDE OF JAOSOU <span lang="th">/ ภาคผนวก</span>
                </p>
                <h1>
                  Beyond <span className="serif-word">the code.</span>
                </h1>
                <p className="appendix-intro">
                  Teaching, learning, and showing up for people. A few more
                  chapters that have shaped who I am — in the classroom, on a
                  team, and out in the world.
                </p>
              </div>
              <GlassBox className="appendix-index">
                <p className="small-label">IN THIS CHAPTER</p>
                <a href="#teaching">
                  <BookOpen size={20} />
                  <span>
                    Teaching & mentoring
                    <small>{teachingActivities.length} experiences</small>
                  </span>
                  <ArrowDown size={16} />
                </a>
                <a href="#community">
                  <Users size={20} />
                  <span>
                    Activities & community
                    <small>{communityActivities.length} experiences</small>
                  </span>
                  <ArrowDown size={16} />
                </a>
              </GlassBox>
            </div>
          </Container>
        </section>
        <section id="teaching" className="section appendix-section">
          <Container>
            <Reveal>
              <SectionHeading
                number="A"
                label="TEACHING & MENTORING"
                title="A little knowledge, passed on."
                description="Helping someone understand a difficult idea is its own kind of meaningful work."
              />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {teachingActivities.map((activity) => (
                <Reveal key={activity.id}>
                  <ActivityCard activity={activity} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
        <section
          id="community"
          className="section appendix-section appendix-community"
        >
          <Container>
            <Reveal>
              <SectionHeading
                number="B"
                label="ACTIVITIES & COMMUNITY"
                title="There’s more to the story."
                description="Teams, challenges, and experiences that brought me outside my usual routine."
              />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {communityActivities.map((activity) => (
                <Reveal key={activity.id}>
                  <ActivityCard activity={activity} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
        <Container>
          <GlassBox className="appendix-closing flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">
                DIFFERENT EXPERIENCES. THE SAME CURIOSITY.
              </p>
              <h2>Always something more to learn.</h2>
            </div>
            <Link className="button button-primary" href="/#contact">
              Let’s connect <ArrowUpRight size={17} />
            </Link>
          </GlassBox>
        </Container>
      </main>
      <Footer homeHref="/#home" topHref="#beyond-top" />
    </div>
  );
}
