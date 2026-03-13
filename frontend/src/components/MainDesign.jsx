import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════
   ✏️  EDITABLE CONSTANTS — change here only
   ══════════════════════════════════════════ */
const PH       = "+41 XX XXX XX XX";
const WA_LINK  = "https://wa.me/41XXXXXXXXX?text=Guten%20Tag";
const REGION   = "Region Zürich"; // ← Yellow badge text (Image 1)

// About teaser section (Image 2) — edit freely
const ABOUT_HEADING_LINE1 = "Klein, eingespielt";
const ABOUT_HEADING_LINE2 = "und direkt vor Ort.";
const ABOUT_P1 = "[Firmenname] ist ein junges Unternehmen aus der Region Zürich. Unser Team ist klein, dafür eingespielt.";
const ABOUT_P2 = "Wir arbeiten mit Erfahrung, Handwerk und den richtigen Geräten. Das macht uns flexibel.";

/* ══════════════════════════════════════════
   🖼️  SERVICE PAGE IMAGES (Image 3)
   Replace Unsplash URLs with your own images
   ══════════════════════════════════════════ */
const SVC_IMAGES = {
  rueckbau:  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  recycling: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  entsorgung:"https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&q=80",
  transport: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80",
  sanitaer:  "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80",
};
// About page team photo
const ABOUT_TEAM_IMG = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80";
// Home page about-teaser photo
const HOME_ABOUT_IMG = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80";
/* ══════════════════════════════════════════ */

const C = {
  black: "#1d1d1f", dark: "#424245", gray: "#6e6e73", muted: "#a1a1a6",
  line: "#e8e8ed", bg: "#f5f5f7", white: "#fff",
  stone: "#A78B71", stonePale: "#F7F3EF", stoneLight: "#EDE6DD", wa: "#25D366",
};

const ff  = "'DM Sans', -apple-system, sans-serif";
const fd  = "'Playfair Display', Georgia, serif";
const fh  = "'Montserrat', -apple-system, sans-serif"; // ← Hero H1 font (Image 1 green)

const I = {
  hammer:   (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15L22 10.64"/><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>,
  recycle:  (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596L4.875 7.97a1.83 1.83 0 0 1 .009-1.784A1.785 1.785 0 0 1 6.44 5.3h5.404"/><path d="m7.344 10.152-1.382 3.863 3.864-1.382"/><path d="m16.668 12.847 3.42-5.63a1.83 1.83 0 0 0 0-1.775 1.784 1.784 0 0 0-1.557-.89h-2.468"/><path d="m17.9 8.956 1.383 3.862-3.863-1.382"/></svg>,
  truck:    (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  trash:    (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  wrench:   (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  phone:    (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail:     (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  mapPin:   (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  msg:      (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/></svg>,
  msgFill:  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/></svg>,
  menu:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>,
  x:        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:    (c) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  chevDown: (c) => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevL:    (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevR:    (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="9 6 15 12 9 18"/></svg>,
  arrowR:   (c, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowUR:  (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  shield:   (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  users:    (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  eye:      (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  send:     (c) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  expand:   (c) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
};

const SVC = [
  { id: "rueckbau",  title: "Rückbau",                   sub: "Vom Innenausbau bis zur kompletten Entkernung.",  icon: "hammer",  heroSub: "Vom Innenausbau bis zur kompletten Entkernung",    desc: "Wo Neues entstehen soll, muss zuerst Altes weichen. Wir übernehmen Rückbauten jeder Grösse – vom einzelnen Badezimmer bis zur kompletten Entkernung.", p: ["Zuerst besichtigen, dann planen, dann sauber umsetzen. Wir schützen angrenzende Räume, trennen Materialien beim Rückbau und hinterlassen die Baustelle besenrein.", "Bei Umbauten in bewohnten Gebäuden zählt Rücksicht. Wir arbeiten leise, halten Termine ein und kommunizieren klar."], items: ["Badezimmer-Rückbau", "Küchen-Demontage", "Bodenbeläge entfernen", "Zwischenwände entfernen", "Innenausbau-Entkernung", "Heizungs- & Sanitär-Rückbau"] },
  { id: "recycling", title: "Recycling",                  sub: "Baustoffe zurück in den Kreislauf.",               icon: "recycle", heroSub: "Baustoffe gehören in den Kreislauf, nicht auf die Deponie", desc: "Bei jedem Rückbau fällt Material an. Wir sorgen dafür, dass so viel wie möglich wieder verwendet wird – konsequent getrennt, zugeführt an zertifizierte Partner.", p: ["Weniger Deponiematerial bedeutet tiefere Entsorgungsgebühren. Ökologisch sinnvoll und kostensparend.", "Wir arbeiten mit zertifizierten Recycling-Partnern in der Region Zürich."], items: ["Betonabbruch", "Mischabbruch", "Holz", "Metalle und Eisen", "Kunststoffe & Kabel", "Karton und Papier"] },
  { id: "entsorgung",title: "Entsorgung",                 sub: "Fachgerecht, dokumentiert, gesetzeskonform.",      icon: "trash",   heroSub: "Fachgerecht, transparent und gesetzeskonform",       desc: "Von der Sortierung auf der Baustelle über den Abtransport bis zur richtigen Entsorgungsstelle. Komplett betreut, sauber dokumentiert.", p: ["Ob Bauschutt, Sperrgut, Altholz oder Eternit: Wir wissen, was wohin gehört. Entsorgungsnachweise auf Wunsch.", "Auch Räumungen: Wohnung oder Geschäft leerräumen inkl. Reinigung."], items: ["Bauschutt & Mischabbruch", "Sperrgut & Möbel", "Altholz & Eternit", "Wohnungsräumungen", "Gewerberäumungen", "Entsorgungsnachweise"] },
  { id: "transport", title: "Transport",                  sub: "Material raus, Material rein. Pünktlich.",          icon: "truck",   heroSub: "Material raus, Material rein",                       desc: "Wir transportieren, was auf Ihrer Baustelle anfällt oder angeliefert werden muss. Abgestimmt auf Ihren Bauzeitplan.", p: ["Pünktlich, flexibel, abgestimmt. Wir fahren regelmässig zu Recyclinghöfen und Baustellen in der Region Zürich.", "Kein Auftrag zu klein. Auch eine einzelne Mulde oder Fahrt."], items: ["Bauschuttabtransport", "Materialanlieferung", "Muldenservice", "Maschinentransport", "Gerätetransport", "Sonderfahrten"] },
  { id: "sanitaer",  title: "Einbringung Sanitäranlagen", sub: "300 kg. Schmales Treppenhaus. Kein Problem.",       icon: "wrench",  heroSub: "Wenn 300 Kilo durch das Treppenhaus müssen",         desc: "Neue Boiler, Wärmepumpen oder Warmwasserspeicher wiegen mehrere hundert Kilo – und müssen dorthin, wo es am engsten ist.", p: ["Sicher an den Zielort – ohne Schäden. Mit Erfahrung und dem richtigen Equipment.", "EFH, MFH oder Gewerbebau. Altes Gerät raus? Erledigen wir gleich mit."], items: ["Vorab-Besichtigung & Ausmessung", "Einbringung mit Spezialequipment", "Sicherer Transport an den Zielort", "Demontage & Entsorgung Altgerät"] },
];

const PROJ = [
  { title: "Komplett-Rückbau Bad",      loc: "EFH, Zürich-Höngg",       cat: "Rückbau",   desc: "Demontage Sanitäranlagen, Platten, fachgerechte Entsorgung inkl. Recycling." },
  { title: "Einbringung Speicher 300 kg",loc: "MFH, Winterthur",          cat: "Sanitär",   desc: "300-kg-Warmwasserspeicher ins 2. UG, schmales Treppenhaus. Entsorgung Altgerät." },
  { title: "Wohnungsräumung komplett",   loc: "4.5 Zi, Kloten",           cat: "Entsorgung",desc: "Komplette Räumung inkl. Sperrgut und besenreiner Übergabe." },
  { title: "Küchen-Demontage",           loc: "Gewerbe, Zürich-Oerlikon", cat: "Rückbau",   desc: "Gewerbeküche, Trennung aller Materialien, Abtransport." },
  { title: "Bauschutt-Entsorgung",       loc: "Doppel-EFH, Dietikon",     cat: "Transport", desc: "Mischabbruch bei laufendem Umbau, koordiniert mit Bauzeitplan." },
  { title: "Entkernung Ladenfläche",     loc: "Langstrasse, Zürich",      cat: "Rückbau",   desc: "120 m2 komplett: Wände, Böden, Decken." },
];

const icon = (n, c) => I[n] ? I[n](c) : null;

/* ── Img component — shows real photo if src provided, else placeholder ── */
function Img({ label = "Bild einfügen", h = 320, r = 16, src = "" }) {
  if (src) {
    return (
      <div style={{ width: "100%", height: h, borderRadius: r, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={src}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: h, background: C.bg, borderRadius: r, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: C.muted }}>
        {I.eye(C.muted)}
        <span style={{ fontSize: 13, fontFamily: ff }}>{label}</span>
      </div>
    </div>
  );
}

function W({ children, bg = C.white, py = 120, sx = {} }) {
  return (
    <section style={{ padding: py + "px 24px", background: bg, width: "100%", boxSizing: "border-box", ...sx }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%" }}>{children}</div>
    </section>
  );
}

function Lab({ children }) {
  return <p style={{ fontFamily: ff, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: C.stone, marginBottom: 16 }}>{children}</p>;
}

/* ── Nav ── */
function Nav({ page, go }) {
  const [sc, setSc]   = useState(false);
  const [mob, setMob] = useState(false);
  const [dd, setDd]   = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav    = (p) => { go(p); setMob(false); setDd(false); };
  const isSvc  = SVC.some((s) => s.id === page);
  const lk     = (a) => ({ fontFamily: ff, fontSize: 13, fontWeight: a ? 600 : 400, color: a ? C.black : C.gray, cursor: "pointer" });

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 52, background: sc ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.6)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)", borderBottom: sc ? "0.5px solid rgba(0,0,0,0.08)" : "0.5px solid transparent", transition: "all 0.4s" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span onClick={() => nav("home")} style={{ fontFamily: fd, fontWeight: 600, fontSize: 18, color: C.black, cursor: "pointer", letterSpacing: "-0.02em" }}>[Firmenname]</span>
          <div className="dN" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <span onClick={() => nav("home")}     style={lk(page === "home")}>Home</span>
            <span onClick={() => nav("about")}    style={lk(page === "about")}>Über uns</span>
            <div style={{ position: "relative" }} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
              <span style={{ ...lk(isSvc), display: "flex", alignItems: "center", gap: 3 }}>Leistungen {I.chevDown(isSvc ? C.black : C.gray)}</span>
              {dd && (
                <div style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", width: 240, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(24px)", borderRadius: 14, boxShadow: "0 12px 48px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.04)", padding: 6 }}>
                  {SVC.map((s) => (
                    <div key={s.id} onClick={() => nav(s.id)}
                      style={{ padding: "10px 14px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 11, fontSize: 14, fontFamily: ff, fontWeight: page === s.id ? 600 : 400, color: page === s.id ? C.black : C.dark, background: page === s.id ? C.stonePale : "transparent", transition: "all 0.15s" }}
                      onMouseEnter={(e) => { if (page !== s.id) e.currentTarget.style.background = C.bg; }}
                      onMouseLeave={(e) => { if (page !== s.id) e.currentTarget.style.background = "transparent"; }}>
                      {icon(s.icon, page === s.id ? C.stone : C.muted)}<span style={{ marginLeft: 2 }}>{s.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span onClick={() => nav("projekte")} style={lk(page === "projekte")}>Projekte</span>
            <span onClick={() => nav("kontakt")}  style={lk(page === "kontakt")}>Kontakt</span>
            <button onClick={() => nav("kontakt")} style={{ fontFamily: ff, fontSize: 13, fontWeight: 500, background: C.black, color: C.white, border: "none", borderRadius: 980, padding: "9px 20px", cursor: "pointer" }}>Offerte anfragen</button>
          </div>
          <div className="mN" style={{ display: "none", cursor: "pointer" }} onClick={() => setMob(!mob)}>{I.menu}</div>
        </div>
      </nav>

      {mob && (
        <div style={{ position: "fixed", inset: 0, background: C.white, zIndex: 9999, padding: "0 24px", fontFamily: ff, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontFamily: fd, fontWeight: 600, fontSize: 18 }}>[Firmenname]</span>
            <span style={{ cursor: "pointer" }} onClick={() => setMob(false)}>{I.x}</span>
          </div>
          <div style={{ flex: 1, paddingTop: 20 }}>
            {[["home", "Home"], ["about", "Über uns"]].map(([k, l]) => (
              <div key={k} onClick={() => nav(k)} style={{ padding: "20px 0", fontSize: 26, fontWeight: 600, fontFamily: fd, color: C.black, borderBottom: "0.5px solid " + C.line, cursor: "pointer" }}>{l}</div>
            ))}
            <div style={{ padding: "16px 0 8px", fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: ff }}>Leistungen</div>
            {SVC.map((s) => (
              <div key={s.id} onClick={() => nav(s.id)} style={{ padding: "14px 0", fontSize: 17, fontWeight: 500, fontFamily: ff, color: C.dark, borderBottom: "0.5px solid " + C.line, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                {icon(s.icon, C.stone)} {s.title}
              </div>
            ))}
            {[["projekte", "Projekte"], ["kontakt", "Kontakt"]].map(([k, l]) => (
              <div key={k} onClick={() => nav(k)} style={{ padding: "20px 0", fontSize: 26, fontWeight: 600, fontFamily: fd, color: C.black, borderBottom: "0.5px solid " + C.line, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
          <div style={{ padding: "24px 0 40px", flexShrink: 0 }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: C.wa, color: C.white, borderRadius: 14, padding: 16, fontSize: 16, fontWeight: 600, textDecoration: "none", fontFamily: ff }}>{I.msg("#fff")} WhatsApp</a>
          </div>
        </div>
      )}
      <style>{"@media(max-width:860px){.dN{display:none!important}.mN{display:block!important}}"}</style>
    </>
  );
}

function Fab() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 900, background: C.wa, borderRadius: 28, height: 56, width: 56, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.35)", textDecoration: "none" }}>
      {I.msgFill}
    </a>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ background: C.black, color: C.white, padding: "72px 24px 36px", fontFamily: ff, width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
        <div>
          <div style={{ fontFamily: fd, fontWeight: 600, fontSize: 18, marginBottom: 16 }}>[Firmenname]</div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7 }}>Rückbau, Recycling, Entsorgung, Transport und Einbringung Sanitäranlagen – Region Zürich.</p>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 18 }}>Leistungen</div>
          {SVC.map((s) => <div key={s.id} onClick={() => go(s.id)} style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 11, cursor: "pointer" }}>{s.title}</div>)}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 18 }}>Kontakt</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 2.4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{I.phone("rgba(255,255,255,0.55)")} {PH}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{I.mail("rgba(255,255,255,0.55)")} info@firmenname.ch</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{I.mapPin("rgba(255,255,255,0.55)")} {REGION}</div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1080, margin: "48px auto 0", paddingTop: 20, borderTop: "0.5px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
        <span>2026 [Firmenname]</span>
        <span>Zürich · Winterthur · Limmattal · Glattal</span>
      </div>
    </footer>
  );
}

function CTA({ go }) {
  return (
    <W bg={C.stonePale} py={96}>
      <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ fontFamily: fd, fontSize: "clamp(28px,4vw,40px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 16 }}>Projekt besprechen?</h2>
        <p style={{ fontFamily: ff, fontSize: 16, color: C.gray, lineHeight: 1.7, marginBottom: 36 }}>Kostenlose Besichtigung, faire Fixpreis-Offerte – unverbindlich.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => go("kontakt")} style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, background: C.black, color: C.white, border: "none", borderRadius: 980, padding: "14px 32px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>Offerte anfragen {I.arrowR("#fff")}</button>
          <a href={"tel:" + PH.replace(/\s/g, "")} style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, color: C.black, border: "1.5px solid " + C.line, borderRadius: 980, padding: "13px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, background: C.white }}>{I.phone(C.black)} {PH}</a>
        </div>
      </div>
    </W>
  );
}

/* ── Project Slider with Modal ── */
function ProjectSlider({ go }) {
  const [idx, setIdx]           = useState(0);
  const [modal, setModal]       = useState(null);
  const [visCount, setVisCount] = useState(3);
  const [cardW, setCardW]       = useState(0);
  const maskRef                 = useRef(null);
  const GAP                     = 20;

  useEffect(() => {
    function recalc() {
      if (!maskRef.current) return;
      const vc = window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : 3;
      setVisCount(vc);
      setCardW((maskRef.current.offsetWidth - GAP * (vc - 1)) / vc);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  const maxIdx    = Math.max(0, PROJ.length - visCount);
  const prev      = () => setIdx((i) => Math.max(0, i - 1));
  const next      = () => setIdx((i) => Math.min(maxIdx, i + 1));
  const translateX = idx * (cardW + GAP);

  return (
    <>
      <div style={{ position: "relative" }}>
        {/* mask — overflow hidden clips the track */}
        <div ref={maskRef} style={{ overflow: "hidden", borderRadius: 20, width: "100%" }}>
          <div style={{
            display: "flex",
            gap: GAP,
            transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
            transform: `translateX(-${translateX}px)`,
            willChange: "transform",
          }}>
            {PROJ.map((p, i) => (
              <div key={i}
                style={{ width: cardW || "100%", minWidth: cardW || "100%", flexShrink: 0, borderRadius: 20, overflow: "hidden", background: C.bg, cursor: "pointer" }}
                onClick={() => setModal(p)}>
                <div style={{ position: "relative" }}>
                  <Img label="Projektfoto" h={200} r={0} />
                  <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.expand(C.dark)}</div>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <div style={{ fontFamily: ff, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.stone, marginBottom: 8 }}>{p.cat}</div>
                  <h3 style={{ fontFamily: fd, fontSize: 18, fontWeight: 500, color: C.black, marginBottom: 6, letterSpacing: "-0.01em" }}>{p.title}</h3>
                  <p style={{ fontFamily: ff, fontSize: 13, color: C.gray, margin: 0 }}>{p.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, marginTop: 32, justifyContent: "center", alignItems: "center" }}>
          <button onClick={prev} disabled={idx === 0} style={{ width: 44, height: 44, borderRadius: 22, border: "1.5px solid " + (idx === 0 ? C.line : C.dark), background: "none", cursor: idx === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: idx === 0 ? 0.3 : 1, transition: "opacity 0.2s" }}>{I.chevL(C.dark)}</button>
          <div style={{ display: "flex", gap: 6, margin: "0 12px" }}>
            {PROJ.map((_, i) => <div key={i} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 3, background: i === idx ? C.stone : C.line, transition: "all 0.3s" }} />)}
          </div>
          <button onClick={next} disabled={idx >= maxIdx} style={{ width: 44, height: 44, borderRadius: 22, border: "1.5px solid " + (idx >= maxIdx ? C.line : C.dark), background: "none", cursor: idx >= maxIdx ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: idx >= maxIdx ? 0.3 : 1, transition: "opacity 0.2s" }}>{I.chevR(C.dark)}</button>
        </div>
      </div>

      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.white, borderRadius: 24, maxWidth: 640, width: "100%", overflow: "hidden" }}>
            <Img label="Projektfoto – Vollansicht" h={320} r={0} />
            <div style={{ padding: "32px 36px 36px" }}>
              <div style={{ fontFamily: ff, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.stone, marginBottom: 12 }}>{modal.cat}</div>
              <h2 style={{ fontFamily: fd, fontSize: 28, fontWeight: 500, color: C.black, marginBottom: 8, letterSpacing: "-0.02em" }}>{modal.title}</h2>
              <p style={{ fontFamily: ff, fontSize: 15, color: C.stone, fontWeight: 500, marginBottom: 16 }}>{modal.loc}</p>
              <p style={{ fontFamily: ff, fontSize: 15, color: C.dark, lineHeight: 1.75, marginBottom: 28 }}>{modal.desc}</p>
              <button onClick={() => setModal(null)} style={{ fontFamily: ff, fontSize: 14, fontWeight: 500, background: C.bg, color: C.dark, border: "none", borderRadius: 980, padding: "10px 24px", cursor: "pointer" }}>Schliessen</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══ HOME ══ */
function Home({ go }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(90px,14vw,140px) 24px clamp(60px,10vw,100px)", background: C.white, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, " + C.stonePale + " 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 720 }}>
            {/* Yellow badge — edit REGION constant at top of file */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.bg, borderRadius: 980, padding: "7px 16px 7px 10px", marginBottom: 40 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.stone }} />
              <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 500, color: C.gray }}>{REGION}</span>
            </div>
            {/* H1 — now uses Montserrat (fh) */}
            <h1 style={{ fontFamily: fh, fontSize: "clamp(40px,7vw,78px)", fontWeight: 900, color: C.black, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 32px" }}>
              Rückbau,<br />Recycling &<br /><span style={{ color: C.stone }}>Entsorgung.</span>
            </h1>
            <p style={{ fontFamily: fd, fontSize: "clamp(17px,2.2vw,22px)", color: C.dark, lineHeight: 1.6, maxWidth: 520, margin: "0 0 48px", fontWeight: 400, fontStyle: "italic" }}>
              Wir räumen auf, damit Sie bauen können. Fachgerecht direkt aus der Region.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => go("kontakt")} style={{ fontFamily: ff, fontSize: 16, fontWeight: 500, background: C.black, color: C.white, border: "none", borderRadius: 980, padding: "16px 36px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>Kostenlose Offerte {I.arrowR("#fff", 17)}</button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: ff, fontSize: 16, fontWeight: 500, color: C.black, border: "1.5px solid " + C.line, borderRadius: 980, padding: "15px 32px", textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>{I.msg(C.black)} WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ borderTop: "0.5px solid " + C.line, borderBottom: "0.5px solid " + C.line, padding: "20px 16px", background: C.white, width: "100%", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(12px,3vw,48px)", flexWrap: "wrap", fontFamily: ff, fontSize: 13, color: C.gray }}>
          {["Kostenlose Besichtigung", "Fixpreis-Offerten", "Fachgerechte Entsorgung", "Persönlicher Kontakt"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>{I.check(C.stone)} {t}</div>
          ))}
        </div>
      </div>

      {/* Services list */}
      <W bg={C.white} py={100}>
        <div style={{ marginBottom: 64 }}>
          <Lab>Leistungen</Lab>
          <h2 style={{ fontFamily: fd, fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", lineHeight: 1.15, margin: 0 }}>Fünf Dienstleistungen.<br />Eine Anlaufstelle.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SVC.map((s, i) => (
            <div key={s.id} onClick={() => go(s.id)}
              style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 20, alignItems: "center", padding: "28px 0", borderTop: i === 0 ? "0.5px solid " + C.line : "none", borderBottom: "0.5px solid " + C.line, cursor: "pointer", transition: "padding 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "12px"; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon(s.icon, C.stone)}</div>
              <div>
                <h3 style={{ fontFamily: ff, fontSize: 18, fontWeight: 600, color: C.black, marginBottom: 4, letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p style={{ fontFamily: ff, fontSize: 14, color: C.gray, margin: 0 }}>{s.sub}</p>
              </div>
              {I.arrowUR(C.muted)}
            </div>
          ))}
        </div>
      </W>

      {/* About teaser — text edited via constants at top */}
      <W bg={C.bg} py={100}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "center" }}>
          <Img label="Team- oder Arbeitsfoto" h={460} r={20} src={HOME_ABOUT_IMG} />
          <div>
            <Lab>Über uns</Lab>
            <h2 style={{ fontFamily: fd, fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 24 }}>
              {ABOUT_HEADING_LINE1}<br />{ABOUT_HEADING_LINE2}
            </h2>
            <p style={{ fontFamily: ff, fontSize: 16, color: C.dark, lineHeight: 1.8, marginBottom: 16 }}>{ABOUT_P1}</p>
            <p style={{ fontFamily: ff, fontSize: 16, color: C.dark, lineHeight: 1.8, marginBottom: 36 }}>{ABOUT_P2}</p>
            <span onClick={() => go("about")} style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, color: C.black, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid " + C.black, paddingBottom: 4 }}>Mehr erfahren {I.arrowR(C.black, 15)}</span>
          </div>
        </div>
      </W>

      {/* Projects slider */}
      <W bg={C.white} py={100}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
          <div><Lab>Projekte</Lab><h2 style={{ fontFamily: fd, fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", margin: 0 }}>Bisherige Arbeiten</h2></div>
          <span onClick={() => go("projekte")} style={{ fontFamily: ff, fontSize: 14, fontWeight: 500, color: C.black, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, borderBottom: "1.5px solid " + C.black, paddingBottom: 3 }}>Alle ansehen {I.arrowR(C.black, 14)}</span>
        </div>
        <ProjectSlider go={go} />
      </W>

      {/* Process timeline */}
      <W bg={C.bg} py={100}>
        <div style={{ maxWidth: 640, margin: "0 auto 72px", textAlign: "center" }}>
          <Lab>Ablauf</Lab>
          <h2 style={{ fontFamily: fd, fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", margin: 0 }}>Vier Schritte, ein Ergebnis.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24, position: "relative" }}>
          {[["phone","Anfrage","Sie rufen an oder schreiben uns kurz Ihr Anliegen."],["eye","Besichtigung","Wir kommen vorbei und schauen uns die Situation an. Kostenlos."],["send","Offerte","Innert 48 Stunden erhalten Sie eine transparente Fixpreis-Offerte."],["check","Umsetzung","Termingerecht, sauber und ohne Stress."]].map(([ic, t, d], i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: C.white, border: "2px solid " + C.stone, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>{I[ic](C.stone)}</div>
              <div style={{ fontFamily: fd, fontSize: 14, fontWeight: 500, color: C.stone, marginBottom: 8, fontStyle: "italic" }}>{"0" + (i + 1)}</div>
              <h3 style={{ fontFamily: fd, fontSize: 20, fontWeight: 500, color: C.black, marginBottom: 10, letterSpacing: "-0.01em" }}>{t}</h3>
              <p style={{ fontFamily: ff, fontSize: 14, color: C.gray, lineHeight: 1.6, margin: 0, maxWidth: 200 }}>{d}</p>
            </div>
          ))}
        </div>
      </W>

      <CTA go={go} />
    </div>
  );
}

/* ══ ABOUT ══ */
function About({ go }) {
  return (
    <div>
      <W bg={C.white} py={160} sx={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 640 }}>
          <Lab>Über uns</Lab>
          <h1 style={{ fontFamily: fd, fontSize: "clamp(36px,6vw,60px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 28 }}>Wer wir sind – und warum wir das machen.</h1>
          <p style={{ fontFamily: fd, fontSize: 20, color: C.gray, lineHeight: 1.65, fontStyle: "italic" }}>Rückbau, Entsorgung und Recycling verdienen Sorgfalt – nicht nur Tempo.</p>
        </div>
      </W>
      <W bg={C.white} py={0} sx={{ paddingBottom: 80 }}>
        <Img label="Teamfoto" h={440} r={24} src={ABOUT_TEAM_IMG} />
      </W>
      <W bg={C.white} py={0} sx={{ paddingBottom: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {["Unser Team ist klein, dafür eingespielt. Wir arbeiten mit Erfahrung, Handwerk und den richtigen Geräten – flexibel und schnell.", "Ob Badezimmer-Rückbau, Wohnungsräumung oder Einbringung von Sanitäranlagen: sauber, termingerecht und fair.", "Rund ein Dutzend Projekte in der Region Zürich. Jedes mit dem Anspruch: Der Kunde soll uns weiterempfehlen."].map((t, i) => (
            <p key={i} style={{ fontFamily: ff, fontSize: 17, color: C.dark, lineHeight: 1.85, marginBottom: 24 }}>{t}</p>
          ))}
        </div>
      </W>
      <W bg={C.bg} py={100}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[["shield","Zuverlässig","Termine halten wir ein. Immer."],["users","Persönlich","Direkter Draht zur Baustelle."],["recycle","Nachhaltig","Konsequentes Recycling."],["check","Fair","Fixpreise, keine versteckten Kosten."]].map(([ic, t, d]) => (
            <div key={t} style={{ background: C.white, borderRadius: 20, padding: 32 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.stonePale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{I[ic](C.stone)}</div>
              <h3 style={{ fontFamily: fd, fontSize: 18, fontWeight: 500, color: C.black, marginBottom: 10 }}>{t}</h3>
              <p style={{ fontFamily: ff, fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </W>
      <CTA go={go} />
    </div>
  );
}

/* ══ SERVICE PAGE ══ */
function ServicePage({ s, go }) {
  const others = SVC.filter((x) => x.id !== s.id);
  return (
    <div>
      <W bg={C.white} py={160} sx={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: C.stonePale, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon(s.icon, C.stone)}</div>
            <span style={{ fontFamily: ff, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: C.stone }}>Leistung</span>
          </div>
          <h1 style={{ fontFamily: fd, fontSize: "clamp(36px,6vw,56px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>{s.title}</h1>
          <p style={{ fontFamily: fd, fontSize: 20, color: C.gray, lineHeight: 1.6, fontStyle: "italic" }}>{s.heroSub}</p>
        </div>
      </W>
      <W bg={C.white} py={0} sx={{ paddingBottom: 100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "start" }}>
          {/* Real construction image from SVC_IMAGES */}
          <Img label={"Foto: " + s.title} h={400} r={20} src={SVC_IMAGES[s.id] || ""} />
          <div>
            <p style={{ fontFamily: ff, fontSize: 17, color: C.dark, lineHeight: 1.85, marginBottom: 24 }}>{s.desc}</p>
            {s.p.map((t, i) => <p key={i} style={{ fontFamily: ff, fontSize: 16, color: C.dark, lineHeight: 1.85, marginBottom: 20 }}>{t}</p>)}
            <div style={{ background: C.bg, borderRadius: 20, padding: 28, marginTop: 12 }}>
              <h4 style={{ fontFamily: fd, fontSize: 16, fontWeight: 500, color: C.black, marginBottom: 20 }}>{s.id === "sanitaer" ? "So läuft es ab" : "Das umfasst"}</h4>
              {s.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderTop: i > 0 ? "0.5px solid " + C.line : "none" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.stone, flexShrink: 0 }} />
                  <span style={{ fontFamily: ff, fontSize: 15, color: C.dark }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </W>
      <W bg={C.stonePale} py={72}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: fd, fontSize: 28, fontWeight: 400, color: C.black, marginBottom: 6 }}>{s.title} geplant?</h3>
            <p style={{ fontFamily: ff, fontSize: 15, color: C.gray, margin: 0 }}>Kostenlose Besichtigung, faire Offerte.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => go("kontakt")} style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, background: C.black, color: C.white, border: "none", borderRadius: 980, padding: "14px 28px", cursor: "pointer" }}>Offerte anfragen</button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, background: C.wa, color: C.white, borderRadius: 980, padding: "14px 28px", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>{I.msg("#fff")} WhatsApp</a>
          </div>
        </div>
      </W>
      <W bg={C.white} py={100}>
        <h3 style={{ fontFamily: fd, fontSize: 28, fontWeight: 400, color: C.black, marginBottom: 36 }}>Weitere Leistungen</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {others.map((o) => (
            <div key={o.id} onClick={() => go(o.id)}
              style={{ background: C.bg, borderRadius: 18, padding: 28, cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              {icon(o.icon, C.stone)}
              <h4 style={{ fontFamily: ff, fontSize: 15, fontWeight: 600, color: C.black, margin: "14px 0 0" }}>{o.title}</h4>
            </div>
          ))}
        </div>
      </W>
    </div>
  );
}

/* ══ PROJECTS ══ */
function Projects({ go }) {
  const [f, setF]         = useState("Alle");
  const [modal, setModal] = useState(null);
  const cats = ["Alle", ...Array.from(new Set(PROJ.map((p) => p.cat)))];
  const list = f === "Alle" ? PROJ : PROJ.filter((p) => p.cat === f);
  return (
    <div>
      <W bg={C.white} py={160} sx={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 600 }}>
          <Lab>Referenzen</Lab>
          <h1 style={{ fontFamily: fd, fontSize: "clamp(36px,6vw,56px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>Unsere bisherigen Projekte.</h1>
          <p style={{ fontFamily: fd, fontSize: 19, color: C.gray, lineHeight: 1.6, fontStyle: "italic" }}>Termingerecht, sauber, zur Zufriedenheit unserer Kunden.</p>
        </div>
      </W>
      <W bg={C.white} py={0} sx={{ paddingBottom: 100 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setF(c)} style={{ fontFamily: ff, fontSize: 13, fontWeight: 500, border: "none", borderRadius: 980, padding: "9px 20px", cursor: "pointer", background: f === c ? C.black : "transparent", color: f === c ? C.white : C.gray, outline: f === c ? "none" : "1.5px solid " + C.line }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {list.map((p, i) => (
            <div key={i} onClick={() => setModal(p)}
              style={{ borderRadius: 20, overflow: "hidden", background: C.bg, cursor: "pointer", transition: "transform 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ position: "relative" }}>
                <Img label="Projektfoto einfügen" h={260} r={0} />
                <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>{I.expand(C.dark)}</div>
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: ff, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.stone, background: C.stonePale, padding: "5px 14px", borderRadius: 980 }}>{p.cat}</span>
                </div>
                <h3 style={{ fontFamily: fd, fontSize: 20, fontWeight: 500, color: C.black, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontFamily: ff, fontSize: 14, color: C.stone, fontWeight: 500, marginBottom: 12 }}>{p.loc}</p>
                <p style={{ fontFamily: ff, fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </W>
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.white, borderRadius: 24, maxWidth: 640, width: "100%", overflow: "hidden" }}>
            <Img label="Projektfoto – Vollansicht" h={340} r={0} />
            <div style={{ padding: "32px 36px 36px" }}>
              <div style={{ fontFamily: ff, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.stone, marginBottom: 12 }}>{modal.cat}</div>
              <h2 style={{ fontFamily: fd, fontSize: 28, fontWeight: 500, color: C.black, marginBottom: 8 }}>{modal.title}</h2>
              <p style={{ fontFamily: ff, fontSize: 15, color: C.stone, fontWeight: 500, marginBottom: 16 }}>{modal.loc}</p>
              <p style={{ fontFamily: ff, fontSize: 15, color: C.dark, lineHeight: 1.75, marginBottom: 28 }}>{modal.desc}</p>
              <button onClick={() => setModal(null)} style={{ fontFamily: ff, fontSize: 14, fontWeight: 500, background: C.bg, color: C.dark, border: "none", borderRadius: 980, padding: "10px 24px", cursor: "pointer" }}>Schliessen</button>
            </div>
          </div>
        </div>
      )}
      <CTA go={go} />
    </div>
  );
}

/* ══ CONTACT ══ */
function Contact() {
  return (
    <div>
      <W bg={C.white} py={160} sx={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 560 }}>
          <Lab>Kontakt</Lab>
          <h1 style={{ fontFamily: fd, fontSize: "clamp(36px,6vw,56px)", fontWeight: 400, color: C.black, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>Lassen Sie uns sprechen.</h1>
          <p style={{ fontFamily: fd, fontSize: 19, color: C.gray, lineHeight: 1.6, fontStyle: "italic" }}>Kein Callcenter. Direkter Draht zu den Leuten auf der Baustelle.</p>
        </div>
      </W>
      <W bg={C.white} py={0} sx={{ paddingBottom: 100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[["phone","Telefon",PH,"tel:"+PH.replace(/\s/g,"")],["mail","E-Mail","info@firmenname.ch","mailto:info@firmenname.ch"],["msg","WhatsApp","Direkt schreiben",WA_LINK]].map(([ic, label, val, href]) => (
              <a key={label} href={href} target={label === "WhatsApp" ? "_blank" : undefined} rel={label === "WhatsApp" ? "noopener noreferrer" : undefined}
                style={{ display: "flex", alignItems: "center", gap: 18, padding: "22px 24px", background: C.bg, borderRadius: 18, textDecoration: "none", transition: "all 0.2s", border: "1px solid transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.background = C.white; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = C.bg; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{I[ic](C.stone)}</div>
                <div>
                  <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontFamily: ff, fontSize: 16, fontWeight: 600, color: C.black }}>{val}</div>
                </div>
              </a>
            ))}
            <div style={{ padding: 24, background: C.stonePale, borderRadius: 18, marginTop: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>{I.mapPin(C.stone)}<span style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, color: C.black }}>Einsatzgebiet</span></div>
              <p style={{ fontFamily: ff, fontSize: 14, color: C.dark, lineHeight: 1.7, margin: 0 }}>Stadt Zürich, Winterthur, Limmattal, Glattal, Zürcher Ober- und Unterland.</p>
            </div>
          </div>
          <div style={{ background: C.bg, borderRadius: 24, padding: "clamp(24px,4vw,40px)" }}>
            <h3 style={{ fontFamily: fd, fontSize: 24, fontWeight: 400, color: C.black, letterSpacing: "-0.02em", marginBottom: 8 }}>Offerte anfragen</h3>
            <p style={{ fontFamily: ff, fontSize: 14, color: C.gray, marginBottom: 32 }}>Kostenlos und unverbindlich. Antwort innert 24 Stunden.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[["Name","text","Ihr Name"],["Telefon","tel","+41 XX XXX XX XX"],["E-Mail","email","name@beispiel.ch"]].map(([label, type, ph]) => (
                <div key={label}>
                  <label style={{ fontFamily: ff, fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 7, display: "block" }}>{label}</label>
                  <input type={type} placeholder={ph} style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "1.5px solid " + C.line, fontSize: 15, fontFamily: ff, background: C.white, outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = C.stone; e.currentTarget.style.boxShadow = "0 0 0 3px " + C.stonePale; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: ff, fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 7, display: "block" }}>Dienstleistung</label>
                <select style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "1.5px solid " + C.line, fontSize: 15, fontFamily: ff, background: C.white, outline: "none", boxSizing: "border-box", color: C.dark }}>
                  <option value="">Bitte wählen...</option>
                  {SVC.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                  <option value="andere">Anderes</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: ff, fontSize: 12, fontWeight: 600, color: C.dark, marginBottom: 7, display: "block" }}>Nachricht</label>
                <textarea rows={4} placeholder="Beschreiben Sie kurz Ihr Projekt..." style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "1.5px solid " + C.line, fontSize: 15, fontFamily: ff, background: C.white, outline: "none", boxSizing: "border-box", resize: "vertical" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = C.stone; e.currentTarget.style.boxShadow = "0 0 0 3px " + C.stonePale; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <button style={{ fontFamily: ff, fontSize: 16, fontWeight: 500, background: C.black, color: C.white, border: "none", borderRadius: 14, padding: "16px 28px", cursor: "pointer", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>Offerte absenden {I.arrowR("#fff")}</button>
              <p style={{ fontFamily: ff, fontSize: 13, color: C.muted, textAlign: "center", marginTop: 4 }}>Oder via <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: C.wa, fontWeight: 600, textDecoration: "none" }}>WhatsApp</a></p>
            </div>
          </div>
        </div>
      </W>
    </div>
  );
}

/* ══ APP ══ */
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const link  = document.createElement("link");
    link.rel    = "stylesheet";
    // Montserrat added for H1 hero font
    link.href   = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  const go  = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cur = SVC.find((s) => s.id === page);

  return (
    <div style={{ minHeight: "100vh", background: C.white, fontFamily: ff, color: C.dark, overflowX: "hidden", width: "100%" }}>
      <Nav page={page} go={go} />
      <main>
        {page === "home"     && <Home go={go} />}
        {page === "about"    && <About go={go} />}
        {page === "projekte" && <Projects go={go} />}
        {page === "kontakt"  && <Contact />}
        {cur && <ServicePage s={cur} go={go} />}
      </main>
      <Footer go={go} />
      <Fab />
      <style>{
        "html,body{margin:0;padding:0;overflow-x:hidden;width:100%;}" +
        "*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; } " +
        "body { -webkit-font-smoothing:antialiased; } " +
        "#root{overflow-x:hidden;width:100%;}" +
        "::selection { background:" + C.stoneLight + "; color:" + C.black + "; } " +
        "img{max-width:100%;display:block;}" +
        /* ── Responsive ── */
        "@media(max-width:860px){" +
          ".dN{display:none!important}" +
          ".mN{display:block!important}" +
          "section{padding-left:16px!important;padding-right:16px!important;}" +
        "}" +
        "@media(max-width:600px){" +
          "section{padding-top:60px!important;padding-bottom:60px!important;}" +
          "footer{padding-left:16px!important;padding-right:16px!important;padding-top:48px!important;padding-bottom:28px!important;}" +
        "}"
      }</style>
    </div>
  );
}
