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
    <section className="lae-section" id="custom">
      <div className="lae-wrap">
        <div className="lae-split">
          <div>
            <Reveal><Eyebrow>{t("cust_eyebrow", lang)}</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg" style={{ marginTop: 16 }}>
                {t("cust_title", lang)}<span className="serif-italic accent">{t("cust_title_italic", lang)}</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="lae-lead" style={{ marginTop: 16 }}>
                {t("cust_description", lang)}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="lae-checklist">
                {DIETARY.map((d) => (
                  <li key={d.en}><span className="tick"><Icon name="check" size={16} /></span>{d[lang]}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button variant="primary" iconRight="arrow" data-analytics="start_quote" onClick={() => onQuote()}>
                  {t("cust_cta", lang)}
                </Button>
                <Button variant="ghost" icon="phone" as="a" href="tel:+4791586115"
                        data-analytics="click_call" onClick={() => track("click_call", { from: "custom" })}>
                  {t("cust_talk", lang)}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", aspectRatio: "4/5", border: "1px solid var(--line)" }}>
              <img src="/images/lunchbox.webp" alt="Tailored lunch box catering" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              <span className="slot-tag">{t("cust_tag", lang)}</span>
            </div>
            <div className="lae-card floaty" style={{ position: "absolute", right: -16, top: 28, padding: "14px 16px", width: 210 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span className="tick" style={{ width: 26, height: 26, flex: "none", background: "color-mix(in srgb, var(--butter) 30%, var(--surface))", color: "#7a5a16", borderRadius: "50%", display: "grid", placeItems: "center" }}>
                  <Icon name="leaf" size={15} />
                </span>
                <strong style={{ fontSize: ".9rem", whiteSpace: "nowrap" }}>{t("cust_allergy_title", lang)}</strong>
              </div>
              <p className="muted" style={{ fontSize: ".82rem" }}>{t("cust_allergy_bubble", lang)}</p>
            </div>
          </Reveal>
        </div>
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
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16, marginBottom: 8 }}>{t("local_title", lang)}</h2></Reveal>
            <Reveal delay={140}><p className="lae-lead" style={{ marginBottom: 10 }}>
              {t("local_description", lang)}
            </p></Reveal>
            <Reveal delay={200}>
              <div style={{ marginTop: 14 }}>
                {LOCAL_FACTS.map((f) => (
                  <div key={f.title.en} className="lae-fact">
                    <span className="lae-fact__ico"><Icon name={f.icon} size={20} /></span>
                    <div>
                      <strong style={{ display: "block", fontSize: "1rem" }}>{f.title[lang]}</strong>
                      <span className="muted" style={{ fontSize: ".9rem" }}>{f.copy[lang]}</span>
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
                <p className="lae-lead" style={{ color: "color-mix(in srgb, var(--surface) 80%, transparent)", maxWidth: "46ch" }}>
                  {t("venue_description", lang)}
                </p>
                <div className="lae-venue__stats">
                  <div className="lae-venue__stat"><b>{t("venue_stat_seated_n", lang)}</b><span>{t("venue_stat_seated_txt", lang)}</span></div>
                  <div className="lae-venue__stat"><b>{t("venue_stat_standing_n", lang)}</b><span>{t("venue_stat_standing_txt", lang)}</span></div>
                  <div className="lae-venue__stat"><b>{t("venue_stat_price_n", lang)}</b><span>{t("venue_stat_price_txt", lang)}</span></div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                  <Button variant="butter" iconRight="arrow" data-analytics="venue_interest" onClick={() => onQuote("Venue + catering")}>
                    {t("venue_cta", lang)}
                  </Button>
                  <Button variant="ghost" icon="phone" as="a" href="tel:+4791586115"
                          style={{ color: "var(--surface)", borderColor: "color-mix(in srgb, var(--surface) 30%, transparent)" }}
                          data-analytics="click_call" onClick={() => track("click_call", { from: "venue" })}>
                    {t("venue_call", lang)}
                  </Button>
                </div>
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
