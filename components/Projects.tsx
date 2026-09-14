"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Boxes,
  Server,
  PanelsTopLeft,
  Cloud,
  Smartphone,
} from "lucide-react";
import { Github } from "./BrandIcons";
import {
  projects,
  skillGroups,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/lib/data";
import { images, getImageOptions, isDetailImage } from "@/config/images";
import { site } from "@/config/site";
import { projectDisplay } from "@/config/projects";
import { Container } from "./Container";
import { GlassBox } from "./GlassBox";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const categories = ["All projects", ...projectCategories] as const;
const skillIcons = {
  database: Database,
  code: Code2,
  cpu: Cpu,
  workflow: GitBranch,
  services: Boxes,
  server: Server,
  frontend: PanelsTopLeft,
  cloud: Cloud,
  mobile: Smartphone,
};

function ProjectCard({ project }: { project: Project }) {
  const cover = images[project.image];
  const concept = "placeholder" in cover ? cover.placeholder : !project.status;
  const visual = (
    <>
      <Image
        src={cover.src}
        {...getImageOptions(cover)}
        alt={cover.alt}
        className={isDetailImage(cover) ? "detail-image" : undefined}
        sizes="(max-width: 767px) 90vw, (max-width: 1200px) 45vw, 550px"
        placeholder={cover.src.blurDataURL ? "blur" : "empty"}
      />
      <span className="image-label">
        {concept ? "PROJECT CONCEPT" : "PROJECT IMAGE"}
      </span>
      {project.href && (
        <span className="project-open">
          <ArrowUpRight size={21} aria-hidden="true" />
        </span>
      )}
    </>
  );
  return (
    <article className="project-card glass-box">
      {project.href ? (
        <a
          className="project-image-link"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} source code on GitHub`}
        >
          {visual}
        </a>
      ) : (
        <div className="project-image-link">{visual}</div>
      )}
      <div className="project-content">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>/{project.number}</span>
        </div>
        <h3>
          {project.href ? (
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        {project.status && (
          <span className="project-status">{project.status}</span>
        )}
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {isDetailImage(cover) && (
          <a
            href={cover.src.src}
            target="_blank"
            rel="noreferrer"
            className="text-link project-fullsize"
          >
            View full-size image <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
        <div className="project-footer">
          <span>{project.role}</span>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — GitHub`}
            >
              <Github size={17} />
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All projects">(
    "All projects",
  );
  const filteredProjects = projects.filter(
    (project) => filter === "All projects" || project.category === filter,
  );
  const shownCount = Math.min(
    projectDisplay.limit ?? filteredProjects.length,
    filteredProjects.length,
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
              description="Company work, apps for everyday needs, robotics prototypes, and the tools I use to build them."
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
          <div className="skill-grid" aria-label="Tech stack">
            {skillGroups.map((group) => {
              const Icon = skillIcons[group.icon];
              return (
                <GlassBox className="skill-card" key={group.name}>
                  <span className="skill-icon">
                    <Icon size={21} aria-hidden="true" />
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
            {shownCount < filteredProjects.length
              ? `Showing ${shownCount} of ${filteredProjects.length} projects`
              : `${shownCount} projects`}
          </p>
        </div>
        <div className="project-grid">
          {filteredProjects
            .slice(0, projectDisplay.limit ?? undefined)
            .map((project) => (
              <Reveal key={project.number}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
        </div>
        <div className="projects-beyond">
          <Link href="/beyond" className="button button-primary">
            Explore activities on Beyond{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
