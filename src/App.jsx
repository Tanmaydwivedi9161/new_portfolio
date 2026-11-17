import { useEffect, useRef, useState } from "react";
import { PROFILE, PJ, SK, IC } from "./data";
import "./App.css";

/* ---------- Icons (inline SVG, koi library nahi chahiye) ---------- */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.88c0 5.45-4.44 9.89-9.9 9.89zM20.5 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.34-1.66a11.88 11.88 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.44-8.41z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
  </svg>
);

const NAV = [["Skills", "#skills"], ["Projects", "#projects"], ["Contact", "#contact"]];
const ORBIT1 = ["Python", "React", "Gemini"];            // andar wala ring
const ORBIT2 = ["RAG", "n8n", "LangChain", "Node.js"];   // bahar wala ring

/* ---------- Typing effect (hero me roles badalte hain) ---------- */
function useTypewriter(words, speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
        }
      },
      del ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

/* ---------- Scroll par fade-in ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShow(true), obs.disconnect()),
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${show ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function App() {
  const role = useTypewriter(PROFILE.roles);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const filters = ["All", ...new Set(PJ.map((p) => p[0]))];
  const list = PJ.filter((p) => filter === "All" || p[0] === filter);
  const wa = `https://wa.me/${PROFILE.whatsapp}`;

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>{PROFILE.name.split(" ")[0]}<span>.</span></a>
        <nav className={`links ${open ? "open" : ""}`}>
          {NAV.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href={PROFILE.blog} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Blog</a>
          <a className="btn primary nav-cta" href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <button className={`burger ${open ? "x" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero" id="top">
        <div className="chalk-lines" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-text">
            <p className="hello">Namaste, main</p>
            <h1 className="name">{PROFILE.name}</h1>
            <p className="role"><span>{role}</span><i className="cursor" /></p>
            <p className="intro">{PROFILE.intro}</p>
            <div className="actions">
              <a className="btn primary" href={PROFILE.blog} target="_blank" rel="noreferrer">Blog padho</a>
              <a className="btn" href="#projects">Projects dekho</a>
            </div>
            <div className="socials">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email"><MailIcon /></a>
            </div>
          </div>

          {/* Right side: orbit animation (chips yahan se edit karo: ORBIT1 / ORBIT2) */}
          <div className="hero-visual" aria-hidden="true">
            <div className="ring r1">
              {ORBIT1.map((t, i) => (
                <div className="chip-pos" key={t} style={{ "--a": `${(360 / ORBIT1.length) * i}deg` }}>
                  <span className="orb-chip c1">{t}</span>
                </div>
              ))}
            </div>
            <div className="ring r2">
              {ORBIT2.map((t, i) => (
                <div className="chip-pos" key={t} style={{ "--a": `${(360 / ORBIT2.length) * i + 20}deg` }}>
                  <span className="orb-chip c2">{t}</span>
                </div>
              ))}
            </div>
            <div className="core"><b>TD</b><small>Instructor & Mentor</small></div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="section" id="skills">
        <Reveal><h2>Skills</h2></Reveal>
        <div className="grid skills">
          {Object.entries(SK).map(([cat, items], idx) => (
            <Reveal key={cat} delay={idx * 70}>
              <div className={`card skill ${cat === "Mentoring & Training" ? "feature" : ""}`}>
                <h3><span className="ico">{IC[cat]}</span>{cat}</h3>
                <ul className="chips">
                  {items.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="section" id="projects">
        <Reveal><h2>Projects</h2></Reveal>
        <div className="tabs">
          {filters.map((f) => (
            <button key={f} className={f === filter ? "on" : ""} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="grid projects">
          {list.map(([type, title, desc, tech]) => (
            <div className="card project pop" key={title}>
              <span className="tag">{type}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul className="chips small">
                {tech.split(",").map((t) => <li key={t}>{t.trim()}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <a className="btn more" href={PROFILE.github} target="_blank" rel="noreferrer">
          <GitHubIcon /> Saare repositories GitHub par
        </a>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section contact" id="contact">
        <Reveal>
          <h2>Contact</h2>
          <div className="contact-list">
            <a href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp: 83180 67252</a>
            <a href={`mailto:${PROFILE.email}`}><MailIcon /> {PROFILE.email}</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="foot-grid">
          <div>
            <a href="#top" className="logo">{PROFILE.name}<span>.</span></a>
            <p className="foot-note">Instructor, Mentor aur AI / Full-Stack developer.</p>
          </div>
          <div>
            <h4>Quick links</h4>
            {NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
            <a href={PROFILE.blog} target="_blank" rel="noreferrer">Blog</a>
          </div>
          <div>
            <h4>Connect</h4>
            <div className="socials">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email"><MailIcon /></a>
            </div>
            <a href={`mailto:${PROFILE.email}`} className="foot-mail">{PROFILE.email}</a>
          </div>
        </div>
        <div className="copy">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
      </footer>
    </>
  );
}
