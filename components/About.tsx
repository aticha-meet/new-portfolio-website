import Image from "next/image";
import {
  ArrowUpRight,
  GraduationCap,
  HeartHandshake,
  Trophy,
} from "lucide-react";
import { images } from "@/config/images";
import { education } from "@/lib/data";
import { Container } from "./Container";
import { GlassBox } from "./GlassBox";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section about-section">
      <Container>
        <Reveal>
          <SectionHeading
            number="01"
            label="THE PERSON BEHIND THE CODE"
            title="An engineer’s curiosity. A builder’s mindset."
          />
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <GlassBox className="about-story">
              <div className="about-person">
                <Image
                  src={images.profile.src}
                  alt={images.profile.alt}
                  width={74}
                  height={86}
                  sizes="74px"
                  className="about-avatar"
                />
                <div>
                  <p className="small-label">A LITTLE ABOUT ME</p>
                  <h3>Aticha Meetunyakron</h3>
                  <span>You can call me Jaosou.</span>
                </div>
              </div>
              <p>
                My background in Electrical Engineering at KMUTT sparked an
                interest in how systems work — and how software can make them
                work better.
              </p>
              <p>
                I enjoy the logic behind the screen: building APIs, working with
                databases, and connecting hardware to software. I learn best by
                turning an idea into a working project.
              </p>
              <div className="personal-note">
                <HeartHandshake size={19} />
                <span>
                  Outside of code? Teaching, team sports, and learning from
                  people.
                </span>
              </div>
            </GlassBox>
          </Reveal>
          <Reveal>
            <GlassBox className="education-card">
              <div className="card-label">
                <GraduationCap size={20} />
                <h3>Where I’ve learned</h3>
              </div>
              <div className="education-list">
                {education.map((item) => (
                  <div className="education-item" key={item.name}>
                    <span className="education-mark">{item.mark}</span>
                    <div>
                      <span className="small-label">{item.date}</span>
                      <h4>{item.name}</h4>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a className="education-footnote" href="#experience">
                <Trophy size={16} />
                <span>Learning goes beyond the classroom.</span>
                <ArrowUpRight size={16} />
              </a>
            </GlassBox>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
