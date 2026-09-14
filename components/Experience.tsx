import Image from "next/image";
import { ArrowUpRight, Award } from "lucide-react";
import { experiences } from "@/lib/data";
import { images } from "@/config/images";
import { Container } from "./Container";
import { GlassBox } from "./GlassBox";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <Container>
        <Reveal>
          <SectionHeading
            number="02"
            label="EXPERIENCE & LITTLE MILESTONES"
            title="More than lines of code."
            description="Teaching, research, and teamwork. Experiences that shape how I think and build."
          />
        </Reveal>
        <div className="experience-grid">
          <div className="timeline">
            {experiences.map((item) => (
              <Reveal key={item.title}>
                <article className="timeline-item">
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-date">
                    {item.date}
                    <span>{item.category}</span>
                  </div>
                  <GlassBox className="experience-card">
                    <h3>{item.title}</h3>
                    <p className="organization">{item.organization}</p>
                    <p>{item.description}</p>
                    <span className="achievement">
                      <Award size={14} />
                      {item.tag}
                    </span>
                  </GlassBox>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="experience-aside">
            <Reveal>
              <figure className="moment-card">
                <Image
                  src={images.teaching.src}
                  alt={images.teaching.alt}
                  sizes="(max-width: 767px) 90vw, 420px"
                  placeholder="blur"
                />
                <figcaption>
                  <span className="small-label">A MOMENT TO REMEMBER</span>
                  <strong>
                    Sharing knowledge.
                    <br />
                    Finding confidence.
                  </strong>
                  <span>Thailand Teaching Academy Award · 2024</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal>
              <GlassBox className="beyond-card">
                <Image
                  src={images.games.src}
                  alt={images.games.alt}
                  width={96}
                  height={96}
                  sizes="96px"
                />
                <div>
                  <span className="small-label">AWAY FROM THE KEYBOARD</span>
                  <h3>Part of a team.</h3>
                  <p>Represented KMUTT at the 50th University Games.</p>
                </div>
                <ArrowUpRight size={20} aria-hidden="true" />
              </GlassBox>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
