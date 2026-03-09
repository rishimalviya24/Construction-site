import { useState, useEffect, useRef, useCallback } from "react";

const BASE = "https://contrction-backend.onrender.com";
const API = `${BASE}/api/projects`;
const AUTH_API = `${BASE}/api/auth`;

// ── Tokens ─────────────────────────────────────────────────────
const C = {
  bg: "#0f0f11", card: "#18181b", border: "#27272a", hover: "#1f1f23",
  stone: "#c4956a", stoneDim: "#3d2e1f", stoneText: "#e8c4a0",
  white: "#fafafa", muted: "#71717a", subtle: "#52525b",
  red: "#ef4444", redDim: "#2d1515", green: "#22c55e", greenDim: "#152d15",
  blue: "#3b82f6", blueDim: "#151e2d",
  text: "#e4e4e7", textDim: "#a1a1aa",
};
const ff = "'Inter', -apple-system, sans-serif";
const fd = "'Playfair Display', Georgia, serif";

// ── Helpers ────────────────────────────────────────────────────
const getToken = () => localStorage.getItem("admin_token");
const authH = () => ({ Authorization: `Bearer ${getToken()}` });

// ── Icons ──────────────────────────────────────────────────────
const Ic = {
  logo: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  projects: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  image: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  upload: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  x: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  logout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>,
  external: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  warn: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  spin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
  photo: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  search: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  tag: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
};

const Spinner = () => (
  <span style={{ display: "inline-flex", animation: "spin .7s linear infinite" }}>{Ic.spin}</span>
);

// ── Toast ──────────────────────────────────────────────────────
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  return { toasts, add };
}

function Toasts({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 18px", borderRadius: 12, fontFamily: ff, fontSize: 14, color: C.white, minWidth: 260, maxWidth: 380, backdropFilter: "blur(12px)", border: `1px solid ${t.type === "error" ? "rgba(239,68,68,0.25)" : "rgba(34,197,94,0.25)"}`, background: t.type === "error" ? "rgba(20,5,5,0.95)" : "rgba(5,15,10,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", animation: "slideIn .25s ease" }}>
          <span style={{ color: t.type === "error" ? C.red : C.green, flexShrink: 0, display: "flex" }}>
            {t.type === "error" ? Ic.warn : Ic.check}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ── Login Page ─────────────────────────────────────────────────
function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [showP, setShowP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const res = await fetch(AUTH_API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("admin_token", data.token);
      onLogin(data.username);
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${C.border}`,
    background: C.bg, color: C.text, fontFamily: ff, fontSize: 15, outline: "none",
    boxSizing: "border-box", transition: "border-color .2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ff, padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo area */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: C.stoneDim, border: `1px solid ${C.stone}33`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: C.stone }}>
            {Ic.logo}
          </div>
          <h1 style={{ fontFamily: fd, fontSize: 26, fontWeight: 500, color: C.white, margin: "0 0 6px" }}>Admin Portal</h1>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>Construction Site Management</p>
        </div>

        <div style={{ background: C.card, borderRadius: 18, border: `1px solid ${C.border}`, padding: "32px 28px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Username</label>
              <input value={u} onChange={(e) => setU(e.target.value)} placeholder="admin" style={inp}
                onFocus={(e) => e.target.style.borderColor = C.stone}
                onBlur={(e) => e.target.style.borderColor = C.border} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showP ? "text" : "password"} value={p} onChange={(e) => setP(e.target.value)} placeholder="••••••••" style={{ ...inp, paddingRight: 44 }}
                  onFocus={(e) => e.target.style.borderColor = C.stone}
                  onBlur={(e) => e.target.style.borderColor = C.border} />
                <button type="button" onClick={() => setShowP(!showP)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.muted, cursor: "pointer", display: "flex", padding: 4 }}>
                  {showP ? Ic.eyeOff : Ic.eye}
                </button>
              </div>
            </div>
            {err && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: C.redDim, border: `1px solid ${C.red}33`, color: C.red, fontSize: 13 }}>
                {Ic.warn} {err}
              </div>
            )}
            <button type="submit" disabled={loading} style={{ padding: "13px 0", background: C.stone, color: "#fff", border: "none", borderRadius: 10, fontFamily: ff, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
              {loading ? <><Spinner /> Signing in…</> : "Sign In"}
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.subtle }}>
            Default: <code style={{ color: C.stoneText }}>admin</code> / <code style={{ color: C.stoneText }}>admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Image Drop Zone ────────────────────────────────────────────
function DropZone({ label, multiple, onChange, preview, previews, onRemoveNew, onRemoveExisting, existingUrls }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);

  const processFiles = (files) => {
    const arr = Array.from(files);
    const readers = arr.map((f) => new Promise((res) => {
      const r = new FileReader();
      r.onload = (e) => res({ file: f, preview: e.target.result });
      r.readAsDataURL(f);
    }));
    Promise.all(readers).then(onChange);
  };

  return (
    <div>
      <div
        onClick={() => ref.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); processFiles(e.dataTransfer.files); }}
        style={{ border: `2px dashed ${drag ? C.stone : C.border}`, borderRadius: 12, padding: "24px 20px", textAlign: "center", cursor: "pointer", background: drag ? C.stoneDim : "transparent", transition: "all .2s" }}
      >
        <div style={{ color: drag ? C.stone : C.subtle, marginBottom: 8, display: "flex", justifyContent: "center" }}>{Ic.upload}</div>
        <p style={{ fontSize: 14, color: C.textDim, margin: "0 0 4px" }}>{label}</p>
        <p style={{ fontSize: 12, color: C.subtle, margin: 0 }}>Click or drag · JPG, PNG, WebP, AVIF</p>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple={multiple} style={{ display: "none" }} onChange={(e) => processFiles(e.target.files)} />

      {/* Single preview */}
      {!multiple && (preview || (existingUrls && existingUrls[0])) && (
        <div style={{ marginTop: 12, position: "relative", display: "inline-block" }}>
          <img src={preview || `${BASE}${existingUrls[0]}`} alt="" style={{ width: 140, height: 100, objectFit: "cover", borderRadius: 10, border: `1px solid ${C.border}`, display: "block" }} />
          <button onClick={() => onRemoveNew && onRemoveNew()} style={{ position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,.7)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.x}</button>
        </div>
      )}

      {/* Multiple previews */}
      {multiple && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {existingUrls?.map((url, i) => (
            <div key={"ex" + i} style={{ position: "relative" }}>
              <img src={`${BASE}${url}`} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8, border: `1px solid ${C.border}`, display: "block" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 8, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,.5)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0)"}
              >
                <button onClick={() => onRemoveExisting(url)} style={{ background: C.red, border: "none", color: "#fff", width: 22, height: 22, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.parentNode.style.background = "rgba(0,0,0,.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = 0; }}
                >{Ic.x}</button>
              </div>
              <button onClick={() => onRemoveExisting(url)} style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,.65)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>{Ic.x}</button>
            </div>
          ))}
          {previews?.map((pv, i) => (
            <div key={"nw" + i} style={{ position: "relative" }}>
              <img src={pv} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8, border: `1px solid ${C.stone}55`, display: "block" }} />
              <button onClick={() => onRemoveNew(i)} style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,.65)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>{Ic.x}</button>
              <div style={{ position: "absolute", bottom: 3, left: 3, background: C.stone, borderRadius: 4, padding: "1px 5px", fontSize: 9, color: "#fff", fontWeight: 600 }}>NEW</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Project Form Drawer ────────────────────────────────────────
function ProjectDrawer({ project, onSave, onClose, toast }) {
  const [form, setForm] = useState(() => project ? {
    title: project.title || "", description: project.description || "",
    location: project.location || "", category: project.category || "",
    published: project.published !== false,
    mainFile: null, mainPreview: null,
    existingMain: project.mainImageUrl ? [project.mainImageUrl] : [],
    removeMain: false,
    newFiles: [], newPreviews: [],
    existingGallery: project.imageUrls || [],
    removeGallery: [],
  } : {
    title: "", description: "", location: "", category: "", published: true,
    mainFile: null, mainPreview: null, existingMain: [],
    removeMain: false, newFiles: [], newPreviews: [],
    existingGallery: [], removeGallery: [],
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleMain = ([{ file, preview }]) => {
    set("mainFile", file); set("mainPreview", preview);
    set("existingMain", []); set("removeMain", true);
  };
  const removeMain = () => { set("mainFile", null); set("mainPreview", null); set("existingMain", []); set("removeMain", true); };

  const handleGallery = (results) => {
    setForm((f) => ({
      ...f,
      newFiles: [...f.newFiles, ...results.map((r) => r.file)],
      newPreviews: [...f.newPreviews, ...results.map((r) => r.preview)],
    }));
  };
  const removeNewGallery = (i) => setForm((f) => ({
    ...f, newFiles: f.newFiles.filter((_, idx) => idx !== i),
    newPreviews: f.newPreviews.filter((_, idx) => idx !== i),
  }));
  const removeExistingGallery = (url) => {
    const filename = url.split("/").pop();
    setForm((f) => ({
      ...f, existingGallery: f.existingGallery.filter((u) => u !== url),
      removeGallery: [...f.removeGallery, filename],
    }));
  };

  const submit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast("Title and description are required", "error"); return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("location", form.location);
      fd.append("category", form.category);
      fd.append("published", String(form.published));
      if (form.mainFile) fd.append("mainImage", form.mainFile);
      else if (form.removeMain) fd.append("removeMainImage", "true");
      form.newFiles.forEach((f) => fd.append("images", f));
      form.removeGallery.forEach((fn) => fd.append("removeImages", fn));

      const url = project ? `${API}/${project._id}` : API;
      const res = await fetch(url, { method: project ? "PUT" : "POST", headers: authH(), body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast(project ? "Project updated!" : "Project created!");
      onSave(data);
    } catch (err) { toast(err.message, "error"); }
    finally { setSaving(false); }
  };

  const inp = {
    width: "100%", padding: "11px 14px", borderRadius: 9, border: `1px solid ${C.border}`,
    background: "#0a0a0c", color: C.text, fontFamily: ff, fontSize: 14,
    outline: "none", boxSizing: "border-box", transition: "border-color .2s",
  };
  const lbl = { display: "block", fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.06em" };
  const req = <span style={{ color: C.stone }}>*</span>;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 100, backdropFilter: "blur(4px)" }} />
      {/* Drawer */}
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(540px, 100vw)", background: C.card, zIndex: 101, overflowY: "auto", borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "22px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "sticky", top: 0, background: C.card, zIndex: 10 }}>
          <div>
            <h2 style={{ fontFamily: fd, fontSize: 20, fontWeight: 500, color: C.white, margin: "0 0 3px" }}>
              {project ? "Edit Project" : "New Project"}
            </h2>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>{project ? "Update project details & images" : "Fill in the details below"}</p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 8, background: C.hover, border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.x}</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Title */}
          <div>
            <label style={lbl}>Project Title {req}</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Komplett-Rückbau Bad" style={inp}
              onFocus={(e) => e.target.style.borderColor = C.stone} onBlur={(e) => e.target.style.borderColor = C.border} />
          </div>

          {/* Location + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={lbl}>Location</label>
              <input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Zürich-Höngg" style={inp}
                onFocus={(e) => e.target.style.borderColor = C.stone} onBlur={(e) => e.target.style.borderColor = C.border} />
            </div>
            <div>
              <label style={lbl}>Category</label>
              <input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Rückbau" style={inp}
                onFocus={(e) => e.target.style.borderColor = C.stone} onBlur={(e) => e.target.style.borderColor = C.border} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={lbl}>Description {req}</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the project in detail…" rows={4}
              style={{ ...inp, resize: "vertical", lineHeight: 1.65 }}
              onFocus={(e) => e.target.style.borderColor = C.stone} onBlur={(e) => e.target.style.borderColor = C.border} />
          </div>

          {/* Published toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: C.hover, borderRadius: 10, border: `1px solid ${C.border}` }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: C.text, margin: "0 0 2px" }}>Publish to website</p>
              <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Visible on the public site</p>
            </div>
            <div onClick={() => set("published", !form.published)} style={{ width: 44, height: 24, borderRadius: 12, background: form.published ? C.stone : C.border, cursor: "pointer", position: "relative", transition: "background .25s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: form.published ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,.3)" }} />
            </div>
          </div>

          {/* Main Image */}
          <div>
            <label style={lbl}>Main Image <span style={{ color: C.subtle, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— shown on project card</span></label>
            <DropZone
              label="Upload main image (1 photo)"
              onChange={handleMain}
              preview={form.mainPreview}
              existingUrls={form.existingMain}
              onRemoveNew={removeMain}
            />
          </div>

          {/* Gallery */}
          <div>
            <label style={lbl}>Gallery Images <span style={{ color: C.subtle, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— multiple photos</span></label>
            <DropZone
              label="Upload gallery images"
              multiple
              onChange={handleGallery}
              previews={form.newPreviews}
              existingUrls={form.existingGallery}
              onRemoveNew={removeNewGallery}
              onRemoveExisting={removeExistingGallery}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "18px 28px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 12, flexShrink: 0, position: "sticky", bottom: 0, background: C.card }}>
          <button onClick={submit} disabled={saving} style={{ flex: 1, padding: "12px 0", background: C.stone, color: "#fff", border: "none", borderRadius: 10, fontFamily: ff, fontSize: 15, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.8 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {saving ? <><Spinner /> Saving…</> : (project ? "Update Project" : "Create Project")}
          </button>
          <button onClick={onClose} style={{ padding: "12px 22px", background: "none", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textDim, fontFamily: ff, fontSize: 14, cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </>
  );
}

// ── Delete Confirm ─────────────────────────────────────────────
function DeleteConfirm({ project, onConfirm, onCancel }) {
  return (
    <>
      <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 201, background: C.card, borderRadius: 18, border: `1px solid ${C.border}`, padding: "32px 36px", width: "min(420px, 90vw)", textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.redDim, border: `1px solid ${C.red}33`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: C.red }}>{Ic.warn}</div>
        <h3 style={{ fontFamily: fd, fontSize: 21, fontWeight: 500, color: C.white, marginBottom: 10 }}>Delete Project?</h3>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
          <strong style={{ color: C.text }}>"{project.title}"</strong> and all its images will be permanently removed. This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "12px 0", background: "none", border: `1px solid ${C.border}`, borderRadius: 10, color: C.textDim, fontFamily: ff, fontSize: 14, cursor: "pointer" }}>Keep it</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "12px 0", background: C.red, border: "none", borderRadius: 10, color: "#fff", fontFamily: ff, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </>
  );
}

// ── Project Row ────────────────────────────────────────────────
function ProjectRow({ project, onEdit, onDelete }) {
  const [hov, setHov] = useState(false);
  const imgSrc = project.mainImageUrl ? `${BASE}${project.mainImage}` : null;

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "grid", gridTemplateColumns: "64px 1fr auto", gap: 0, alignItems: "center", borderBottom: `1px solid ${C.border}`, background: hov ? C.hover : "transparent", transition: "background .15s", cursor: "default" }}>
      {/* Thumb */}
      <div style={{ width: 64, height: 56, background: C.hover, display: "flex", alignItems: "center", justifyContent: "center", color: C.subtle, flexShrink: 0, overflow: "hidden" }}>
        {imgSrc ? <img src={imgSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : Ic.image}
      </div>

      {/* Info */}
      <div style={{ padding: "14px 18px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: C.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{project.title}</span>
          {!project.published && <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", background: C.redDim, color: C.red, padding: "2px 8px", borderRadius: 6, flexShrink: 0 }}>Draft</span>}
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 12, color: C.muted, flexWrap: "wrap" }}>
          {project.category && <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Ic.tag} {project.category}</span>}
          {project.location && <span>{project.location}</span>}
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{Ic.photo} {project.images?.length || 0} photos</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6, padding: "0 16px", flexShrink: 0, opacity: hov ? 1 : 0, transition: "opacity .15s" }}>
        <button onClick={() => onEdit(project)} title="Edit"
          style={{ width: 32, height: 32, borderRadius: 8, background: C.blueDim, border: `1px solid ${C.blue}33`, color: C.blue, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {Ic.edit}
        </button>
        <button onClick={() => onDelete(project)} title="Delete"
          style={{ width: 32, height: 32, borderRadius: 8, background: C.redDim, border: `1px solid ${C.red}33`, color: C.red, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {Ic.trash}
        </button>
      </div>
    </div>
  );
}

// ── Stats Card ─────────────────────────────────────────────────
function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>{label}</p>
      <p style={{ fontFamily: fd, fontSize: 32, fontWeight: 500, color: C.white, margin: "0 0 4px" }}>{value}</p>
      <p style={{ fontSize: 12, color: C.subtle, margin: 0 }}>{sub}</p>
    </div>
  );
}

// ── Main Admin App ─────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(null); // null | "create" | project object
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toasts, add: toast } = useToasts();

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap";
    document.head.appendChild(link);
  }, []);

  // Check token on mount — always verify with backend, clear bad tokens
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuthChecked(true);
      return;
    }
    fetch(AUTH_API + "/verify", {
      method: "GET",
      headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
    })
      .then((r) => {
        if (!r.ok) {
          // Server rejected token — force logout
          localStorage.removeItem("admin_token");
          setAuthChecked(true);
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d && d.valid) {
          setAuthed(true);
          setUsername(d.user?.username || "Admin");
        } else {
          localStorage.removeItem("admin_token");
        }
        setAuthChecked(true);
      })
      .catch(() => {
        // Network error — clear token and show login
        localStorage.removeItem("admin_token");
        setAuthChecked(true);
      });
  }, []);

  useEffect(() => {
    if (authed) fetchProjects();
  }, [authed]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/all`, { headers: authH() });
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch { toast("Could not load projects. Is the backend running?", "error"); }
    finally { setLoading(false); }
  };

  const handleLogin = (uname) => { setAuthed(true); setUsername(uname); };
  const handleLogout = () => { localStorage.removeItem("admin_token"); setAuthed(false); setProjects([]); };

  const handleSave = (saved) => {
    setProjects((prev) =>
      drawer && typeof drawer === "object" && drawer._id
        ? prev.map((p) => (p._id === saved._id ? saved : p))
        : [saved, ...prev]
    );
    setDrawer(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`${API}/${deleting._id}`, { method: "DELETE", headers: authH() });
      if (!res.ok) throw new Error("Delete failed");
      setProjects((p) => p.filter((x) => x._id !== deleting._id));
      toast("Project deleted");
    } catch { toast("Could not delete", "error"); }
    finally { setDeleting(null); }
  };

  const filtered = projects.filter((p) =>
    search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase())
  );
  const published = projects.filter((p) => p.published).length;
  const totalPhotos = projects.reduce((a, p) => a + (p.images?.length || 0) + (p.mainImage ? 1 : 0), 0);

  if (!authChecked) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontFamily: ff }}>
      <Spinner />
    </div>
  );

  if (!authed) return <Login onLogin={handleLogin} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: ff, color: C.text }}>
      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 220 : 60, background: C.card, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "width .25s ease", flexShrink: 0, overflow: "hidden" }}>
        {/* Logo */}
        <div style={{ height: 60, display: "flex", alignItems: "center", gap: 12, padding: sidebarOpen ? "0 18px" : "0 18px", borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: C.stoneDim, display: "flex", alignItems: "center", justifyContent: "center", color: C.stone, flexShrink: 0 }}>{Ic.logo}</div>
          {sidebarOpen && <span style={{ fontFamily: fd, fontSize: 16, fontWeight: 500, color: C.white, whiteSpace: "nowrap" }}>Construction</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 8px" }}>
          <NavItem icon={Ic.projects} label="Projects" active sidebarOpen={sidebarOpen} />
          <NavItem icon={Ic.plus} label="Add Project" sidebarOpen={sidebarOpen} onClick={() => setDrawer("create")} />
          <div style={{ margin: "8px 8px", height: 1, background: C.border }} />
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <NavItem icon={Ic.external} label="View Site" sidebarOpen={sidebarOpen} />
          </a>
        </nav>

        {/* Toggle + User */}
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "12px 8px" }}>
          <NavItem icon={Ic.menu} label="Collapse" sidebarOpen={sidebarOpen} onClick={() => setSidebarOpen((o) => !o)} />
          {sidebarOpen && (
            <div style={{ padding: "10px 12px", marginTop: 4 }}>
              <p style={{ fontSize: 12, color: C.muted, margin: "0 0 2px" }}>Signed in as</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.stoneText, margin: 0 }}>{username}</p>
            </div>
          )}
          <NavItem icon={Ic.logout} label="Logout" sidebarOpen={sidebarOpen} onClick={handleLogout} danger />
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{ height: 60, background: C.card, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div>
            <h1 style={{ fontFamily: fd, fontSize: 19, fontWeight: 500, color: C.white, margin: 0 }}>Projects</h1>
            <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{projects.length} total · {published} published</p>
          </div>
          <button onClick={() => setDrawer("create")} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: C.stone, color: "#fff", border: "none", borderRadius: 9, fontFamily: ff, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            {Ic.plus} New Project
          </button>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
            <StatCard label="Total Projects" value={projects.length} sub="All time" />
            <StatCard label="Published" value={published} sub="Visible on site" />
            <StatCard label="Drafts" value={projects.length - published} sub="Hidden from site" />
            <StatCard label="Total Photos" value={totalPhotos} sub="Across all projects" />
          </div>

          {/* Search + Table */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            {/* Search bar */}
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.subtle, display: "flex" }}>{Ic.search}</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects…"
                style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: C.text, fontFamily: ff }} />
              {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: C.subtle, cursor: "pointer", display: "flex" }}>{Ic.x}</button>}
            </div>

            {/* Table */}
            {loading ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: C.muted, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <Spinner /> <span style={{ fontSize: 14 }}>Loading projects…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: "60px 24px", textAlign: "center" }}>
                <div style={{ color: C.subtle, marginBottom: 12, display: "flex", justifyContent: "center" }}>{Ic.image}</div>
                <p style={{ fontSize: 16, fontWeight: 500, color: C.textDim, margin: "0 0 6px" }}>{search ? "No results found" : "No projects yet"}</p>
                <p style={{ fontSize: 13, color: C.subtle, margin: "0 0 20px" }}>{search ? "Try a different search term" : "Create your first project to get started"}</p>
                {!search && <button onClick={() => setDrawer("create")} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", background: C.stone, color: "#fff", border: "none", borderRadius: 9, fontFamily: ff, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{Ic.plus} Create Project</button>}
              </div>
            ) : (
              <div>
                {filtered.map((p) => (
                  <ProjectRow key={p._id} project={p} onEdit={(proj) => setDrawer(proj)} onDelete={setDeleting} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Drawer */}
      {drawer !== null && (
        <ProjectDrawer
          project={drawer === "create" ? null : drawer}
          onSave={handleSave}
          onClose={() => setDrawer(null)}
          toast={toast}
        />
      )}

      {/* Delete modal */}
      {deleting && <DeleteConfirm project={deleting} onConfirm={handleDeleteConfirm} onCancel={() => setDeleting(null)} />}

      <Toasts toasts={toasts} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>
    </div>
  );
}

function NavItem({ icon, label, active, sidebarOpen, onClick, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: onClick ? "pointer" : "default", background: active ? C.stoneDim : hov && onClick ? C.hover : "transparent", color: danger ? (hov ? C.red : C.subtle) : active ? C.stoneText : hov ? C.text : C.muted, transition: "all .15s", overflow: "hidden", whiteSpace: "nowrap", marginBottom: 2 }}>
      <span style={{ display: "flex", flexShrink: 0 }}>{icon}</span>
      {sidebarOpen && <span style={{ fontSize: 14, fontWeight: active ? 600 : 400 }}>{label}</span>}
    </div>
  );
}
