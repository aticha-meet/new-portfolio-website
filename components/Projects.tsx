"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, Cpu, Database } from "lucide-react";
import { Github } from "./BrandIcons";
import { projects, skillGroups, type ProjectCategory } from "@/lib/data";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { Container } from "./Container";
import { GlassBox } from "./GlassBox";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const categories = ["All projects", "Backend", "IoT", "Mobile"] as const;
const skillIcons = { database: Database, code: Code2, cpu: Cpu };

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All projects">(
    "All projects",
  );
  const visible = projects.filter(
    (project) => filter === "All projects" || project.category === filter,
  );

  return (
    <section id="projects" className="section projects-section">
      <Container>
        <Reveal>
          <div className="projects-heading">
            <SectionHeading
              number="03"
              label="MY TOOLKIT & SELECTED WORK"
              title="Ideas, brought to life."
              description="A collection of experiments, coursework, and things I’ve built along the way."
            />
            <a
              className="text-link"
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              More on GitHub <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
        <Reveal>
          <div className="skill-grid">
            {skillGroups.map((group) => {
              const Icon = skillIcons[group.icon];
              return (
                <GlassBox className="skill-card" key={group.name}>
                  <span className="skill-icon">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3>{group.name}</h3>
                    <p>{group.items.join(" · ")}</p>
                  </div>
                </GlassBox>
              );
            })}
          </div>
        </Reveal>
        <div className="project-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
                {category === "All projects" && <span>{projects.length}</span>}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="project-count">
            {visible.length} projects
          </p>
        </div>
        <div className="project-grid">
          {visible.map((project) => (
            <Reveal key={project.number}>
              <article className="project-card glass-box">
                <a
                  className="project-image-link"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Image
                    src={images[project.image].src}
                    alt={images[project.image].alt}
                    sizes="(max-width: 767px) 90vw, (max-width: 1200px) 45vw, 550px"
                    placeholder="blur"
                  />
                  <span className="image-label">PROJECT CONCEPT</span>
                  <span className="project-open">
                    <ArrowUpRight size={21} />
                  </span>
                </a>
                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>/{project.number}</span>
                  </div>
                  <h3>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <span>{project.role}</span>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} — GitHub`}
                    >
                      <Github size={17} />
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
