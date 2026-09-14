import { ArrowUpRight, Mail, FileText } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { site } from "@/config/site";
import { Container } from "./Container";
import { GlassBox } from "./GlassBox";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function Contact() {
  const deliveryEnabled = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL,
  );
  return (
    <section id="contact" className="section contact-section">
      <Container>
        <Reveal>
          <GlassBox className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">
                <span>04</span>LET’S MAKE A CONNECTION
              </p>
              <h2>
                Have something
                <br />
                in <span className="serif-word">mind?</span>
              </h2>
              <p>
                An interesting project, a new opportunity, or a conversation
                about building things — I’d love to hear from you.
              </p>
              <a className="contact-email" href={`mailto:${site.email}`}>
                <Mail size={18} />
                <span>{site.email}</span>
                <ArrowUpRight size={17} />
              </a>
              <div className="contact-socials">
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} />
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={17} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <a
                className="resume-link"
                href={site.resume.downloadUrl || site.resume.url}
                download={site.resume.downloadUrl ? true : undefined}
                target={site.resume.downloadUrl ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <FileText size={17} />
                {site.resume.downloadUrl
                  ? "Download resume"
                  : "Take a look at my resume"}
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div>
              <noscript>
                <style>{".contact-form { display: none; }"}</style>
                <p>Please use the direct email link to get in touch.</p>
              </noscript>
              <ContactForm deliveryEnabled={deliveryEnabled} />
            </div>
          </GlassBox>
        </Reveal>
      </Container>
    </section>
  );
}
