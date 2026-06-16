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
                <DuckMark size={48} />
                <span style={{ background: "var(--ink)", color: "var(--surface)", fontSize: ".74rem", fontWeight: 700, padding: "5px 11px", borderRadius: 100, whiteSpace: "nowrap" }}>{t("local_tag", lang)}</span>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal><Eyebrow>{t("local_eyebrow", lang)}</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("local_title", lang)}</h2></Reveal>
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
            <div className="lae-chip lae-chip--solid" style={{ padding: "10px 16px", fontSize: ".9rem" }}>
              <span style={{ display: "flex", gap: 2, color: "var(--butter)" }}>
                {[0,1,2,3,4].map((i) => <Icon key={i} name="star" size={15} />)}
              </span>
              {t("reviews_chip", lang)}
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
        <div style={{ textAlign: "center", marginTop: 28, fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
          ★★★★★ {lang === 'en' ? 'Based on 47+ orders' : 'Basert på 47+ bestillinger'}
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
