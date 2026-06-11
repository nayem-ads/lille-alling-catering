/* =========================================================================
   sections-a.jsx — Nav, Hero, Intent selector, Menu discovery
   ========================================================================= */
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

/* track helper for analytics (logs; replace with real dispatch on integration) */
function track(evt, detail) {
  try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: evt, ...(detail || {}) }); } catch (e) {}
}

const getNavLinks = (lang) => [
  { label: t("nav_menus", lang), href: "#menus" },
  { label: t("nav_how", lang), href: "#how" },
  { label: t("nav_reviews", lang), href: "#reviews" },
  { label: t("nav_faq", lang), href: "#faq" },
];

function Nav({ lang, setLang, onQuote }) {
  const [stuck, setStuck] = useStateA(false);
  const [menuOpen, setMenuOpen] = useStateA(false);
  useEffectA(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffectA(() => {
    if (!menuOpen) return;
    const close = (e) => { if (!e.target.closest(".lae-nav")) setMenuOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);
  return (
    <nav className={`lae-nav ${stuck ? "is-stuck" : ""}`} aria-label="Primary">
      <div className="lae-nav__inner">
        <a className="lae-brand" href="#top" aria-label="Lille Ælling home">
          <DuckMark size={26} />
          <span className="lae-brand-sub">Catering · Drammen</span>
        </a>
        <div className="lae-navlinks">
          {getNavLinks(lang).map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <div className="lae-nav__actions">
          <div className="lae-lang-toggle">
            <button className={`lae-lang-btn ${lang === 'no' ? 'is-active' : ''}`} onClick={() => setLang('no')}>NO</button>
            <button className={`lae-lang-btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="lae-btn lae-btn--ghost lae-btn--sm lae-nav__call" href="tel:+4791586115"
             data-analytics="click_call" onClick={() => track("click_call", { from: "nav" })}>
            <Icon name="phone" size={16} /><span>+47 915 86 115</span>
          </a>
          <Button variant="primary" size="sm" iconRight="arrow" data-analytics="start_quote"
                  className="lae-nav__quote-btn" onClick={onQuote}>{t("nav_request_quote", lang)}</Button>
          <button className="lae-nav__burger" aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
            <Icon name={menuOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lae-nav__mobile-menu">
          {getNavLinks(lang).map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <div className="lae-nav__mobile-ctas">
            <div className="lae-lang-toggle" style={{ alignSelf: "center", marginBottom: 6 }}>
              <button className={`lae-lang-btn ${lang === 'no' ? 'is-active' : ''}`} onClick={() => { setLang('no'); setMenuOpen(false); }}>NO</button>
              <button className={`lae-lang-btn ${lang === 'en' ? 'is-active' : ''}`} onClick={() => { setLang('en'); setMenuOpen(false); }}>EN</button>
            </div>
            <a className="lae-btn lae-btn--ghost" href="tel:+4791586115" onClick={() => setMenuOpen(false)}>
              <Icon name="phone" size={16} /><span>+47 915 86 115</span>
            </a>
            <Button variant="primary" iconRight="arrow"
                    onClick={() => { setMenuOpen(false); onQuote(); }}>
              {t("nav_request_quote", lang)}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---- Hero ---------------------------------------------------------------- */
function Hero({ lang, onQuote, onMenus }) {
  return (
    <header className="lae-hero" id="top">
      {/* Higgsfield cinematic video background */}
      <div className="lae-hero-video-bg">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="lae-hero__halo" style={{ width: 520, height: 520, top: -120, right: -80, background: "var(--accent)" }} />
      <div className="lae-hero__halo" style={{ width: 420, height: 420, bottom: -160, left: -120, background: "var(--accent-2)", opacity: .35 }} />
      <div className="lae-wrap">
        <div className="lae-hero__grid">
          {/* copy */}
          <div>
            <Reveal>
              <Chip icon="sparkle" tone="solid">{t("hero_tagline", lang)}</Chip>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display-xl" style={{ marginTop: 20 }}>
                {t("hero_title_1", lang)}<br /><span className="accent-word">{t("hero_title_2", lang)}</span>{t("hero_title_3", lang)}
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="lae-lead" style={{ marginBottom: 26 }}>
                {t("hero_description", lang)}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
                <Button variant="primary" size="lg" iconRight="arrow" data-analytics="start_quote"
                        onClick={onQuote}>{t("hero_cta", lang)}</Button>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                {TRUST_CHIPS.map((c) => <Chip key={c.label.en} icon={c.icon}>{c.label[lang]}</Chip>)}
              </div>
            </Reveal>
          </div>

          {/* collage — real photos */}
          <Reveal delay={120} className="lae-hero__collage-wrap" style={{ position: "relative" }}>
            <div className="lae-collage">
              <RevealTile delay={140}>
                <img className="lae-collage-img" src="/images/snitter.webp" alt="Snitter — open-faced sandwiches" />
                <span className="slot-tag">{lang === 'en' ? 'Sandwiches' : 'Snitter'}</span>
              </RevealTile>
              <RevealTile delay={200}>
                <img className="lae-collage-img" src="/images/carrot-cake.webp" alt="Pastries & Cakes" />
                <span className="slot-tag">{lang === 'en' ? 'Pastries' : 'Kaker'}</span>
              </RevealTile>
              <RevealTile delay={260}>
                <img className="lae-collage-img" src="/images/tapas.webp" alt="Tapas & charcuterie board" />
                <span className="slot-tag">Tapas</span>
              </RevealTile>
              <RevealTile delay={320}>
                <img className="lae-collage-img" src="/images/guests.webp" alt="Guests enjoying catering" />
                <span className="slot-tag">{lang === 'en' ? 'Your Event' : 'Ditt selskap'}</span>
              </RevealTile>
            </div>

          </Reveal>
        </div>
      </div>
    </header>
  );
}

/* tile wrapper that keeps slot tag positioned + reveals */
function RevealTile({ children, delay, className = "" }) {
  return (
    <Reveal delay={delay} className={className} style={{ position: "relative", borderRadius: "var(--r-md)", overflow: "hidden" }}>
      {children}
    </Reveal>
  );
}

/* ---- Intent selector ----------------------------------------------------- */
function IntentSelector({ lang, onTarget }) {
  return (
    <section className="lae-section lae-section--tight" id="plan">
      <div className="lae-wrap">
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
          <Reveal><Eyebrow>{t("intent_eyebrow", lang)}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("intent_title", lang)}</h2></Reveal>
          <Reveal delay={140}><p className="lae-lead" style={{ marginTop: 14 }}>
            {t("intent_description", lang)}
          </p></Reveal>
        </div>
        <div className="lae-intent-grid">
          {INTENTS.map((it, i) => (
            <Reveal key={it.title.en} delay={i * 70}>
              <div className="lae-intent" role="button" tabIndex={0}
                   onClick={() => onTarget(it.target)}
                   onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTarget(it.target); } }}>
                <div className="lae-intent__ico"><Icon name={it.icon} size={24} /></div>
                <h3>{it.title[lang]}</h3>
                <p className="muted" style={{ fontSize: ".92rem", flex: 1 }}>{it.copy[lang]}</p>
                <span className="lae-intent__cta">{it.cta[lang]} <Icon name="arrow" size={16} /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Menu discovery ------------------------------------------------------ */
function MenuSection({ lang, onQuote }) {
  const [filter, setFilter] = useStateA(MENU_FILTERS[0].id);
  const items = MENU_ITEMS.filter((m) => m.tags.includes(filter));
  return (
    <section className="lae-section" id="menus">
      <div className="lae-wrap">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-end", marginBottom: 34 }}>
          <div style={{ maxWidth: 560 }}>
            <Reveal><Eyebrow>{t("menu_eyebrow", lang)}</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("menu_title", lang)}</h2></Reveal>
            <Reveal delay={140}><p className="lae-lead" style={{ marginTop: 14 }}>
              {t("menu_description", lang)}
            </p></Reveal>
          </div>
          <Reveal delay={120}>
            <Button variant="ghost" iconRight="arrow" data-analytics="view_menu"
                    as="a" href="https://lilleelling.no/collections/catering" target="_blank" rel="noopener"
                    onClick={() => track("view_menu", { from: "menu_header" })}>
              {t("menu_order_online", lang)}
            </Button>
          </Reveal>
        </div>

        <Reveal>
          <div className="lae-filters" role="tablist" aria-label="Menu categories">
            {MENU_FILTERS.map((f) => (
              <button key={f.id} role="tab" aria-selected={filter === f.id}
                      className={`lae-filter ${filter === f.id ? "is-active" : ""}`}
                      onClick={() => { setFilter(f.id); track("view_menu", { category: f.id }); }}>{f[lang]}</button>
            ))}
          </div>
        </Reveal>

        <div className="lae-menu-grid" style={{ marginTop: 26 }}>
          {items.map((m, i) => (
            <Reveal key={m.name.en + filter} delay={(i % 3) * 80}>
              <article className="lae-menu-card">
                <div className="lae-menu-card__media">
                  {window.MENU_PHOTOS && window.MENU_PHOTOS[m.name.en]
                    ? <img className="lae-menu-card__real-img" src={window.MENU_PHOTOS[m.name.en]} alt={m.name[lang]} loading="lazy" />
                    : <div className={`lae-illus lae-illus--${m.tone}`}><FoodGlyph tone={m.tone} /></div>
                  }
                  <span className="slot-tag">{m.no[lang]}</span>
                </div>
                <div className="lae-menu-card__body">
                  <div className="lae-bestfor">{t("menu_best_for", lang)}{m.bestFor[lang]}</div>
                  <h3 style={{ fontSize: "1.34rem" }}>{m.name[lang]}</h3>
                  <p className="muted" style={{ fontSize: ".92rem" }}>{m.desc[lang]}</p>
                  <div className="lae-priceblock">
                    <span className="lae-price">{t("menu_from", lang)} {m.price}</span>
                    <span className="lae-unit">{t("menu_nok", lang)} · {m.unit[lang]}</span>
                  </div>
                  <a className="lae-menu-card__cta" href="#quote" data-analytics="view_menu"
                     onClick={(e) => { e.preventDefault(); onQuote(m.name.en); }}>
                    {t("menu_view_details", lang)} <Icon name="arrow" size={16} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* decorative in-brand food glyph (no stock imagery) */
function FoodGlyph({ tone }) {
  const c = "var(--ink)";
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7" aria-hidden="true">
      <circle cx="42" cy="42" r="26" />
      <circle cx="42" cy="42" r="17" strokeDasharray="2 4" />
      <path d="M30 42c3-6 21-6 24 0" />
      <path d="M42 25v34" opacity="0.5" />
    </svg>
  );
}

Object.assign(window, { Nav, Hero, IntentSelector, MenuSection, track });
