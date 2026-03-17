import { useState, useEffect } from "react";

const C = {
  black: "#1d1d1f", dark: "#424245", gray: "#6e6e73", muted: "#a1a1a6",
  line: "#e8e8ed", bg: "#f5f5f7", white: "#fff",
  stone: "#A78B71", stonePale: "#F7F3EF", stoneLight: "#EDE6DD",
};
const ff = "'DM Sans', -apple-system, sans-serif";
const fd = "'Playfair Display', Georgia, serif";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SERVICES = [
  { id: "rueckbau",   name: "Rückbau",                   sub: "Innenausbau bis Entkernung",        icon: "🔨", duration: 120 },
  { id: "recycling",  name: "Recycling",                  sub: "Baustoffe zurück in den Kreislauf", icon: "♻️", duration: 60  },
  { id: "entsorgung", name: "Entsorgung",                 sub: "Fachgerecht & dokumentiert",        icon: "🗑️", duration: 90  },
  { id: "transport",  name: "Transport",                  sub: "Material raus, Material rein",      icon: "🚛", duration: 60  },
  { id: "sanitaer",   name: "Einbringung Sanitäranlagen", sub: "300 kg. Schmales Treppenhaus.",     icon: "🔧", duration: 120 },
];

const DAYS   = ["So","Mo","Di","Mi","Do","Fr","Sa"];
const MONTHS = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

function fallbackSlots() {
  const slots = [];
  const now   = new Date();
  for (let h = 8; h < 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      const t = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);
      slots.push({ time: t, available: slotTime > now });
    }
  }
  return slots;
}

const ChkSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ArrR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ArrL = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

/* ═══════════════════ STEP BAR ═══════════════════ */
function StepBar({ step }) {
  const labels = ["Dienstleistung", "Datum & Zeit", "Ihre Daten"];
  return (
    <div style={{ display:"flex", alignItems:"flex-start", marginBottom:60 }}>
      {labels.map((label, i) => {
        const n = i+1, done = step > n, active = step === n;
        return (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", flex: i < labels.length-1 ? 1 : "none" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
              <div style={{
                width:52, height:52, borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
                background: done ? C.stone : active ? C.black : C.bg,
                color: (done||active) ? C.white : C.muted,
                fontSize:18, fontWeight:700, fontFamily:ff,
                border:`2.5px solid ${done ? C.stone : active ? C.black : C.line}`,
                transition:"all 0.3s", flexShrink:0,
                boxShadow: active ? `0 0 0 6px ${C.stonePale}` : "none",
              }}>
                {done ? <ChkSvg/> : n}
              </div>
              <span style={{ fontFamily:ff, fontSize:13, fontWeight: active ? 700 : 400, color: active ? C.black : C.muted, whiteSpace:"nowrap" }}>
                {label}
              </span>
            </div>
            {i < labels.length-1 && (
              <div style={{ flex:1, height:2.5, margin:"24px 14px 0", background: step > n ? C.stone : C.line, transition:"background 0.4s" }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════ SIDEBAR ═══════════════════ */
function Sidebar({ booking }) {
  return (
    <div style={{ background:C.white, borderRadius:20, padding:"28px 24px", border:`1px solid ${C.line}`, position:"sticky", top:80 }}>
      <p style={{ fontFamily:ff, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:C.muted, marginBottom:22 }}>— IHRE AUSWAHL</p>
      {[
        { n:"01", label:"Dienstleistung", val: booking.service?.name },
        { n:"02", label:"Datum",          val: booking.date },
        { n:"03", label:"Zeit",           val: booking.time ? booking.time+" Uhr" : null },
      ].map(({ n, label, val }) => (
        <div key={n} style={{ padding:"16px 0", borderBottom:`1px solid ${C.line}` }}>
          <span style={{ fontFamily:ff, fontSize:11, color:C.muted, display:"block", marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase" }}>{n} {label}</span>
          {val
            ? <span style={{ fontFamily:ff, fontSize:16, fontWeight:700, color:C.black }}>{val}</span>
            : <span style={{ fontFamily:ff, fontSize:14, color:C.muted, fontStyle:"italic" }}>Ausstehend</span>
          }
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════ STEP 1 — SERVICE ═══════════════════ */
function ServiceStep({ selected, onSelect }) {
  return (
    <div>
      <p style={{ fontFamily:ff, fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:C.stone, marginBottom:12 }}>Schritt 01</p>
      <h2 style={{ fontFamily:fd, fontSize:"clamp(32px,4vw,52px)", fontWeight:400, color:C.black, marginBottom:12, letterSpacing:"-0.02em", lineHeight:1.1 }}>
        Dienstleistung wählen
      </h2>
      <p style={{ fontFamily:ff, fontSize:17, color:C.gray, marginBottom:44, lineHeight:1.6 }}>Wählen Sie die passende Leistung für Ihr Projekt.</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18 }}>
        {SERVICES.map((svc) => {
          const sel = selected?.id === svc.id;
          return (
            <button key={svc.id} onClick={() => onSelect(svc)}
              style={{
                border:`2.5px solid ${sel ? C.stone : C.line}`,
                borderRadius:20, padding:"28px 24px", cursor:"pointer",
                background: sel ? C.stonePale : C.white,
                textAlign:"left", transition:"all 0.2s", position:"relative", outline:"none",
              }}
              onMouseEnter={(e) => { if(!sel) { e.currentTarget.style.borderColor="#b8a896"; e.currentTarget.style.transform="translateY(-2px)"; } }}
              onMouseLeave={(e) => { if(!sel) { e.currentTarget.style.borderColor=C.line; e.currentTarget.style.transform="translateY(0)"; } }}
            >
              {sel && (
                <div style={{ position:"absolute", top:16, right:16, width:28, height:28, borderRadius:"50%", background:C.stone, color:C.white, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ChkSvg/>
                </div>
              )}
              <div style={{ fontSize:32, marginBottom:16 }}>{svc.icon}</div>
              <h3 style={{ fontFamily:ff, fontSize:18, fontWeight:700, color:C.black, margin:"0 0 8px" }}>{svc.name}</h3>
              <p style={{ fontFamily:ff, fontSize:14, color:C.gray, margin:"0 0 14px", lineHeight:1.6 }}>{svc.sub}</p>
              <p style={{ fontFamily:ff, fontSize:13, color:C.stone, fontWeight:700, margin:0 }}>⏱ ca. {svc.duration} Min.</p>
            </button>
          );
        })}
      </div>

      {selected && (
        <div style={{ marginTop:32, padding:"18px 24px", background:C.stonePale, borderRadius:14, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:20 }}>✅</span>
          <span style={{ fontFamily:ff, fontSize:16, color:C.stone, fontWeight:500 }}>
            <strong style={{ color:C.dark }}>{selected.name}</strong> ausgewählt — weiter zu Datum &amp; Zeit…
          </span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ STEP 2 — DATE & TIME ═══════════════════ */
function DateTimeStep({ booking, onSelect }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selDate,   setSelDate]   = useState(null);
  const [selTime,   setSelTime]   = useState(null);
  const [slots,     setSlots]     = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [demoMode,  setDemoMode]  = useState(false);

  useEffect(() => {
    if (!selDate) return;
    setLoading(true);
    setSlots([]);
    setSelTime(null);
    setDemoMode(false);

    fetch(`${API_URL}/api/booking/availability?date=${selDate}&duration=${booking.service?.duration||60}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.slots && d.slots.length > 0) {
          setSlots(d.slots);
          if (d.mode === "demo") setDemoMode(true);
        } else {
          setSlots(fallbackSlots());
          setDemoMode(true);
        }
      })
      .catch(() => {
        setSlots(fallbackSlots());
        setDemoMode(true);
      })
      .finally(() => setLoading(false));
  }, [selDate]);

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const cells       = Array(firstDay).fill(null).concat(Array.from({length:daysInMonth},(_,i)=>i+1));
  const fmt         = (d) => `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const fmtLabel    = (d) => `${d}. ${MONTHS[viewMonth]} ${viewYear}`;
  const isPast      = (d) => {
    const c = new Date(viewYear, viewMonth, d);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return c < t;
  };

  const prevMonth = () => viewMonth===0 ? (setViewMonth(11), setViewYear(y=>y-1)) : setViewMonth(m=>m-1);
  const nextMonth = () => viewMonth===11 ? (setViewMonth(0), setViewYear(y=>y+1)) : setViewMonth(m=>m+1);
  const availableSlots = slots.filter(s => s.available);

  return (
    <div>
      <p style={{ fontFamily:ff, fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:C.stone, marginBottom:12 }}>Schritt 02</p>
      <h2 style={{ fontFamily:fd, fontSize:"clamp(32px,4vw,52px)", fontWeight:400, color:C.black, marginBottom:12, letterSpacing:"-0.02em", lineHeight:1.1 }}>
        Datum &amp; Zeit wählen
      </h2>
      <p style={{ fontFamily:ff, fontSize:17, color:C.gray, marginBottom:36 }}>Finden Sie Ihren passenden Termin.</p>

      {demoMode && (
        <div style={{ marginBottom:24, padding:"14px 20px", background:"#fffcf0", border:"1px solid #e8d878", borderRadius:12, fontFamily:ff, fontSize:14, color:"#7a6200", display:"flex", alignItems:"center", gap:10 }}>
          <span>⚠️</span>
          <span><strong>Demo-Modus:</strong> Google Calendar nicht verbunden — alle Zeiten werden als verfügbar angezeigt. Buchung funktioniert trotzdem!</span>
        </div>
      )}

      {/* Calendar + time slots — responsive via class */}
      <div className="bk-cal-row" style={{ display:"grid", gridTemplateColumns: selDate ? "1fr 220px" : "1fr", gap:24, alignItems:"start" }}>

        {/* Calendar */}
        <div style={{ background:C.white, border:`1px solid ${C.line}`, borderRadius:22, padding:"32px 28px" }}>
          {/* Month nav */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
            <button onClick={prevMonth} style={{ width:44, height:44, borderRadius:"50%", border:`1.5px solid ${C.line}`, background:C.bg, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.line}
              onMouseLeave={e=>e.currentTarget.style.background=C.bg}
            ><ArrL/></button>
            <span style={{ fontFamily:fd, fontWeight:500, fontSize:22, color:C.black }}>{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} style={{ width:44, height:44, borderRadius:"50%", border:`1.5px solid ${C.line}`, background:C.bg, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transform:"rotate(180deg)", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.line}
              onMouseLeave={e=>e.currentTarget.style.background=C.bg}
            ><ArrL/></button>
          </div>

          {/* Day headers */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:10 }}>
            {DAYS.map(d=>(
              <div key={d} style={{ textAlign:"center", fontFamily:ff, fontSize:13, fontWeight:700, color:C.muted, padding:"4px 0", letterSpacing:"0.04em" }}>{d}</div>
            ))}
          </div>

          {/* Date cells */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6 }}>
            {cells.map((day,i) => {
              if (!day) return <div key={i}/>;
              const past  = isPast(day);
              const isSel = selDate === fmt(day);
              return (
                <button key={i} disabled={past} onClick={() => { setSelDate(fmt(day)); setSelTime(null); }}
                  style={{
                    height:48, borderRadius:12, border:"none",
                    cursor: past ? "not-allowed" : "pointer",
                    background: isSel ? C.black : "transparent",
                    color: isSel ? C.white : past ? "#d0d0d5" : C.dark,
                    fontFamily:ff, fontSize:16, fontWeight: isSel ? 700 : 400,
                    transition:"all 0.15s",
                  }}
                  onMouseEnter={e=>{ if(!past&&!isSel) e.currentTarget.style.background=C.bg; }}
                  onMouseLeave={e=>{ if(!isSel) e.currentTarget.style.background="transparent"; }}
                >{day}</button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display:"flex", gap:24, marginTop:20, paddingTop:16, borderTop:`1px solid ${C.line}` }}>
            <span style={{ display:"flex", alignItems:"center", gap:6, fontFamily:ff, fontSize:13, color:C.gray }}>
              <span style={{ width:10, height:10, borderRadius:"50%", background:C.black, display:"inline-block" }}/> Ausgewählt
            </span>
            <span style={{ display:"flex", alignItems:"center", gap:6, fontFamily:ff, fontSize:13, color:C.gray }}>
              <span style={{ width:10, height:10, borderRadius:"50%", background:"#d0d0d5", display:"inline-block" }}/> Vergangen
            </span>
          </div>
        </div>

        {/* Time slots panel */}
        {selDate && (
          <div>
            <p style={{ fontFamily:ff, fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:C.stone, marginBottom:10 }}>VERFÜGBARE ZEITEN</p>
            <p style={{ fontFamily:ff, fontSize:14, color:C.gray, marginBottom:14 }}>
              {fmtLabel(Number(selDate.split("-")[2]))}
            </p>
            {loading ? (
              <div style={{ fontFamily:ff, fontSize:15, color:C.gray, padding:"24px 0" }}>Zeiten werden geladen…</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8, maxHeight:460, overflowY:"auto" }}>
                {slots.map(({ time, available }) => (
                  <button key={time} disabled={!available} onClick={() => setSelTime(time)}
                    style={{
                      padding:"14px 18px", borderRadius:12,
                      cursor: available ? "pointer" : "not-allowed",
                      border:`1.5px solid ${!available ? C.line : selTime===time ? C.stone : C.line}`,
                      background: !available ? C.bg : selTime===time ? C.stonePale : C.white,
                      color: !available ? C.muted : selTime===time ? C.stone : C.dark,
                      fontFamily:ff, fontSize:15, fontWeight: selTime===time ? 700 : 400,
                      textDecoration: !available ? "line-through" : "none",
                      transition:"all 0.15s", textAlign:"center",
                    }}
                    onMouseEnter={e=>{ if(available&&selTime!==time) e.currentTarget.style.background=C.stonePale; }}
                    onMouseLeave={e=>{ if(selTime!==time) e.currentTarget.style.background=available?C.white:C.bg; }}
                  >{time}</button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {!selDate && (
        <div style={{ marginTop:24, display:"flex", alignItems:"center", gap:14, padding:"20px 24px", background:C.stonePale, borderRadius:14 }}>
          <span style={{ fontSize:22 }}>📅</span>
          <span style={{ fontFamily:ff, fontSize:16, color:C.stone }}>Wählen Sie ein Datum, um verfügbare Zeiten zu sehen.</span>
        </div>
      )}

      {selDate && selTime && (
        <button onClick={() => onSelect(selDate, selTime)}
          style={{ marginTop:32, fontFamily:ff, fontSize:17, fontWeight:700, background:C.black, color:C.white, border:"none", borderRadius:980, padding:"18px 44px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, transition:"opacity 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
          onMouseLeave={e=>e.currentTarget.style.opacity="1"}
        >
          Weiter — {selTime} Uhr bestätigen <ArrR/>
        </button>
      )}

      {selDate && !selTime && !loading && availableSlots.length > 0 && (
        <p style={{ fontFamily:ff, fontSize:15, color:C.gray, marginTop:20 }}>← Wählen Sie eine Uhrzeit aus dem Zeitplan.</p>
      )}
    </div>
  );
}

/* ═══════════════════ STEP 3 — CONTACT FORM ═══════════════════ */
function ContactStep({ booking, onChange, onConfirm, onBack }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleSubmit = async () => {
    if (!booking.name?.trim() || !booking.email?.trim()) {
      setError("Bitte füllen Sie Name und E-Mail aus.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/booking/create`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          service:         booking.service?.name,
          serviceDuration: booking.service?.duration,
          date:            booking.date,
          time:            booking.time,
          name:            booking.name,
          email:           booking.email,
          phone:           booking.phone  || "",
          message:         booking.message|| "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Buchung fehlgeschlagen");
      onConfirm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width:"100%", padding:"16px 18px", borderRadius:14,
    border:`1.5px solid ${C.line}`, fontSize:16, fontFamily:ff,
    background:C.white, outline:"none", boxSizing:"border-box", color:C.dark,
    transition:"border-color 0.2s",
  };

  return (
    <div>
      <p style={{ fontFamily:ff, fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:C.stone, marginBottom:12 }}>Letzter Schritt</p>
      <h2 style={{ fontFamily:fd, fontSize:"clamp(32px,4vw,52px)", fontWeight:400, color:C.black, marginBottom:12, letterSpacing:"-0.02em", lineHeight:1.1 }}>
        Buchung abschliessen
      </h2>
      <p style={{ fontFamily:ff, fontSize:17, color:C.gray, marginBottom:44 }}>Geben Sie Ihre Kontaktdaten ein.</p>

      <div className="bk-contact-row" style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:40, alignItems:"start" }}>

        {/* Form fields */}
        <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
          {[
            {label:"Vollständiger Name *", key:"name",    type:"text",  ph:"Max Mustermann"},
            {label:"E-Mail-Adresse *",     key:"email",   type:"email", ph:"max@beispiel.ch"},
            {label:"Telefonnummer",        key:"phone",   type:"tel",   ph:"+41 XX XXX XX XX"},
          ].map(({label,key,type,ph}) => (
            <div key={key}>
              <label style={{ fontFamily:ff, fontSize:12, fontWeight:700, color:C.dark, marginBottom:8, display:"block", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</label>
              <input type={type} placeholder={ph} value={booking[key]||""} onChange={e=>onChange({[key]:e.target.value})}
                style={inp}
                onFocus={e=>{ e.currentTarget.style.borderColor=C.stone; e.currentTarget.style.boxShadow=`0 0 0 4px ${C.stonePale}`; }}
                onBlur={e=>{  e.currentTarget.style.borderColor=C.line;  e.currentTarget.style.boxShadow="none"; }}
              />
            </div>
          ))}
          <div>
            <label style={{ fontFamily:ff, fontSize:12, fontWeight:700, color:C.dark, marginBottom:8, display:"block", textTransform:"uppercase", letterSpacing:"0.06em" }}>Nachricht (optional)</label>
            <textarea rows={5} placeholder="Kurze Beschreibung Ihres Projekts..." value={booking.message||""} onChange={e=>onChange({message:e.target.value})}
              style={{ ...inp, resize:"vertical" }}
              onFocus={e=>{ e.currentTarget.style.borderColor=C.stone; e.currentTarget.style.boxShadow=`0 0 0 4px ${C.stonePale}`; }}
              onBlur={e=>{  e.currentTarget.style.borderColor=C.line;  e.currentTarget.style.boxShadow="none"; }}
            />
          </div>
        </div>

        {/* Summary + submit */}
        <div>
          <div style={{ background:C.stonePale, borderRadius:20, padding:28, marginBottom:20 }}>
            <p style={{ fontFamily:ff, fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:C.stone, marginBottom:20 }}>IHRE BUCHUNG</p>
            {[
              {label:"Dienstleistung", value: booking.service?.name},
              {label:"Dauer",          value: booking.service ? `ca. ${booking.service.duration} Min.` : null},
              {label:"Datum",          value: booking.date},
              {label:"Uhrzeit",        value: booking.time ? booking.time+" Uhr" : null},
            ].map(({label,value}) => value && (
              <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 0", borderBottom:`1px solid ${C.stoneLight}`, fontFamily:ff }}>
                <span style={{ fontSize:14, color:C.gray }}>{label}</span>
                <span style={{ fontSize:15, fontWeight:700, color:C.black }}>{value}</span>
              </div>
            ))}
          </div>

          {error && (
            <div style={{ fontFamily:ff, fontSize:14, color:"#c0392b", padding:"14px 18px", background:"#fef9f9", border:"1px solid #f5c6cb", borderRadius:12, marginBottom:16 }}>
              ❌ {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", fontFamily:ff, fontSize:16, fontWeight:700, background: loading ? C.muted : C.black, color:C.white, border:"none", borderRadius:14, padding:"18px 24px", cursor: loading ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, transition:"background 0.2s" }}>
            {loading ? "Buchung läuft…" : <><span>Buchung bestätigen</span><ArrR/></>}
          </button>

          <button onClick={onBack}
            style={{ width:"100%", marginTop:12, fontFamily:ff, fontSize:15, color:C.gray, background:"none", border:`1.5px solid ${C.line}`, borderRadius:14, padding:"15px 24px", cursor:"pointer" }}>
            ← Zurück
          </button>

          <p style={{ fontFamily:ff, fontSize:13, color:C.muted, textAlign:"center", marginTop:16, lineHeight:1.7 }}>
            Nach der Buchung erhalten Sie eine Bestätigungs-E-Mail.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ CONFIRMED SCREEN ═══════════════════ */
function ConfirmedScreen({ booking, onHome }) {
  return (
    <div style={{ textAlign:"center", maxWidth:560, margin:"0 auto", paddingTop:20 }}>
      <div style={{ fontSize:64, marginBottom:28 }}>🎉</div>
      <p style={{ fontFamily:ff, fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:C.stone, marginBottom:14 }}>Buchung bestätigt</p>
      <h2 style={{ fontFamily:fd, fontSize:"clamp(34px,5vw,52px)", fontWeight:400, color:C.black, marginBottom:16, letterSpacing:"-0.02em", lineHeight:1.1 }}>
        Wir freuen uns auf Sie.
      </h2>
      <p style={{ fontFamily:ff, fontSize:17, color:C.gray, lineHeight:1.8, marginBottom:36 }}>
        Eine Bestätigungs-E-Mail wurde an{" "}
        <strong style={{ color:C.dark }}>{booking.email}</strong> gesendet.<br/>
        Wir melden uns vor dem Termin nochmals bei Ihnen.
      </p>
      <div style={{ background:C.stonePale, borderRadius:20, padding:28, marginBottom:36, textAlign:"left" }}>
        {[
          {label:"Dienstleistung", value: booking.service?.name},
          {label:"Datum & Zeit",   value: booking.date && booking.time ? `${booking.date} um ${booking.time} Uhr` : null},
          {label:"E-Mail",         value: booking.email},
        ].map(({label,value}) => value && (
          <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:`1px solid ${C.stoneLight}`, fontFamily:ff }}>
            <span style={{ fontSize:15, color:C.gray }}>{label}</span>
            <span style={{ fontSize:15, fontWeight:700, color:C.black }}>{value}</span>
          </div>
        ))}
      </div>
      <button onClick={onHome}
        style={{ fontFamily:ff, fontSize:17, fontWeight:700, background:C.black, color:C.white, border:"none", borderRadius:980, padding:"18px 48px", cursor:"pointer" }}>
        Zurück zur Startseite
      </button>
    </div>
  );
}

/* ═══════════════════ MAIN EXPORT ═══════════════════ */
export default function BookingPage({ onHome }) {
  const [step,      setStep]      = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [booking,   setBooking]   = useState({
    service:null, date:null, time:null,
    name:"", email:"", phone:"", message:"",
  });

  const update = (u) => setBooking(p => ({ ...p, ...u }));

  const selectService = (svc) => {
    update({ service:svc });
    setTimeout(() => setStep(2), 220);
  };

  if (confirmed) return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <ConfirmedScreen booking={booking} onHome={onHome}/>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:ff }}>

      {/* ── Top bar ── */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.line}`, padding:"0 40px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1400, margin:"0 auto", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:fd, fontSize:22, color:C.black, fontWeight:600, letterSpacing:"-0.02em" }}>[Firmenname]</span>
          <button onClick={onHome}
            style={{ fontFamily:ff, fontSize:15, color:C.gray, background:"none", border:`1.5px solid ${C.line}`, cursor:"pointer", display:"flex", alignItems:"center", gap:8, padding:"10px 18px", borderRadius:10, transition:"all 0.15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.background=C.bg; e.currentTarget.style.borderColor=C.muted; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="none"; e.currentTarget.style.borderColor=C.line; }}
          >
            <ArrL/> Zurück zur Website
          </button>
        </div>
      </div>

      {/* ── Page layout ── */}
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"60px 40px 120px" }}>
        <div className="bk-main-grid" style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:60, alignItems:"start" }}>

          {/* SIDEBAR */}
          <div className="bk-sidebar">
            <Sidebar booking={booking}/>
          </div>

          {/* MAIN CONTENT */}
          <div>
            <StepBar step={step}/>

            {step===1 && <ServiceStep selected={booking.service} onSelect={selectService}/>}

            {step===2 && (
              <DateTimeStep
                booking={booking}
                onSelect={(date,time) => { update({date,time}); setStep(3); }}
              />
            )}

            {step===3 && (
              <ContactStep
                booking={booking}
                onChange={update}
                onConfirm={() => setConfirmed(true)}
                onBack={() => setStep(2)}
              />
            )}
          </div>

        </div>
      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        /* Tablet: collapse sidebar into top bar */
        @media(max-width:1024px){
          .bk-main-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .bk-sidebar {
            display: none !important;
          }
          .bk-contact-row {
            grid-template-columns: 1fr !important;
          }
        }

        /* Mobile: full-width everything */
        @media(max-width:640px){
          .bk-main-grid {
            padding: 0 !important;
          }
          .bk-cal-row {
            grid-template-columns: 1fr !important;
          }
          .bk-contact-row {
            grid-template-columns: 1fr !important;
          }
        }

        /* Time slots panel stacks below calendar on mobile */
        @media(max-width:640px){
          .bk-cal-row {
            display: flex !important;
            flex-direction: column !important;
          }
        }

        /* Smooth scrolling for the whole page */
        html { scroll-behavior: smooth; }

        /* Custom scrollbar for time slots */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e0d8d0; border-radius: 4px; }
      `}</style>
    </div>
  );
}
