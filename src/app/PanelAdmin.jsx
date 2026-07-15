"use client";
import React, { useState } from "react";
import {
  Church, Calendar, Clock, Bell, LogOut, Plus, Pencil, Trash2,
  Save, X, ChevronLeft, LayoutGrid,
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap');`;

// Panel de admin: paleta deliberadamente distinta y más neutra que la web pública —
// aquí el objetivo es "no me puedo equivocar", no "identidad de marca".
const T = {
  bg: "#f4f5f7",
  panel: "#ffffff",
  border: "#e2e4e9",
  ink: "#1f2430",
  muted: "#6b7280",
  accent: "#2b5f4c",
  accentSoft: "#e6efe9",
  danger: "#b3413a",
};

const MENU = [
  { id: "eventos", label: "Eventos", icon: Calendar },
  { id: "horarios", label: "Horarios de misa", icon: Clock },
  { id: "avisos", label: "Avisos", icon: Bell },
];

const EVENTOS_INICIALES = [
  { id: 1, titulo: "Novena a la Virgen del Carmen", fecha: "18 jul", hora: "19:00", lugar: "Templo principal" },
  { id: 2, titulo: "Bautizos comunitarios", fecha: "20 jul", hora: "11:00", lugar: "Capilla" },
];

const HORARIOS_INICIALES = [
  { id: 1, dia: "Domingo", hora: "8:00" },
  { id: 2, dia: "Domingo", hora: "10:00" },
  { id: 3, dia: "Domingo", hora: "12:00" },
  { id: 4, dia: "Domingo", hora: "18:00" },
];

const AVISOS_INICIALES = [
  { id: 1, titulo: "Horario especial de confesiones en julio", texto: "Confesiones extra los jueves de 5 a 7 PM durante todo el mes." },
];

function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 15,
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  fontFamily: "'Public Sans', sans-serif",
  color: T.ink,
  boxSizing: "border-box",
};

function PrimaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
        background: T.accent, color: "#fff", border: "none", borderRadius: 8,
        padding: "13px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer",
        fontFamily: "'Public Sans', sans-serif", ...style,
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, danger, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6, justifyContent: "center",
        background: "transparent", color: danger ? T.danger : T.muted,
        border: `1px solid ${danger ? "#f0d3d1" : T.border}`, borderRadius: 8,
        padding: "8px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer",
        fontFamily: "'Public Sans', sans-serif", ...style,
      }}
    >
      {children}
    </button>
  );
}

function PanelHeader({ title, onNew, newLabel }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: T.ink, margin: 0 }}>{title}</h1>
      {onNew && (
        <PrimaryButton onClick={onNew}>
          <Plus size={18} /> {newLabel}
        </PrimaryButton>
      )}
    </div>
  );
}

function EventosView() {
  const [eventos, setEventos] = useState(EVENTOS_INICIALES);
  const [editando, setEditando] = useState(null); // null | "nuevo" | evento
  const [form, setForm] = useState({ titulo: "", fecha: "", hora: "", lugar: "" });

  const abrirNuevo = () => { setForm({ titulo: "", fecha: "", hora: "", lugar: "" }); setEditando("nuevo"); };
  const abrirEditar = (ev) => { setForm(ev); setEditando(ev.id); };

  const guardar = () => {
    if (editando === "nuevo") {
      setEventos([...eventos, { ...form, id: Date.now() }]);
    } else {
      setEventos(eventos.map((e) => (e.id === editando ? { ...form, id: editando } : e)));
    }
    setEditando(null);
  };

  const borrar = (id) => setEventos(eventos.filter((e) => e.id !== id));

  if (editando !== null) {
    return (
      <div>
        <button onClick={() => setEditando(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 18, padding: 0 }}>
          <ChevronLeft size={16} /> Volver a eventos
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T.ink, margin: "0 0 24px" }}>
          {editando === "nuevo" ? "Nuevo evento" : "Editar evento"}
        </h1>
        <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, maxWidth: 480 }}>
          <Field label="Título del evento">
            <input style={inputStyle} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Ej. Novena a la Virgen del Carmen" />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Fecha">
              <input style={inputStyle} value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} placeholder="18 jul" />
            </Field>
            <Field label="Hora">
              <input style={inputStyle} value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} placeholder="19:00" />
            </Field>
          </div>
          <Field label="Lugar">
            <input style={inputStyle} value={form.lugar} onChange={(e) => setForm({ ...form, lugar: e.target.value })} placeholder="Templo principal" />
          </Field>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <PrimaryButton onClick={guardar}><Save size={17} /> Guardar y publicar</PrimaryButton>
            <GhostButton onClick={() => setEditando(null)}><X size={15} /> Cancelar</GhostButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PanelHeader title="Eventos" onNew={abrirNuevo} newLabel="Nuevo evento" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {eventos.map((e) => (
          <div key={e.id} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: T.ink }}>{e.titulo}</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 2 }}>{e.fecha} · {e.hora} · {e.lugar}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <GhostButton onClick={() => abrirEditar(e)}><Pencil size={14} /> Editar</GhostButton>
              <GhostButton danger onClick={() => borrar(e.id)}><Trash2 size={14} /> Eliminar</GhostButton>
            </div>
          </div>
        ))}
        {eventos.length === 0 && (
          <div style={{ textAlign: "center", color: T.muted, fontSize: 14, padding: "40px 0" }}>
            Todavía no hay eventos. Crea el primero con el botón de arriba.
          </div>
        )}
      </div>
    </div>
  );
}

function HorariosView() {
  const [horarios, setHorarios] = useState(HORARIOS_INICIALES);
  const [nuevaHora, setNuevaHora] = useState("");
  const [nuevoDia, setNuevoDia] = useState("Domingo");

  const agregar = () => {
    if (!nuevaHora) return;
    setHorarios([...horarios, { id: Date.now(), dia: nuevoDia, hora: nuevaHora }]);
    setNuevaHora("");
  };
  const borrar = (id) => setHorarios(horarios.filter((h) => h.id !== id));

  return (
    <div>
      <PanelHeader title="Horarios de misa" />
      <p style={{ fontSize: 13, color: T.muted, marginTop: -12, marginBottom: 20 }}>
        Esto es lo que se muestra en el letrero de la página principal.
      </p>

      <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, maxWidth: 520 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {horarios.map((h) => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: T.accentSoft, borderRadius: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{h.dia} · {h.hora}</span>
              <button onClick={() => borrar(h.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted }} aria-label="Eliminar horario">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "end" }}>
          <Field label="Día">
            <select style={inputStyle} value={nuevoDia} onChange={(e) => setNuevoDia(e.target.value)}>
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="Hora">
            <input style={inputStyle} type="time" value={nuevaHora} onChange={(e) => setNuevaHora(e.target.value)} />
          </Field>
          <PrimaryButton onClick={agregar} style={{ marginBottom: 16, padding: "12px 16px" }}>
            <Plus size={17} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function AvisosView() {
  const [avisos, setAvisos] = useState(AVISOS_INICIALES);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ titulo: "", texto: "" });

  const abrirNuevo = () => { setForm({ titulo: "", texto: "" }); setEditando("nuevo"); };
  const abrirEditar = (a) => { setForm(a); setEditando(a.id); };
  const guardar = () => {
    if (editando === "nuevo") setAvisos([...avisos, { ...form, id: Date.now() }]);
    else setAvisos(avisos.map((a) => (a.id === editando ? { ...form, id: editando } : a)));
    setEditando(null);
  };
  const borrar = (id) => setAvisos(avisos.filter((a) => a.id !== id));

  if (editando !== null) {
    return (
      <div>
        <button onClick={() => setEditando(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 18, padding: 0 }}>
          <ChevronLeft size={16} /> Volver a avisos
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: T.ink, margin: "0 0 24px" }}>
          {editando === "nuevo" ? "Nuevo aviso" : "Editar aviso"}
        </h1>
        <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, maxWidth: 520 }}>
          <Field label="Título">
            <input style={inputStyle} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Ej. Cambio de horario de oficina" />
          </Field>
          <Field label="Contenido">
            <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })} placeholder="Escribe el aviso como lo dirías por WhatsApp" />
          </Field>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <PrimaryButton onClick={guardar}><Save size={17} /> Guardar y publicar</PrimaryButton>
            <GhostButton onClick={() => setEditando(null)}><X size={15} /> Cancelar</GhostButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PanelHeader title="Avisos" onNew={abrirNuevo} newLabel="Nuevo aviso" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {avisos.map((a) => (
          <div key={a.id} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: T.ink }}>{a.titulo}</div>
                <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>{a.texto}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <GhostButton onClick={() => abrirEditar(a)}><Pencil size={14} /> Editar</GhostButton>
                <GhostButton danger onClick={() => borrar(a.id)}><Trash2 size={14} /> Eliminar</GhostButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PanelAdminBorrador() {
  const [seccion, setSeccion] = useState("eventos");

  return (
    <div style={{ display: "flex", minHeight: "100%", background: T.bg, fontFamily: "'Public Sans', sans-serif", color: T.ink }}>
      <style>{FONT_IMPORT}</style>

      {/* Sidebar */}
      <aside style={{ width: 220, background: T.panel, borderRight: `1px solid ${T.border}`, padding: "20px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px 24px", fontWeight: 700, fontSize: 15 }}>
          <Church size={18} color={T.accent} /> Panel · San José
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {MENU.map((m) => {
            const activo = seccion === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSeccion(m.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                  padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: activo ? T.accentSoft : "transparent",
                  color: activo ? T.accent : T.muted,
                  fontWeight: activo ? 700 : 500, fontSize: 14,
                  fontFamily: "'Public Sans', sans-serif",
                }}
              >
                <m.icon size={17} /> {m.label}
              </button>
            );
          })}
        </nav>
        <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 20, paddingTop: 14 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "none", border: "none", color: T.muted, fontSize: 14, cursor: "pointer", width: "100%", textAlign: "left", fontFamily: "'Public Sans', sans-serif" }}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main style={{ flex: 1, padding: "28px 32px", maxWidth: 760 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.muted, marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
          <LayoutGrid size={13} /> Borrador — los cambios no se guardan de verdad todavía
        </div>
        {seccion === "eventos" && <EventosView />}
        {seccion === "horarios" && <HorariosView />}
        {seccion === "avisos" && <AvisosView />}
      </main>
    </div>
  );
}