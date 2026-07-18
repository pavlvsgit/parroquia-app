"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TOKENS } from "./theme";

// Table of contents for the "Para catequistas" sections, with scrollspy so
// the current section is marked as the reader scrolls. The page mounts this
// twice — variant="desktop" (sticky vertical list in the right rail) and
// variant="mobile" (sticky dropdown inline above the content) — and CSS
// media queries in theme.js decide which one paints, so there's no
// SSR/client viewport-detection mismatch to worry about.
export default function SectionNav({ sections, variant }) {
  const [activeSlug, setActiveSlug] = useState(sections[0]?.slug ?? null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.slug)).filter(Boolean);
    if (!elements.length) return undefined;

    // Treats the section crossing a line ~15% down the viewport as "current" —
    // narrower at the bottom so short trailing sections don't win too early.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveSlug(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!open) return undefined;
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!sections.length) return null;

  if (variant === "mobile") {
    const current = sections.find((s) => s.slug === activeSlug) ?? sections[0];
    return (
      <div
        ref={containerRef}
        className="section-toc-mobile"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          marginTop: 20,
          background: TOKENS.paper,
          paddingBottom: 4,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 13.5,
            fontWeight: 600,
            color: TOKENS.oxbloodDeep,
            background: TOKENS.paperDeep,
            border: "1px solid rgba(38,52,74,0.12)",
            borderRadius: 10,
            padding: "10px 14px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(38,52,74,0.06)",
          }}
        >
          {current.shortTitle}
          <ChevronDown
            size={16}
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s ease" }}
          />
        </button>
        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              background: "#fff",
              border: `1px solid ${TOKENS.paperDeep}`,
              borderRadius: 10,
              boxShadow: "0 8px 20px rgba(38,52,74,0.14)",
              padding: 6,
            }}
          >
            {sections.map((section) => {
              const active = section.slug === activeSlug;
              return (
                <a
                  key={section.slug}
                  href={`#${section.slug}`}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? TOKENS.oxbloodDeep : "#6b7280",
                    background: active ? "rgba(195,116,25,0.08)" : "transparent",
                    textDecoration: "none",
                    borderRadius: 8,
                    padding: "8px 10px",
                  }}
                >
                  {section.shortTitle}
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav aria-label="Secciones de la clase" className="section-toc-desktop">
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 1 }}>
        {sections.map((section) => {
          const active = section.slug === activeSlug;
          return (
            <li key={section.slug}>
              <a
                href={`#${section.slug}`}
                style={{
                  display: "block",
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.4,
                  fontWeight: active ? 700 : 500,
                  color: active ? TOKENS.oxbloodDeep : "#9a9284",
                  borderLeft: `2px solid ${active ? TOKENS.oxblood : "transparent"}`,
                  textDecoration: "none",
                  padding: "6px 0 6px 14px",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }}
              >
                {section.shortTitle}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
