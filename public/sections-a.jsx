/* =========================================================================
   sections-a.jsx — Nav, Hero, Intent selector, Menu discovery
   ========================================================================= */
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

/* track helper for analytics (logs; replace with real dispatch on integration) */
function track(evt, detail) {
  try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: evt, ...(detail || {}) }); } catch (e) {}
}

const NAV_LINKS = [
  { label: "Menus", href: "#menus" },
  { label: "How it works", href: "#how" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

function Nav({ onQuote }) {
  const [stuck, setStuck] = useStateA(false);
  useEffectA(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`lae-nav ${stuck ? "is-stuck" : ""}`} aria-label="Primary">
      <div className="lae-nav__inner">
        <a className="lae-brand" href="#top" aria-label="Lille Ælling home">
          <DuckMark size={36} />
          <span>Lille Ælling<small>Catering · Drammen</small></span>
        </a>
        <div className="lae-navlinks">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a className="lae-btn lae-btn--ghost lae-btn--sm" href="tel:+4791586115"
             data-analytics="click_call" onClick={() => track("click_call", { from: "nav" })}>
            <Icon name="phone" size={16} /><span>+47 915 86 115</span>
          </a>
          <Button variant="primary" size="sm" iconRight="arrow" data-analytics="start_quote"
                  onClick={onQuote}>Request quote</Button>
        </div>
      </div>
    </nav>
  );
}

/* ---- Hero ---------------------------------------------------------------- */
function Hero({ onQuote, onMenus }) {
  return (
    <header className="lae-hero" id="top">
      {/* Higgsfield cinematic video background */}
      <div className="lae-hero-video-bg">
        <video autoPlay muted loop playsInline preload="none">
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
              <Chip icon="sparkle" tone="solid">Boutique catering by the river in Drammen</Chip>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display-xl" style={{ marginTop: 20 }}>
                Food worth<br /><span className="accent-word">gathering</span> for.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="lae-lead" style={{ marginBottom: 26 }}>
                Freshly prepared menus for meetings, birthdays, weddings and celebrations —
                made the same day in our Drammen kitchen and delivered, ready to serve, within 40&nbsp;km.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
                <Button variant="primary" size="lg" iconRight="arrow" data-analytics="start_quote"
                        onClick={onQuote}>Request catering quote</Button>
                <Button variant="soft" size="lg" icon="menu" data-analytics="view_menu"
                        onClick={onMenus}>View menus</Button>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                {TRUST_CHIPS.map((c) => <Chip key={c.label} icon={c.icon}>{c.label}</Chip>)}
              </div>
            </Reveal>
          </div>

          {/* collage — real photos */}
          <Reveal delay={120} className="lae-hero__collage-wrap" style={{ position: "relative" }}>
            <div className="lae-collage">
              <RevealTile delay={140} className="c-tall">
                <img className="lae-collage-img" src="/images/snitter.png" alt="Snitter — open-faced sandwiches" />
                <span className="slot-tag">Snitter</span>
              </RevealTile>
              <RevealTile delay={220}>
                <img className="lae-collage-img" src="/images/tapas.png" alt="Tapas & charcuterie board" />
                <span className="slot-tag">Tapas</span>
              </RevealTile>
              <RevealTile delay={300}>
                <img className="lae-collage-img" src="/images/guests.png" alt="Guests enjoying catering" />
                <span className="slot-tag">Your event</span>
              </RevealTile>
            </div>

            {/* floating event card */}
            <Reveal delay={420} className="lae-event-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span className="lae-bestfor">Your event</span>
                <span className="lae-chip lae-chip--solid" style={{ padding: "4px 9px", fontSize: ".72rem" }}>
                  <Icon name="check" size={13} />Confirmed
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.18rem", marginBottom: 8 }}>Team lunch · Koldtbord</div>
              <div className="stack-sm" style={{ fontSize: ".86rem", color: "var(--ink-soft)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="users" size={15} /> 24 guests</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="calendar" size={15} /> Fri · 12:00 delivery</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="pin" size={15} /> Drammen · within 40 km</div>
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="muted" style={{ fontSize: ".8rem" }}>Estimated</span>
                <span className="lae-price">9 096 <small>NOK</small></span>
              </div>
            </Reveal>
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
function IntentSelector({ onTarget }) {
  return (
    <section className="lae-section lae-section--tight" id="plan">
      <div className="lae-wrap">
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
          <Reveal><Eyebrow>What are you planning?</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>Start with the occasion.</h2></Reveal>
          <Reveal delay={140}><p className="lae-lead" style={{ marginTop: 14 }}>
            Tell us the kind of day you're hosting and we'll point you to the right menu — or build something around it.
          </p></Reveal>
        </div>
        <div className="lae-intent-grid">
          {INTENTS.map((it, i) => (
            <Reveal key={it.title} delay={i * 70}>
              <div className="lae-intent" role="button" tabIndex={0}
                   onClick={() => onTarget(it.target)}
                   onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onTarget(it.target); } }}>
                <div className="lae-intent__ico"><Icon name={it.icon} size={24} /></div>
                <h3>{it.title}</h3>
                <p className="muted" style={{ fontSize: ".92rem", flex: 1 }}>{it.copy}</p>
                <span className="lae-intent__cta">{it.cta} <Icon name="arrow" size={16} /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Menu discovery ------------------------------------------------------ */
function MenuSection({ onQuote }) {
  const [filter, setFilter] = useStateA(MENU_FILTERS[0]);
  const items = MENU_ITEMS.filter((m) => m.tags.includes(filter));
  return (
    <section className="lae-section" id="menus">
      <div className="lae-wrap">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-end", marginBottom: 34 }}>
          <div style={{ maxWidth: 560 }}>
            <Reveal><Eyebrow>The menus</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>Menus for every kind of table.</h2></Reveal>
            <Reveal delay={140}><p className="lae-lead" style={{ marginTop: 14 }}>
              From quick møtemat to a full koldtbord — priced clearly, made fresh, and easy to tailor.
            </p></Reveal>
          </div>
          <Reveal delay={120}>
            <Button variant="ghost" iconRight="arrow" data-analytics="view_menu"
                    as="a" href="https://lilleelling.no/collections/catering" target="_blank" rel="noopener"
                    onClick={() => track("view_menu", { from: "menu_header" })}>
              Order online
            </Button>
          </Reveal>
        </div>

        <Reveal>
          <div className="lae-filters" role="tablist" aria-label="Menu categories">
            {MENU_FILTERS.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f}
                      className={`lae-filter ${filter === f ? "is-active" : ""}`}
                      onClick={() => { setFilter(f); track("view_menu", { category: f }); }}>{f}</button>
            ))}
          </div>
        </Reveal>

        <div className="lae-menu-grid" style={{ marginTop: 26 }}>
          {items.map((m, i) => (
            <Reveal key={m.name + filter} delay={(i % 3) * 80}>
              <article className="lae-menu-card">
                <div className="lae-menu-card__media">
                  {window.MENU_PHOTOS && window.MENU_PHOTOS[m.name]
                    ? <img className="lae-menu-card__real-img" src={window.MENU_PHOTOS[m.name]} alt={m.name} />
                    : <div className={`lae-illus lae-illus--${m.tone}`}><FoodGlyph tone={m.tone} /></div>
                  }
                  <span className="slot-tag">{m.no}</span>
                </div>
                <div className="lae-menu-card__body">
                  <div className="lae-bestfor">{m.bestFor}</div>
                  <h3 style={{ fontSize: "1.34rem" }}>{m.name}</h3>
                  <p className="muted" style={{ fontSize: ".92rem" }}>{m.desc}</p>
                  <div className="lae-priceblock">
                    <span className="lae-price">from {m.price}</span>
                    <span className="lae-unit">NOK · {m.unit}</span>
                  </div>
                  <a className="lae-menu-card__cta" href="#quote" data-analytics="view_menu"
                     onClick={(e) => { e.preventDefault(); onQuote(m.name); }}>
                    View details <Icon name="arrow" size={16} />
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
