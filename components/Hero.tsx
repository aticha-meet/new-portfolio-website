import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  MapPin,
} from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";

export function Hero() {
  return (
    <section id="home" className="hero-section" aria-label="Introduction">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />A LITTLE CURIOSITY. A LOT OF
              POSSIBILITY.
            </p>
            <h1>
              Hi, I’m{" "}
              <span className="name-highlight">
                Jaosou
                <svg viewBox="0 0 270 13" aria-hidden="true">
                  <path d="M3 8 Q130 -3 266 7 M12 11 Q140 4 254 10" />
                </svg>
              </span>
              .<br />I build things
              <br />
              that <span className="serif-word">connect.</span>
            </h1>
            <p className="hero-description">
              I’m Aticha Meetunyakron — an engineering mind with a passion for
              backend development. Connecting data, devices, and ideas to build
              something useful.
            </p>
            <div className="hero-actions">
              <ButtonLink href="#projects">
                Explore my work <ArrowUpRight size={18} />
              </ButtonLink>
              <ButtonLink
                variant="secondary"
                href={site.resume.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View resume <ArrowUpRight size={17} />
              </ButtonLink>
            </div>
            <div className="hero-socials">
              <span className="location">
                <MapPin size={14} />
                Based in Thailand
              </span>
              <span className="social-divider" />
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-decoration" aria-hidden="true" />
            <div className="portrait-card">
              <div className="portrait-image">
                <Image
                  src={images.profile.src}
                  alt={images.profile.alt}
                  sizes="(max-width: 767px) 80vw, 380px"
                  loading="eager"
                  fetchPriority="high"
                  placeholder="blur"
                />
              </div>
              <div className="portrait-caption">
                <span>ATicha / JAOSOU</span>
                <span>
                  Nice to meet you <ArrowUpRight size={15} />
                </span>
              </div>
            </div>
            <div className="floating-note note-code">
              <span className="note-icon">
                <Code2 size={20} />
              </span>
              <div>
                <strong>Curious by nature.</strong>
                <span>Developer by passion.</span>
              </div>
            </div>
            <div className="floating-note note-detail">
              <span className="status-dot" />
              Backend, data & a little more
            </div>
            <ArrowDownRight
              className="hand-arrow"
              size={57}
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="hero-bottom">
          <span>CODE WITH PURPOSE. LEARN BY DOING.</span>
          <a href="#about">
            A little more about me <ArrowDown size={15} />
          </a>
          <span className="edition">PORTFOLIO — 2026</span>
        </div>
      </Container>
    </section>
  );
}
