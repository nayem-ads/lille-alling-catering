/* =========================================================================
   app.jsx — composition, Tweaks wiring, sticky mobile bar, floating quote card
   ========================================================================= */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "Coffee & Cream",
  "accent": "Caramel",
  "displayFont": "Fraunces",
  "bodyFont": "Manrope",
  "texture": true
}/*EDITMODE-END*/;

/* ---- Desktop floating quote card ----------------------------------------- */
function FloatCard({ lang, onOpen, onSubmit }) {
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
        <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.02rem" }}>
          {t("float_title", lang)}
        </strong>
        <button className="lae-floatcard__close" aria-label="Dismiss" onClick={() => setDismissed(true)}><Icon name="x" size={16} /></button>
      </div>
      <div className="mini">
        <select className="lae-input" value={v.type} onChange={(e) => setV({ ...v, type: e.target.value })} aria-label="Event type">
          {["Office meeting", "Birthday / party", "Wedding / confirmation", "Casual gathering", "Venue + catering"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <div style={{ display: "flex", gap: 9 }}>
          <input className="lae-input" type="number" min="1" placeholder={t("field_guests", lang)} value={v.guests}
                 onChange={(e) => setV({ ...v, guests: e.target.value })} aria-label="Guest count" />
          <input className="lae-input" type="date" value={v.date}
                 onChange={(e) => setV({ ...v, date: e.target.value })} aria-label="Event date" />
        </div>
      </div>
      <Button variant="primary" className="lae-btn--md" style={{ width: "100%" }}
              data-analytics="start_quote" onClick={() => onOpen(v.type)}>
        {lang === 'en' ? "Send →" : "Send →"}
      </Button>
    </aside>
  );
}

/* ---- Sticky mobile CTA bar ----------------------------------------------- */
function MobileBar({ lang, onQuote, onMenus }) {
  return (
    <div className="lae-mobilebar" role="region" aria-label="Quick actions">
      <a className="ic" href="tel:+4791586115" aria-label="Call Lille Ælling"
         data-analytics="click_call" onClick={() => track("click_call", { from: "mobilebar" })}>
        <Icon name="phone" size={20} />
      </a>
      <Button variant="primary" className="lae-btn--md" style={{ width: "100%" }} data-analytics="start_quote" onClick={() => onQuote()}>
        {t("nav_request_quote", lang)}
      </Button>
      <button className="ic" aria-label="View menus" data-analytics="view_menu" onClick={onMenus}>
        <Icon name="menu" size={20} />
      </button>
    </div>
  );
}

/* ---- Root ---------------------------------------------------------------- */
function App() {
  const [tweak, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [seed, setSeed] = useStateApp(null);
  const [lang, setLangState] = useStateApp(() => {
    try {
      return localStorage.getItem("lae_lang") || "no";
    } catch (_) {
      return "no";
    }
  });

  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem("lae_lang", l);
    } catch (_) {}
  };
  const [surveyData, setSurveyData] = useStateApp(null);

  const handleSurveyComplete = (answers) => {
    setSurveyData(answers);
    const el = document.getElementById("quote");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // apply theme tokens to :root
  useEffectApp(() => {
    const root = document.documentElement;
    const pal = PALETTES[tweak.palette] || PALETTES["Coffee & Cream"];
    Object.entries(pal).forEach(([k, val]) => { if (k.startsWith("--")) root.style.setProperty(k, val); });
    root.setAttribute("data-noir", String(!!pal.dark));
    // accent overrides palette accent for independent mixing
    if (ACCENTS[tweak.accent]) root.style.setProperty("--accent", ACCENTS[tweak.accent]);
    root.style.setProperty("--font-display", DISPLAY_FONTS[tweak.displayFont] || DISPLAY_FONTS["Fraunces"]);
    root.style.setProperty("--font-body", BODY_FONTS[tweak.bodyFont] || BODY_FONTS["Manrope"]);
    root.style.setProperty("--texture", tweak.texture ? "1" : "0");
  }, [tweak.palette, tweak.accent, tweak.displayFont, tweak.bodyFont, tweak.texture]);

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
      <Nav lang={lang} setLang={setLang} onQuote={() => goQuote()} />
      <main>
        <Hero lang={lang} onQuote={() => goQuote()} onMenus={goMenus} />
        <QuickSurvey lang={lang} onQuote={goQuote} onComplete={handleSurveyComplete} />
        <IntentSelector lang={lang} onTarget={goTarget} />
        <MenuSection lang={lang} onQuote={goQuote} />
        <HowItWorks lang={lang} />
        <Customisation lang={lang} onQuote={goQuote} />
        <LocalTrust lang={lang} />
        <Reviews lang={lang} />
        <Venue lang={lang} onQuote={goQuote} />
        <LeadForm lang={lang} seed={seed} onSeedConsumed={() => setSeed(null)} surveyData={surveyData} />
        <Faq lang={lang} />
        <FinalCTA lang={lang} onQuote={() => goQuote()} />
      </main>
      <Footer lang={lang} />

      <MobileBar lang={lang} onQuote={() => goQuote()} onMenus={goMenus} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio label="Mood" value={tweak.palette}
          options={["Coffee & Cream", "Espresso Noir"]}
          onChange={(v) => setTweak("palette", v)} />
        <TweakColor label="Accent" value={ACCENTS[tweak.accent]}
          options={Object.values(ACCENTS)}
          onChange={(v) => {
            const name = Object.keys(ACCENTS).find((k) => ACCENTS[k] === v) || "Caramel";
            setTweak("accent", name);
          }} />
        <TweakSection label="Typography" />
        <TweakRadio label="Display" value={tweak.displayFont}
          options={["Fraunces", "Playfair", "Cormorant"]}
          onChange={(v) => setTweak("displayFont", v)} />
        <TweakRadio label="Body" value={tweak.bodyFont}
          options={["Manrope", "Inter"]}
          onChange={(v) => setTweak("bodyFont", v)} />
        <TweakSection label="Finish" />
        <TweakToggle label="Paper texture" value={tweak.texture}
          onChange={(v) => setTweak("texture", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
