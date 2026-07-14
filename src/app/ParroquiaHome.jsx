"use client";import React, { useState } from "react";
import {
  Church, Calendar, Droplet, Phone, Clock, MapPin, ChevronDown,
  Menu, X, Users, Heart, MessageCircle, Bell, ChevronRight, Cross, 
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&display=swap');`;

const TOKENS = {
  ink: "#26344a",
  paper: "#efeae0",
  paperDeep: "#e2dbc9",
  oxblood: "#c37419",
  gold: "#c9a227",
  green: "#3f5142",
  whatsapp: "#3f6b4a",
};

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "hoy", label: "Hoy" },
  { id: "sacramentos", label: "Sacramentos" },
  { id: "avisos", label: "Avisos" },
  { id: "contacto", label: "Contacto" },
];

// menú de tareas — reemplaza el mensaje de bienvenida genérico
const TAREAS = [
  { icon: Clock, label: "Horarios de misa", target: "hoy" },
  { icon: Users, label: "Confesiones", target: "hoy" },
  { icon: Cross, label: "Bautismo", target: "sacramentos" },
  { icon: Calendar, label: "Eventos", target: "hoy" },
  { icon: Phone, label: "Contacto", target: "contacto" },
];

// agenda cronológica — reemplaza el calendario mensual como vista principal
const AGENDA = {
  hoy: [
    { hora: "8:00", titulo: "Misa", lugar: "Templo principal" },
    { hora: "17:00", titulo: "Confesiones", lugar: "Capilla" },
    { hora: "18:00", titulo: "Rosario", lugar: "Templo principal" },
  ],
  manana: [{ hora: "18:30", titulo: "Catequesis", lugar: "Salón parroquial" }],
  proximos: [{ dia: "Sábado 26 jul", titulo: "Retiro juvenil", lugar: "Salón parroquial" }],
};

const SACRAMENTOS = [
  { nombre: "Bautismo", icon: Droplet, requisitos: ["Acta de nacimiento del niño", "Datos de padrinos confirmados", "Charla prebautismal obligatoria"] },
  { nombre: "Matrimonio", icon: Heart, requisitos: ["Actas de bautismo recientes de ambos", "Curso prematrimonial", "Trámite con 3 meses de anticipación"] },
  { nombre: "Confirmación", icon: Users, requisitos: ["Fe de bautismo", "Catequesis de confirmación", "Padrino confirmado y practicante"] },
];

// avisos — antes "Noticias"
const AVISOS = [
  { titulo: "Horario especial de confesiones en julio", fecha: "10 jul", resumen: "Confesiones extra los jueves de 5 a 7 PM durante todo el mes." },
  { titulo: "Se abrieron inscripciones a catequesis 2026", fecha: "6 jul", resumen: "Cupos limitados, se atienden en la oficina parroquial." },
];

function Section({ id, children, style }) {
  return (
    <section id={id} style={{ padding: "56px 24px", scrollMarginTop: "84px", ...style }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children, color }) {
  return (
    <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: color || TOKENS.oxblood, marginBottom: 10 }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(26px, 4vw, 34px)", color: TOKENS.ink, margin: "0 0 24px 0", lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

function AgendaRow({ hora, titulo, lugar }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${TOKENS.paperDeep}` }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 17, color: TOKENS.oxblood, minWidth: 56 }}>{hora}</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{titulo}</div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>{lugar}</div>
      </div>
    </div>
  );
}

export default function ParroquiaBorradorV2() {
  const [navOpen, setNavOpen] = useState(false);
  const [openSacramento, setOpenSacramento] = useState(0);

  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: TOKENS.paper, minHeight: "100%", fontFamily: "'Public Sans', sans-serif", color: TOKENS.ink }}>
      <style>{FONT_IMPORT}</style>

      <div style={{ background: TOKENS.ink, color: TOKENS.paper, textAlign: "center", fontSize: 12, padding: "6px 12px", letterSpacing: "0.04em" }}>
        BORRADOR v2 — menú de tareas, agenda de hoy, avisos y WhatsApp
      </div>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: TOKENS.paper, borderBottom: `1px solid ${TOKENS.paperDeep}` }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Church size={22} color={TOKENS.oxblood} />
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 19 }}>Parroquia Santa Clara</span>
          </div>

          <nav style={{ display: "flex", gap: 26 }} className="desktop-nav">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: TOKENS.ink, padding: 0 }}>
                {n.label}
              </button>
            ))}
          </nav>

          <button onClick={() => setNavOpen(!navOpen)} className="mobile-nav-btn" style={{ background: "none", border: "none", cursor: "pointer", display: "none" }} aria-label="Abrir menú">
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {navOpen && (
          <div className="mobile-nav-panel" style={{ padding: "0 24px 16px", display: "none", flexDirection: "column", gap: 14 }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: 15, fontWeight: 500, color: TOKENS.ink, padding: "6px 0" }}>
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* INICIO — menú de tareas en vez de mensaje de bienvenida genérico */}
      <Section id="inicio" style={{ paddingTop: 40 }}>
        <Eyebrow>¿Qué necesitas hoy?</Eyebrow>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, maxWidth: 440 }}>
          Toca una opción para ir directo a lo que buscas.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TAREAS.map((t, i) => (
            <button
              key={i}
              onClick={() => scrollTo(t.target)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#fff", border: `1px solid ${TOKENS.paperDeep}`, borderRadius: 10,
                padding: "16px 18px", cursor: "pointer", textAlign: "left", width: "100%",
                fontFamily: "'Public Sans', sans-serif",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <t.icon size={19} color={TOKENS.oxblood} />
                <span style={{ fontWeight: 600, fontSize: 15 }}>{t.label}</span>
              </span>
              <ChevronRight size={18} color="#9ca3af" />
            </button>
          ))}
        </div>
      </Section>

      {/* HOY — agenda cronológica, reemplaza el calendario mensual como vista principal */}
      <Section id="hoy" style={{ background: "#fff" }}>
        <Eyebrow>Agenda</Eyebrow>
        <SectionTitle>Hoy, domingo 14 de julio</SectionTitle>

        <div style={{ marginBottom: 28 }}>
          {AGENDA.hoy.map((e, i) => (
            <AgendaRow key={i} {...e} />
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Mañana
        </div>
        <div style={{ marginBottom: 28 }}>
          {AGENDA.manana.map((e, i) => (
            <AgendaRow key={i} {...e} />
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Próximamente
        </div>
        {AGENDA.proximos.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 13, color: TOKENS.oxblood, fontWeight: 600, minWidth: 100 }}>{e.dia}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{e.titulo}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{e.lugar}</div>
            </div>
          </div>
        ))}

        <button
          style={{
            marginTop: 20, background: "none", border: "none", cursor: "pointer",
            fontSize: 13, color: TOKENS.oxblood, fontWeight: 600, padding: 0,
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          Ver calendario completo <ChevronRight size={14} />
        </button>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
          (vista secundaria — no forma parte de la pantalla principal)
        </p>
      </Section>

      {/* SACRAMENTOS — se mantiene como información + requisitos en el MVP, sin sistema de citas todavía */}
      <Section id="sacramentos">
        <Eyebrow>Vida sacramental</Eyebrow>
        <SectionTitle>Sacramentos y requisitos</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SACRAMENTOS.map((s, i) => {
            const isOpen = openSacramento === i;
            const Icon = s.icon;
            return (
              <div key={s.nombre} style={{ border: `1px solid ${TOKENS.paperDeep}`, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                <button onClick={() => setOpenSacramento(isOpen ? -1 : i)} style={{ width: "100%", background: isOpen ? TOKENS.paper : "#fff", border: "none", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 600, fontSize: 15 }}>
                    <Icon size={18} color={TOKENS.green} />
                    {s.nombre}
                  </span>
                  <ChevronDown size={18} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                </button>
                {isOpen && (
                  <div style={{ padding: "4px 18px 18px 48px" }}>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: "#374151" }}>
                      {s.requisitos.map((r, j) => (<li key={j}>{r}</li>))}
                    </ul>
                    <button
                      style={{
                        marginTop: 10, display: "flex", alignItems: "center", gap: 8,
                        background: TOKENS.whatsapp, color: "#fff", border: "none",
                        borderRadius: 6, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                      }}
                    >
                      <MessageCircle size={15} /> Preguntar por WhatsApp
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 14 }}>
          (Inscripción con fechas y agenda de citas queda para una fase posterior, una vez validado con la parroquia.)
        </p>
      </Section>

      {/* AVISOS — antes "Noticias" */}
      <Section id="avisos" style={{ background: "#fff" }}>
        <Eyebrow>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Bell size={13} /> Comunidad
          </span>
        </Eyebrow>
        <SectionTitle>Avisos parroquiales</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {AVISOS.map((n, i) => (
            <div key={i} style={{ borderBottom: i < AVISOS.length - 1 ? `1px solid ${TOKENS.paperDeep}` : "none", paddingBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TOKENS.oxblood, marginBottom: 4 }}>{n.fecha}</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4, fontFamily: "'Fraunces', serif" }}>{n.titulo}</div>
              <div style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.5 }}>{n.resumen}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACTO — con botón de WhatsApp prominente */}
      <Section id="contacto" style={{ background: TOKENS.ink, color: TOKENS.paper }}>
        <Eyebrow><span style={{ color: TOKENS.gold }}>Visítanos</span></Eyebrow>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(26px, 4vw, 34px)", margin: "0 0 24px 0" }}>Contacto</h2>

        <button
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: TOKENS.whatsapp, color: "#fff", border: "none", borderRadius: 10,
            padding: "16px 20px", fontSize: 16, fontWeight: 600, cursor: "pointer", marginBottom: 24,
            fontFamily: "'Public Sans', sans-serif",
          }}
        >
          <MessageCircle size={20} /> Hablar con la oficina parroquial
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <MapPin size={20} color={TOKENS.gold} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Dirección</div>
              <div style={{ fontSize: 14, opacity: 0.85 }}>Calle Principal 123, Ciudad</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Clock size={20} color={TOKENS.gold} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Oficina parroquial</div>
              <div style={{ fontSize: 14, opacity: 0.85 }}>Lun–Vie, 9 AM–5 PM</div>
            </div>
          </div>
        </div>
      </Section>

      <footer style={{ textAlign: "center", padding: "24px", fontSize: 12, color: "#6b7280" }}>
        Borrador de producto v2 — Parroquia San José (nombre ficticio)
      </footer>

      <style>{`
        @media (max-width: 720px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: block !important; }
          .mobile-nav-panel { display: flex !important; }
        }
      `}</style>
    </div>
  );
}