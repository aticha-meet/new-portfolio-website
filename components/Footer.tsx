import { ArrowUp } from "lucide-react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <a href="#home" className="wordmark" aria-label="Jaosou — back to home">
          jaosou<span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} Aticha Meetunyakron.
          <span> Made with curiosity & care.</span>
        </p>
        <a className="back-top" href="#home">
          Back to top <ArrowUp size={15} />
        </a>
      </Container>
    </footer>
  );
}
