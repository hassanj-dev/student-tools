// import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
// import SEO from "../components/SEO";

// const STORAGE_KEY = "sparkdesk_sticky_notes";

// const NOTE_COLORS = [
//   { id: "violet", dot: "#8b5cf6", light: "rgba(109,40,217,0.09)", border: "rgba(109,40,217,0.22)", label: "Violet" },
//   { id: "sky", dot: "#38bdf8", light: "rgba(14,165,233,0.09)", border: "rgba(14,165,233,0.22)", label: "Sky" },
//   { id: "rose", dot: "#fb7185", light: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.22)", label: "Rose" },
//   { id: "amber", dot: "#fbbf24", light: "rgba(245,158,11,0.09)", border: "rgba(245,158,11,0.22)", label: "Amber" },
//   { id: "green", dot: "#34d399", light: "rgba(16,185,129,0.09)", border: "rgba(16,185,129,0.22)", label: "Emerald" },
// ];

// function ts() {
//   return new Date().toLocaleString("en-US", {
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function load() {
//   try {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//   } catch {
//     return [];
//   }
// }

// function save(notes) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
// }

// const NoteCard = memo(function NoteCard({ note, onEdit, onDelete }) {
//   const [hovered, setHovered] = useState(false);
//   const color = NOTE_COLORS.find((c) => c.id === note.colorId) || NOTE_COLORS[0];

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         padding: "18px 16px 14px",
//         borderRadius: "var(--radius-lg)",
//         border: `1.5px solid ${hovered ? color.dot + "55" : color.border}`,
//         background: color.light,
//         display: "flex",
//         flexDirection: "column",
//         gap: 0,
//         transition: "all var(--duration) var(--ease-spring)",
//         transform: hovered ? "translateY(-5px)" : "none",
//         boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-xs)",
//         position: "relative",
//         overflow: "hidden",
//         cursor: "default",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: 3,
//           background: `linear-gradient(90deg, ${color.dot}, ${color.dot}88)`,
//           borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
//         }}
//       />

//       <h3
//         style={{
//           fontFamily: "var(--font-display)",
//           fontSize: "0.95rem",
//           fontWeight: 700,
//           color: "var(--text)",
//           margin: "6px 0 8px",
//           paddingRight: 16,
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//         }}
//       >
//         {note.title || "Untitled"}
//       </h3>

//       <p
//         style={{
//           fontSize: "0.85rem",
//           color: "var(--text-2)",
//           lineHeight: 1.6,
//           margin: "0 0 14px",
//           flex: 1,
//           display: "-webkit-box",
//           WebkitLineClamp: 6,
//           WebkitBoxOrient: "vertical",
//           overflow: "hidden",
//           whiteSpace: "pre-wrap",
//           wordBreak: "break-word",
//           minHeight: 52,
//         }}
//       >
//         {note.content || <em style={{ opacity: 0.45 }}>No content</em>}
//       </p>

//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderTop: "1px solid var(--border)",
//           paddingTop: 10,
//           marginTop: "auto",
//         }}
//       >
//         <span style={{ fontSize: "0.74rem", color: "var(--muted)", fontWeight: 500 }}>
//           {note.updatedAt}
//         </span>
//         <div style={{ display: "flex", gap: 5 }}>
//           <button
//             onClick={() => onEdit(note)}
//             className="chip"
//             style={{
//               padding: "5px 10px",
//               fontSize: "0.76rem",
//               borderRadius: "var(--radius-sm)",
//               lineHeight: 1,
//             }}
//           >
//             ✏️ Edit
//           </button>
//           <button
//             onClick={() => onDelete(note.id)}
//             className="chip danger"
//             style={{
//               padding: "5px 10px",
//               fontSize: "0.76rem",
//               borderRadius: "var(--radius-sm)",
//               lineHeight: 1,
//             }}
//           >
//             🗑
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// function NoteModal({ note, onSave, onClose }) {
//   const [title, setTitle] = useState(note?.title ?? "");
//   const [content, setContent] = useState(note?.content ?? "");
//   const [colorId, setColorId] = useState(note?.colorId ?? "violet");
//   const titleRef = useRef();

//   useEffect(() => {
//     titleRef.current?.focus();
//   }, []);

//   const handleSave = () => {
//     if (!title.trim() && !content.trim()) return;
//     onSave({ title: title.trim(), content, colorId });
//   };

//   return (
//     <div
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.55)",
//         backdropFilter: "blur(6px)",
//         WebkitBackdropFilter: "blur(6px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//         padding: 16,
//       }}
//     >
//       <div
//         className="card glass"
//         style={{
//           width: "100%",
//           maxWidth: 480,
//           padding: "30px 28px 24px",
//           animation: "pageEnter 0.25s var(--ease-smooth) both",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: 22,
//           }}
//         >
//           <h2
//             style={{
//               fontFamily: "var(--font-display)",
//               fontSize: "1.15rem",
//               fontWeight: 800,
//               margin: 0,
//             }}
//           >
//             {note?.id ? "✏️ Edit Note" : "📝 New Note"}
//           </h2>
//           <button
//             onClick={onClose}
//             style={{
//               border: "none",
//               background: "transparent",
//               fontSize: "1.2rem",
//               cursor: "pointer",
//               color: "var(--muted)",
//               lineHeight: 1,
//             }}
//           >
//             ✕
//           </button>
//         </div>

//         <input
//           ref={titleRef}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Note title…"
//           maxLength={80}
//           style={{ marginBottom: 14, fontWeight: 700, fontSize: "1rem" }}
//         />

//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write your note here…"
//           rows={6}
//           style={{ marginBottom: 18, resize: "vertical", lineHeight: 1.65 }}
//         />

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//             marginBottom: 22,
//             flexWrap: "wrap",
//           }}
//         >
//           <span
//             style={{
//               fontSize: "0.75rem",
//               fontWeight: 700,
//               textTransform: "uppercase",
//               letterSpacing: "0.08em",
//               color: "var(--muted)",
//             }}
//           >
//             Colour tag:
//           </span>

//           {NOTE_COLORS.map((c) => (
//             <button
//               key={c.id}
//               title={c.label}
//               onClick={() => setColorId(c.id)}
//               style={{
//                 width: 22,
//                 height: 22,
//                 borderRadius: "50%",
//                 border: colorId === c.id ? `3px solid var(--text)` : "3px solid transparent",
//                 background: c.dot,
//                 cursor: "pointer",
//                 transform: colorId === c.id ? "scale(1.3)" : "scale(1)",
//                 transition: "all var(--duration) var(--ease-spring)",
//                 outline: "none",
//                 padding: 0,
//               }}
//             />
//           ))}
//         </div>

//         <div className="btn-row">
//           <button
//             onClick={onClose}
//             className="chip"
//             style={{ padding: "11px 20px", flex: 1 }}
//           >
//             Cancel
//           </button>
//           <button onClick={handleSave} className="btn" style={{ flex: 2 }}>
//             {note?.id ? "Save Changes" : "✦ Add Note"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function NotesApp() {
//   const [notes, setNotes] = useState(load);
//   const [modal, setModal] = useState(null);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     const t = setTimeout(() => save(notes), 250);
//     return () => clearTimeout(t);
//   }, [notes]);

//   const addOrUpdate = useCallback(
//     ({ title, content, colorId }) => {
//       if (modal?.note?.id) {
//         setNotes((prev) =>
//           prev.map((n) =>
//             n.id === modal.note.id
//               ? { ...n, title, content, colorId, updatedAt: ts() }
//               : n
//           )
//         );
//       } else {
//         const now = ts();
//         setNotes((prev) => [
//           {
//             id: Date.now(),
//             title,
//             content,
//             colorId,
//             createdAt: now,
//             updatedAt: now,
//           },
//           ...prev,
//         ]);
//       }
//       setModal(null);
//     },
//     [modal]
//   );

//   const deleteNote = useCallback((id) => {
//     setNotes((prev) => prev.filter((n) => n.id !== id));
//   }, []);

//   const openNew = useCallback(() => setModal({ note: null }), []);
//   const openEdit = useCallback((note) => setModal({ note }), []);

//   const filtered = useMemo(() => {
//     const q = search.toLowerCase().trim();

//     return notes.filter((n) => {
//       const matchSearch =
//         !q ||
//         n.title?.toLowerCase().includes(q) ||
//         n.content?.toLowerCase().includes(q);
//       const matchFilter = filter === "all" || n.colorId === filter;
//       return matchSearch && matchFilter;
//     });
//   }, [notes, search, filter]);

//   const colorCounts = useMemo(() => {
//     return NOTE_COLORS.map((c) => ({
//       ...c,
//       count: notes.filter((n) => n.colorId === c.id).length,
//     }));
//   }, [notes]);

//   return (
//     <div className="page" style={{ margin: "28px auto" }}>
//       <SEO
//         title="Free Notes App Online | SparkDesk"
//         description="Use SparkDesk free notes app with auto-save, color tags and fast performance. Create and manage notes easily in your browser."
//         url="https://www.sparkdesk.online/notesapp"
//       />

//       {modal && (
//         <NoteModal
//           note={modal.note}
//           onSave={addOrUpdate}
//           onClose={() => setModal(null)}
//         />
//       )}

//       <div
//         style={{
//           display: "flex",
//           alignItems: "flex-start",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 16,
//           marginBottom: 20,
//         }}
//       >
//         <div>
//           <div className="pill">📝 Student Tools</div>
//           <h1
//             style={{
//               fontFamily: "var(--font-display)",
//               fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
//               fontWeight: 800,
//               letterSpacing: "-0.03em",
//               margin: "10px 0 6px",
//               background: "linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//               lineHeight: 1.1,
//             }}
//           >
//             Sticky Notes
//           </h1>
//           <p style={{ color: "var(--muted)", fontSize: "0.92rem", margin: 0 }}>
//             {notes.length} note{notes.length !== 1 ? "s" : ""} saved · auto-synced to your browser
//           </p>
//         </div>

//         <button className="btn" onClick={openNew} style={{ flexShrink: 0, marginTop: 4 }}>
//           + New Note
//         </button>
//       </div>

//       <div
//         className="card glass"
//         style={{
//           padding: "14px 18px",
//           marginBottom: 18,
//           display: "flex",
//           alignItems: "center",
//           gap: 14,
//           flexWrap: "wrap",
//         }}
//       >
//         <div style={{ flex: "1 1 200px", position: "relative", minWidth: 160 }}>
//           <span
//             style={{
//               position: "absolute",
//               left: 14,
//               top: "50%",
//               transform: "translateY(-50%)",
//               color: "var(--muted)",
//               fontSize: "0.95rem",
//               pointerEvents: "none",
//             }}
//           >
//             🔍
//           </span>
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search notes…"
//             style={{ paddingLeft: 38, margin: 0 }}
//           />
//         </div>

//         <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
//           <button
//             onClick={() => setFilter("all")}
//             className="chip"
//             style={{
//               padding: "7px 14px",
//               fontSize: "0.8rem",
//               background: filter === "all" ? "var(--grad-primary)" : undefined,
//               color: filter === "all" ? "#fff" : undefined,
//               border: filter === "all" ? "none" : undefined,
//               boxShadow: filter === "all" ? "var(--shadow-glow)" : undefined,
//             }}
//           >
//             All
//           </button>

//           {NOTE_COLORS.map((c) => (
//             <button
//               key={c.id}
//               onClick={() => setFilter(filter === c.id ? "all" : c.id)}
//               title={c.label}
//               style={{
//                 width: 26,
//                 height: 26,
//                 borderRadius: "50%",
//                 border: filter === c.id ? `3px solid var(--text)` : "2px solid transparent",
//                 background: c.dot,
//                 cursor: "pointer",
//                 transform: filter === c.id ? "scale(1.2)" : "scale(1)",
//                 transition: "all var(--duration) var(--ease-spring)",
//                 outline: "none",
//                 padding: 0,
//                 boxShadow: filter === c.id ? `0 2px 10px ${c.dot}66` : "none",
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {filtered.length === 0 ? (
//         <div className="empty-state">
//           <div className="empty-icon">{search ? "🔍" : "📋"}</div>
//           <h3
//             style={{
//               fontFamily: "var(--font-display)",
//               fontWeight: 700,
//               margin: "0 0 8px",
//             }}
//           >
//             {search ? "No notes found" : "No notes yet"}
//           </h3>
//           <p style={{ color: "var(--muted)", fontSize: "0.88rem", margin: "0 0 18px" }}>
//             {search ? `Nothing matches "${search}"` : "Create your first note to get started!"}
//           </p>
//           {!search && (
//             <button className="btn" onClick={openNew}>
//               + Create First Note
//             </button>
//           )}
//         </div>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
//             gap: 16,
//           }}
//         >
//           {filtered.map((note) => (
//             <NoteCard
//               key={note.id}
//               note={note}
//               onEdit={openEdit}
//               onDelete={deleteNote}
//             />
//           ))}
//         </div>
//       )}

//       {notes.length > 0 && (
//         <div
//           style={{
//             marginTop: 28,
//             display: "flex",
//             gap: 12,
//             flexWrap: "wrap",
//           }}
//         >
//           {colorCounts.map((c) => {
//             if (!c.count) return null;

//             return (
//               <div
//                 key={c.id}
//                 style={{
//                   padding: "10px 16px",
//                   borderRadius: "var(--radius)",
//                   border: `1.5px solid ${c.border}`,
//                   background: c.light,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   fontSize: "0.82rem",
//                   fontWeight: 600,
//                   color: "var(--text-2)",
//                   cursor: "pointer",
//                   transition: "all var(--duration) var(--ease-spring)",
//                 }}
//                 onClick={() => setFilter(filter === c.id ? "all" : c.id)}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
//               >
//                 <span
//                   style={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: "50%",
//                     background: c.dot,
//                     flexShrink: 0,
//                   }}
//                 />
//                 {c.label}: <strong>{c.count}</strong>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }