import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Code2, ImageIcon } from "lucide-react";
import { github } from "@/config/github";
import { experiences } from "@/lib/data";
import { images, getImageOptions, isDetailImage } from "@/config/images";
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
            label="WORK EXPERIENCE & MILESTONES"
            title="Experience that shapes how I work."
            description="My internship at Adapter, apps built for everyday needs, and hands-on work in robotics and technical teamwork."
          />
        </Reveal>
        {experiences
          .filter((item) => item.featured)
          .map((item) => (
            <Reveal key={item.title}>
              <article
                className="featured-experience glass-box"
                aria-label={item.title}
              >
                <div className="featured-experience-heading">
                  <span className="featured-experience-logo">
                    <Image
                      src={images.adapterLogo.src}
                      {...getImageOptions(images.adapterLogo)}
                      alt={images.adapterLogo.alt}
                      width={146}
                      height={46}
                      sizes="146px"
                    />
                  </span>
                  <div>
                    <p className="featured-experience-label">
                      FEATURED WORK EXPERIENCE
                    </p>
                    <h3>{item.title}</h3>
                    {item.date && (
                      <p className="featured-experience-date">{item.date}</p>
                    )}
                  </div>
                  <span className="featured-experience-tag">{item.tag}</span>
                </div>
                {item.projectTitle && (
                  <h4 className="featured-experience-project">
                    {item.projectTitle}
                  </h4>
                )}
                {item.description && (
                  <p className="featured-experience-description">
                    {item.description}
                  </p>
                )}
                {item.highlights && (
                  <ul className="featured-experience-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {item.technologies && (
                  <ul
                    className="featured-experience-technologies"
                    aria-label="Technologies used at Adapter"
                  >
                    {item.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                )}
                {github.experiences.adapterCms && (
                  <a
                    className="featured-experience-repository"
                    href={github.experiences.adapterCms}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View repository{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        <div className="experience-story-timeline">
          {experiences
            .filter((item) => !item.featured)
            .map((item) => {
              const photo = item.image ? images[item.image] : null;
              const isPlaceholder =
                !photo || ("placeholder" in photo && photo.placeholder) as boolean;
              return (
                <Reveal key={item.organization}>
                  <article className="experience-story-row">
                    <span className="timeline-dot" aria-hidden="true" />
                    <div className="experience-story-copy">
                      <div className="timeline-date">
                        {item.date}
                        <span>{item.category}</span>
                      </div>
                      <GlassBox className="experience-card technical-experience-card">
                        <p className="experience-role">{item.role}</p>
                        <h3>{item.title}</h3>
                        <p className="organization">{item.organization}</p>
                        <p>{item.description}</p>
                        <span className="achievement">
                          {item.award ? (
                            <Award size={14} aria-hidden="true" />
                          ) : (
                            <Code2 size={14} aria-hidden="true" />
                          )}
                          {item.tag}
                        </span>
                        {item.technologies && (
                          <ul
                            className="experience-technologies"
                            aria-label={"Skills used at " + item.organization}
                          >
                            {item.technologies.map((technology) => (
                              <li key={technology}>{technology}</li>
                            ))}
                          </ul>
                        )}
                        {item.repository && (
                          <a
                            href={item.repository}
                            className="text-link experience-repository"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View repository{" "}
                            <ArrowUpRight size={16} aria-hidden="true" />
                          </a>
                        )}
                      </GlassBox>
                    </div>
                    <figure className="experience-story-media glass-box">
                      {photo ? (
                        <Image
                          src={photo.src}
                          {...getImageOptions(photo)}
                          alt={photo.alt}
                          className={
                            isDetailImage(photo) ? "detail-image" : undefined
                          }
                          sizes="(max-width: 767px) 85vw, (max-width: 1100px) 40vw, 480px"
                        />
                      ) : (
                        <div
                          className="experience-photo-empty"
                          aria-hidden="true"
                        >
                          <ImageIcon size={48} strokeWidth={1} />
                        </div>
                      )}
                      <figcaption>
                        <span className="small-label">
                          {isPlaceholder
                            ? "CONCEPT ILLUSTRATION"
                            : "A CLOSER LOOK"}
                        </span>
                        <strong>{item.organization}</strong>
                        {photo && isDetailImage(photo) && (
                          <a
                            href={photo.src.src}
                            target="_blank"
                            rel="noreferrer"
                            className="text-link"
                          >
                            View full-size image{" "}
                            <ArrowUpRight size={16} aria-hidden="true" />
                          </a>
                        )}
                        {isPlaceholder && (
                          <span className="experience-media-note">
                            Illustration · project photos to follow
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  </article>
                </Reveal>
              );
            })}
        </div>
        <Link href="/beyond" className="appendix-teaser glass-box">
          <span>
            <span className="small-label">BEYOND THE CODE</span>
            <strong>Teaching, activities, and the rest of the story.</strong>
          </span>
          <span className="text-link">
            Explore the appendix <ArrowUpRight size={18} />
          </span>
        </Link>
      </Container>
    </section>
  );
}
