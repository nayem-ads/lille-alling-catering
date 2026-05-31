/* =========================================================================
   app.jsx — composition, Tweaks wiring, sticky mobile bar, floating quote card
   ========================================================================= */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "Warm Café",
  "accent": "Terracotta",
  "displayFont": "Fraunces",
  "bodyFont": "Manrope",
  "texture": true
}/*EDITMODE-END*/;

/* ---- Desktop floating quote card ----------------------------------------- */
function FloatCard({ onOpen, onSubmit }) {
  const [hidden, setHidden] = useStateApp(true);
  const [dismissed, setDismissed] = useStateApp(false);
  const [v, setV] = useStateApp({ type: "Office meeting", guests: "", date: "" });
  useEffectApp(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const formEl = document.getElementById("quote");
      const formTop = formEl ? formEl.getBoundingClientRect().top + window.scrollY : Infinity;
      // show after hero, hide once the real form is in view
      setHidden(dismissed || y < 620 || (window.scrollY + window.innerHeight) > formTop + 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <aside className={`lae-floatcard ${hidden ? "is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="lae-floatcard__head">
        <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.08rem" }}>Get a menu recommendation</strong>
        <button className="lae-floatcard__close" aria-label="Dismiss" onClick={() => setDismissed(true)}><Icon name="x" size={16} /></button>
      </div>
      <div className="mini">
        <select className="lae-input" value={v.type} onChange={(e) => setV({ ...v, type: e.target.value })} aria-label="Event type">
          {["Office meeting", "Birthday / party", "Wedding / confirmation", "Casual gathering", "Venue + catering"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <div style={{ display: "flex", gap: 9 }}>
          <input className="lae-input" type="number" min="1" placeholder="Guests" value={v.guests}
                 onChange={(e) => setV({ ...v, guests: e.target.value })} aria-label="Guest count" />
          <input className="lae-input" type="date" value={v.date}
                 onChange={(e) => setV({ ...v, date: e.target.value })} aria-label="Event date" />
        </div>
      </div>
      <Button variant="primary" iconRight="arrow" className="lae-btn--md" style={{ width: "100%" }}
              data-analytics="start_quote" onClick={() => onOpen(v.type)}>Get menu recommendation</Button>
    </aside>
  );
}

/* ---- Sticky mobile CTA bar ----------------------------------------------- */
function MobileBar({ onQuote, onMenus }) {
  return (
    <div className="lae-mobilebar" role="region" aria-label="Quick actions">
      <a className="ic" href="tel:+4791586115" aria-label="Call Lille Ælling"
         data-analytics="click_call" onClick={() => track("click_call", { from: "mobilebar" })}>
        <Icon name="phone" size={20} />
      </a>
      <Button variant="primary" className="lae-btn--md" style={{ width: "100%" }} data-analytics="start_quote" onClick={() => onQuote()}>
        Request quote
      </Button>
      <button className="ic" aria-label="View menus" data-analytics="view_menu" onClick={onMenus}>
        <Icon name="menu" size={20} />
      </button>
    </div>
  );
}

/* ---- Root ---------------------------------------------------------------- */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [seed, setSeed] = useStateApp(null);

  // apply theme tokens to :root
  useEffectApp(() => {
    const root = document.documentElement;
    const pal = PALETTES[t.palette] || PALETTES["Warm Café"];
    Object.entries(pal).forEach(([k, val]) => { if (k.startsWith("--")) root.style.setProperty(k, val); });
    root.setAttribute("data-noir", String(!!pal.dark));
    // accent overrides palette accent for independent mixing
    if (ACCENTS[t.accent]) root.style.setProperty("--accent", ACCENTS[t.accent]);
    root.style.setProperty("--font-display", DISPLAY_FONTS[t.displayFont] || DISPLAY_FONTS["Fraunces"]);
    root.style.setProperty("--font-body", BODY_FONTS[t.bodyFont] || BODY_FONTS["Manrope"]);
    root.style.setProperty("--texture", t.texture ? "1" : "0");
  }, [t.palette, t.accent, t.displayFont, t.bodyFont, t.texture]);

  const goQuote = (menuName) => setSeed(menuName || `quote-${Date.now()}`);
  const goMenus = () => {
    const el = document.getElementById("menus");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    track("view_menu", { from: "cta" });
  };
  const goTarget = (target) => {
    if (target === "quote") return goQuote();
    const el = document.getElementById(target === "venue" ? "venue" : "menus");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <Nav onQuote={() => goQuote()} />
      <main>
        <Hero onQuote={() => goQuote()} onMenus={goMenus} />
        <QuickSurvey onQuote={goQuote} />
        <IntentSelector onTarget={goTarget} />
        <MenuSection onQuote={goQuote} />
        <HowItWorks />
        <Customisation onQuote={goQuote} />
        <LocalTrust />
        <Reviews />
        <Venue onQuote={goQuote} />
        <LeadForm seed={seed} onSeedConsumed={() => setSeed(null)} />
        <Faq />
        <FinalCTA onQuote={() => goQuote()} />
      </main>
      <Footer />

      <FloatCard onOpen={(type) => goQuote(type)} />
      <MobileBar onQuote={() => goQuote()} onMenus={goMenus} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio label="Mood" value={t.palette}
          options={["Warm Café", "Sage Garden", "Espresso Noir"]}
          onChange={(v) => setTweak("palette", v)} />
        <TweakColor label="Accent" value={ACCENTS[t.accent]}
          options={Object.values(ACCENTS)}
          onChange={(v) => {
            const name = Object.keys(ACCENTS).find((k) => ACCENTS[k] === v) || "Terracotta";
            setTweak("accent", name);
          }} />
        <TweakSection label="Typography" />
        <TweakRadio label="Display" value={t.displayFont}
          options={["Fraunces", "Playfair", "Cormorant"]}
          onChange={(v) => setTweak("displayFont", v)} />
        <TweakRadio label="Body" value={t.bodyFont}
          options={["Manrope", "Inter"]}
          onChange={(v) => setTweak("bodyFont", v)} />
        <TweakSection label="Finish" />
        <TweakToggle label="Paper texture" value={t.texture}
          onChange={(v) => setTweak("texture", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
