"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/config/site";
import { Container } from "./Container";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeAnchor = (hash: string) => (isHome ? hash : "/" + hash);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const query = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (query.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    query.addEventListener("change", closeOnDesktop);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      query.removeEventListener("change", closeOnDesktop);
    };
  }, [pathname]);

  return (
    <header className="site-header" ref={header}>
      <Container className="header-inner">
        <a
          href={homeAnchor("#home")}
          className="wordmark"
          aria-label="Jaosou — home"
          onClick={() => setOpen(false)}
        >
          jaosou<span>.</span>
          <span className="wordmark-caption">PORTFOLIO</span>
        </a>
        <nav
          aria-label="Main navigation"
          id="main-navigation"
          className={`main-navigation ${open ? "is-open" : ""}`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={
                item.href.startsWith("#") ? homeAnchor(item.href) : item.href
              }
              aria-current={
                item.href === pathname
                  ? "page"
                  : isHome && active === item.href
                    ? "location"
                    : undefined
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-resume"
          >
            View resume <ArrowUpRight size={15} />
          </a>
        </nav>
        <a className="header-resume" href={homeAnchor("#contact")}>
          Let’s connect <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>
    </header>
  );
}
