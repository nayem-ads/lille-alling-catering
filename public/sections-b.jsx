/* =========================================================================
   sections-b.jsx — How it works, Customisation, Local/delivery, Reviews, Venue
   ========================================================================= */

function HowItWorks({ lang }) {
  return (
    <section className="lae-section" id="how" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="lae-wrap">
        <div style={{ maxWidth: 620, marginBottom: 46 }}>
          <Reveal><Eyebrow>{t("how_eyebrow", lang)}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("how_title", lang)}</h2></Reveal>
          <Reveal delay={140}><p className="lae-lead" style={{ marginTop: 14 }}>
            {t("how_description", lang)}
          </p></Reveal>
        </div>
        <div className="lae-timeline">
          <div className="lae-tl-line" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="lae-step">
                <span className="lae-step__dot" />
                <div className="lae-step__n">{s.n}</div>
                <h3>{s.title[lang]}</h3>
                <p className="muted" style={{ fontSize: ".94rem" }}>{s.copy[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Customisation / allergy reassurance --------------------------------- */
function Customisation({ lang, onQuote }) {
  return (
    <section className="lae-section lae-section--tight" id="custom" style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
      <div className="lae-wrap" style={{ textAlign: "center", maxWidth: 800 }}>
        <Reveal>
          <h2 className="display-md" style={{ marginBottom: 10 }}>
            {lang === 'en' ? 'Tailored to all guests' : 'Tilpasset alle gjester'}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="lae-lead" style={{ fontSize: "1.05rem", margin: 0 }}>
            {lang === 'en' 
              ? 'Gluten-free · Lactose-free · Vegetarian · Vegan · Nut-free — just let us know in your request.' 
              : 'Glutenfritt · Laktosefritt · Vegetar · Vegan · Nøttefritt — bare gi beskjed i bestillingen.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Local trust / delivery radius --------------------------------------- */
function LocalTrust({ lang }) {
  const rings = [88, 64, 40];
  return (
    <section className="lae-section" id="local" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="lae-wrap">
        <div className="lae-local-grid">
          <Reveal>
            <div className="lae-radius">
              {rings.map((r, i) => (
                <span key={r} className="ring" style={{ width: `${r}%`, height: `${r}%`, opacity: 0.35 + i * 0.22 }} />
              ))}
              <span className="ring" style={{ width: "88%", height: "88%", border: "1.5px solid color-mix(in srgb, var(--accent) 30%, transparent)" }} />
              <div style={{ position: "absolute", left: "50%", top: "10%", transform: "translateX(-50%)", fontSize: ".74rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent)" }}>{t("local_radius", lang)}</div>
              <div className="pin" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: "10px 14px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <DuckMark size={28} />
                </div>
                <span style={{ background: "var(--ink)", color: "var(--surface)", fontSize: ".74rem", fontWeight: 700, padding: "5px 11px", borderRadius: 100, whiteSpace: "nowrap" }}>{t("local_tag", lang)}</span>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal><Eyebrow>{t("local_eyebrow", lang)}</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("local_title", lang)}</h2></Reveal>
            <Reveal delay={140}>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 4 }}>
                {LOCAL_FACTS.map((f) => (
                  <div key={f.title.en} className="lae-fact">
                    <div className="lae-fact__ico">
                      <Icon name={f.icon} size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.02rem", fontWeight: 650, margin: 0 }}>{f.title[lang]}</h4>
                      <p style={{ margin: "2px 0 0", fontSize: "0.9rem", color: "var(--ink-soft)" }}>{f.copy[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Reviews ------------------------------------------------------------- */
function Reviews({ lang }) {
  return (
    <section className="lae-section" id="reviews">
      <div className="lae-wrap">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between", alignItems: "flex-end", marginBottom: 38 }}>
          <div style={{ maxWidth: 540 }}>
            <Reveal><Eyebrow>{t("reviews_eyebrow", lang)}</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("reviews_title", lang)}</h2></Reveal>
          </div>
          <Reveal delay={120}>
            <div className="lae-chip lae-chip--solid" style={{ padding: "8px 14px", fontSize: ".88rem", display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", color: "#1a1a1a", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", borderRadius: "100px" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <strong style={{ color: "#1a1a1a", fontWeight: 700 }}>4.9</strong>
              <span style={{ display: "inline-flex", gap: 1.5, color: "#FBBC05" }}>
                {[0,1,2,3,4].map((i) => <Icon key={i} name="star" size={13} />)}
              </span>
              <span style={{ color: "#5f6368", fontSize: ".8rem" }}>
                ({lang === 'en' ? 'Google reviews' : 'Google-anmeldelser'})
              </span>
            </div>
          </Reveal>
        </div>
        <div className="lae-reviews">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <figure className="lae-review">
                <div className="lae-review__stars">{[0,1,2,3,4].map((s) => <Icon key={s} name="star" size={17} />)}</div>
                <blockquote>“{r.quote[lang]}”</blockquote>
                <figcaption className="lae-review__who">
                  <span className="lae-review__av">{r.name.charAt(0)}</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <strong style={{ fontSize: ".96rem" }}>{r.name}</strong>
                    <span className="muted" style={{ fontSize: ".84rem" }}>{r.context[lang]}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 28, fontSize: "1.05rem", fontWeight: 700, color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ color: "#FBBC05" }}>★★★★★</span>
          <span>4.9 / 5</span>
          <span style={{ color: "var(--line)", fontWeight: 300 }} className="hide-on-mobile">|</span>
          <span>{lang === 'en' ? 'Based on 47+ Google reviews' : 'Basert på 47+ Google-anmeldelser'}</span>
        </div>
      </div>
    </section>
  );
}

/* ---- Venue upsell -------------------------------------------------------- */
function Venue({ lang, onQuote }) {
  return (
    <section className="lae-section" id="venue">
      <div className="lae-wrap">
        <Reveal>
          <div className="lae-venue">
            <div className="lae-venue__grid">
              <div className="lae-venue__body">
                <Eyebrow>{t("venue_eyebrow", lang)}</Eyebrow>
                <h2 className="display-lg" style={{ marginTop: 4 }}>{t("venue_title", lang)}</h2>
              </div>
              <div className="lae-venue__media" style={{ position: "relative" }}>
                <img src="/images/venue.webp" alt="Lille Ælling café interior — event space" style={{ width: "100%", height: "100%", minHeight: "280px", objectFit: "cover", display: "block" }} loading="lazy" />
                <span className="slot-tag">Losjeplassen 2</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { HowItWorks, Customisation, LocalTrust, Reviews, Venue });
