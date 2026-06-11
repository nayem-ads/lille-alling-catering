/* =========================================================================
   sections-c.jsx — Survey funnel, Lead form, FAQ, Final CTA, Footer
   ========================================================================= */
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

/* ---- Quick survey funnel (after Hero) ------------------------------------ */
const getSurveyOccasions = (lang) => [
  { icon: "💼", label: lang === 'en' ? "Office meeting" : "Møtemat til kontoret", sub: lang === 'en' ? "Lunch, workshop" : "Lunsj, heldag", value: "Office meeting" },
  { icon: "🎂", label: lang === 'en' ? "Birthday / Party" : "Bursdag & privat selskap", sub: lang === 'en' ? "Celebrations" : "Bursdag, fest", value: "Birthday / party" },
  { icon: "💍", label: lang === 'en' ? "Wedding / Confirmation" : "Bryllup & konfirmasjon", sub: lang === 'en' ? "Milestone events" : "Store merkedager", value: "Wedding / confirmation" },
  { icon: "🍷", label: lang === 'en' ? "Casual gathering" : "Uformelt lag", sub: lang === 'en' ? "Tapas, streetfood" : "Tapas, streetfood", value: "Casual gathering" },
];

const GUEST_OPTIONS = ["1–10", "10–25", "25–50", "50–100", "100+"];

const TOTAL_STEPS = 4;

function QuickSurvey({ lang, onQuote }) {
  const [step, setStepS] = useStateC(1);
  const [answers, setAnswers] = useStateC({ occasion: "", guests: "", date: "", name: "", phone: "", email: "" });
  const [sent, setSentS] = useStateC(false);
  const [phoneErr, setPhoneErr] = useStateC("");

  const set = (k, v) => setAnswers((a) => ({ ...a, [k]: v }));
  const progress = `${Math.round((step / TOTAL_STEPS) * 100)}%`;

  const next = () => setStepS((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStepS((s) => Math.max(s - 1, 1));

  const submit = async () => {
    const digits = answers.phone.replace(/\D/g, "");
    if (!digits || digits.length < 8) {
      setPhoneErr(lang === 'en' ? "Please enter a valid phone number (min 8 digits)." : "Vennligst oppgi et gyldig telefonnummer (minst 8 siffer).");
      return;
    }
    setPhoneErr("");
    track("survey_submit", { occasion: answers.occasion, guests: answers.guests });
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, phone: "+47 " + answers.phone }),
      });
    } catch (_) {}
    window.location.href = "/thank-you";
    // pre-fill the main quote form with survey data
    setTimeout(() => {
      const nameEl = document.getElementById("f-name");
      const phoneEl = document.getElementById("f-phone");
      const dateEl = document.getElementById("f-date");
      const typeEl = document.getElementById("f-type");
      const guestsEl = document.getElementById("f-guests");
      if (nameEl) nameEl.value = answers.name;
      if (phoneEl) phoneEl.value = answers.phone;
      if (dateEl && answers.date) dateEl.value = answers.date;
      if (typeEl) typeEl.value = answers.occasion;
      const gNum = answers.guests.replace(/[^\d]/g, "").split("–")[0] || "";
      if (guestsEl) guestsEl.value = gNum;
    }, 200);
  };

  if (sent) {
    return (
      <section className="lae-section lae-section--tight lae-survey-section" id="survey">
        <div className="lae-wrap" style={{ maxWidth: 860 }}>
          <div className="lae-survey">
            <div className="lae-survey__progress"><div className="lae-survey__progress-fill" style={{ width: "100%" }} /></div>
            <div className="lae-survey__body" style={{ textAlign: "center", paddingBlock: "48px" }}>
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: "color-mix(in srgb,var(--accent) 15%,var(--surface))",
                color: "var(--accent)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                <Icon name="check" size={32} />
              </div>
              <h3 className="display-md" style={{ marginBottom: 10 }}>{t("survey_success_title", lang)}</h3>
              <p className="lae-lead" style={{ margin: "0 auto 22px", maxWidth: "42ch" }}>
                {lang === 'en' ? "Thanks" : "Takk"} {answers.name ? answers.name.split(" ")[0] : ""}! {t("survey_success_desc", lang)}
              </p>
              <Button variant="primary" iconRight="arrow" onClick={() => {
                const el = document.getElementById("quote");
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
              }}>{t("survey_success_cta", lang)}</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="lae-section lae-section--tight lae-survey-section" id="survey">
      <div className="lae-wrap" style={{ maxWidth: 860 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Eyebrow align="center">{t("survey_eyebrow", lang)}</Eyebrow>
            <h2 className="display-lg" style={{ marginTop: 14 }}>{t("survey_title", lang)}</h2>
            <p className="lae-lead" style={{ margin: "10px auto 0", maxWidth: "46ch" }}>
              {t("survey_description", lang)}
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="lae-survey">
            <div className="lae-survey__progress">
              <div className="lae-survey__progress-fill" style={{ width: progress }} />
            </div>
            <div className="lae-survey__body">

              {step === 1 && (
                <>
                  <p className="lae-survey__q">{t("survey_q_occasion", lang)}</p>
                  <p className="lae-survey__sub">{t("survey_sub_occasion", lang)}</p>
                  <div className="lae-survey__options">
                    {getSurveyOccasions(lang).map((o) => (
                      <button key={o.value} className={`lae-survey__opt ${answers.occasion === o.value ? "is-selected" : ""}`}
                        onClick={() => { set("occasion", o.value); setTimeout(next, 250); }}>
                        <span className="lae-survey__opt-ico">{o.icon}</span>
                        <strong>{o.label}</strong>
                        <span>{o.sub}</span>
                      </button>
                    ))}
                  </div>
                  <div className="lae-survey__nav">
                    <span className="lae-survey__step">{t("survey_step", lang)} 1 {t("survey_of", lang)} {TOTAL_STEPS}</span>
                    <Button variant="primary" iconRight="arrow" disabled={!answers.occasion} onClick={next}>{t("survey_next", lang)}</Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="lae-survey__q">{t("survey_q_guests", lang)}</p>
                  <p className="lae-survey__sub">{t("survey_sub_guests", lang)}</p>
                  <div className="lae-survey__guests">
                    {GUEST_OPTIONS.map((g) => (
                      <button key={g} className={`lae-survey__guest-opt ${answers.guests === g ? "is-selected" : ""}`}
                        onClick={() => { set("guests", g); setTimeout(next, 250); }}>{g}</button>
                    ))}
                  </div>
                  <div className="lae-survey__nav">
                    <button onClick={back} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", fontFamily: "var(--font-body)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="arrow" size={14} style={{ transform: "rotate(180deg)" }} /> {t("survey_back", lang)}
                    </button>
                    <span className="lae-survey__step">{t("survey_step", lang)} 2 {t("survey_of", lang)} {TOTAL_STEPS}</span>
                    <Button variant="primary" iconRight="arrow" disabled={!answers.guests} onClick={next}>{t("survey_next", lang)}</Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="lae-survey__q">{t("survey_q_date", lang)}</p>
                  <p className="lae-survey__sub">{t("survey_sub_date", lang)}</p>
                  <div style={{ maxWidth: 320 }}>
                    <input className="lae-input" type="date" value={answers.date} onChange={(e) => set("date", e.target.value)}
                      style={{ fontSize: "1.05rem", padding: "14px 16px" }} />
                  </div>
                  <div className="lae-survey__nav">
                    <button onClick={back} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", fontFamily: "var(--font-body)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="arrow" size={14} style={{ transform: "rotate(180deg)" }} /> {t("survey_back", lang)}
                    </button>
                    <span className="lae-survey__step">{t("survey_step", lang)} 3 {t("survey_of", lang)} {TOTAL_STEPS}</span>
                    <Button variant="primary" iconRight="arrow" onClick={next}>{t("survey_next", lang)}</Button>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <p className="lae-survey__q">{t("survey_q_contact", lang)}</p>
                  <p className="lae-survey__sub">{t("survey_sub_contact", lang)}</p>
                  <div className="lae-survey__fields" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <div className="lae-field">
                      <label htmlFor="sv-name">{t("field_name", lang)}</label>
                      <input id="sv-name" className="lae-input" value={answers.name} placeholder={lang === 'en' ? "Your full name" : "Ditt fulle navn"}
                        onChange={(e) => set("name", e.target.value)} style={{ fontSize: "1rem", padding: "13px 14px" }} />
                    </div>
                    <div className="lae-field">
                      <label htmlFor="sv-email">{t("field_email", lang)}</label>
                      <input id="sv-email" className="lae-input" value={answers.email} placeholder="you@email.com"
                        inputMode="email" onChange={(e) => set("email", e.target.value)} style={{ fontSize: "1rem", padding: "13px 14px" }} />
                    </div>
                    <div className="lae-field" style={{ gridColumn: "1 / -1" }}>
                      <label htmlFor="sv-phone">{t("field_phone", lang)} <span className="req">*</span></label>
                      <div style={{ display: "flex" }}>
                        <span style={{ display: "flex", alignItems: "center", padding: "0 14px", background: "var(--surface-2)", border: "1px solid var(--line)", borderRight: "none", borderRadius: "var(--r-sm) 0 0 var(--r-sm)", fontWeight: 700, fontSize: ".92rem", color: "var(--ink-soft)", whiteSpace: "nowrap", userSelect: "none" }}>🇳🇴 +47</span>
                        <input id="sv-phone" className="lae-input" value={answers.phone} placeholder="915 86 115"
                          inputMode="tel" onChange={(e) => { set("phone", e.target.value); setPhoneErr(""); }}
                          style={{ fontSize: "1rem", padding: "13px 14px", borderRadius: "0 var(--r-sm) var(--r-sm) 0", borderLeft: "none" }} />
                      </div>
                      {phoneErr && <span style={{ fontSize: ".8rem", color: "var(--accent)", marginTop: 4 }}>{phoneErr}</span>}
                    </div>
                  </div>
                  <div className="lae-survey__nav" style={{ marginTop: 24 }}>
                    <button onClick={back} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", fontFamily: "var(--font-body)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="arrow" size={14} style={{ transform: "rotate(180deg)" }} /> {t("survey_back", lang)}
                    </button>
                    <span className="lae-survey__step">{t("survey_step", lang)} 4 {t("survey_of", lang)} {TOTAL_STEPS}</span>
                    <Button variant="primary" size="lg" iconRight="arrow" onClick={submit}
                      data-analytics="survey_submit">{t("survey_submit", lang)}</Button>
                  </div>
                  <p className="muted" style={{ fontSize: ".8rem", marginTop: 12 }}>
                    {t("survey_consent", lang)}
                  </p>
                </>
              )}

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { QuickSurvey });

const getEventTypes = (lang) => [
  { value: "Office meeting", label: lang === 'en' ? "Office meeting" : "Møtemat til kontoret" },
  { value: "Birthday / party", label: lang === 'en' ? "Birthday / party" : "Bursdag & privat selskap" },
  { value: "Wedding / confirmation", label: lang === 'en' ? "Wedding / confirmation" : "Bryllup & konfirmasjon" },
  { value: "Casual gathering", label: lang === 'en' ? "Casual gathering" : "Uformelt lag" },
  { value: "Venue + catering", label: lang === 'en' ? "Venue + catering" : "Lokaler + catering" },
  { value: "Other", label: lang === 'en' ? "Other" : "Annet" }
];

const getMenuInterests = (lang) => [
  { value: "Not sure — recommend", label: lang === 'en' ? "Not sure — recommend" : "Usikker – gi meg et forslag" },
  { value: "Snitter", label: lang === 'en' ? "Snitter" : "Snitter" },
  { value: "Koldtbord", label: lang === 'en' ? "Koldtbord" : "Koldtbord" },
  { value: "Tapas", label: lang === 'en' ? "Tapas" : "Tapas" },
  { value: "Møtemeny", label: lang === 'en' ? "Meeting food" : "Møtemeny" },
  { value: "Warm dishes", label: lang === 'en' ? "Warm dishes" : "Varme retter" },
  { value: "Cakes & dessert", label: lang === 'en' ? "Cakes & dessert" : "Kaker & dessert" },
  { value: "Streetfood", label: lang === 'en' ? "Streetfood" : "Streetfood" }
];

function LeadForm({ lang, seed, onSeedConsumed }) {
  const [form, setForm] = useStateC({
    name: "", phone: "", email: "", date: "", guests: "",
    eventType: "", menus: [], fulfil: "Delivery", notes: "", message: "",
  });
  const toggleMenu = (m) => setForm((f) => ({
    ...f,
    menus: f.menus.includes(m) ? f.menus.filter((x) => x !== m) : [...f.menus, m],
  }));
  const [sent, setSent] = useStateC(false);
  const [errors, setErrors] = useStateC({});
  const ref = useRefC(null);

  useEffectC(() => {
    if (!seed) return;
    // map an incoming menu/intent seed to the closest field values
    const isVenue = /venue/i.test(seed);
    const matchedMenu = getMenuInterests(lang).find((m) => seed.toLowerCase().includes(m.value.toLowerCase().split(" ")[0]));
    setForm((f) => ({
      ...f,
      eventType: isVenue ? "Venue + catering" : f.eventType,
      menus: matchedMenu && !f.menus.includes(matchedMenu.value) ? [...f.menus, matchedMenu.value] : f.menus,
      message: f.message || (isVenue ? (lang === 'en' ? "I'm interested in the café venue + catering." : "Jeg er interessert i kafélokaler + catering.") : (lang === 'en' ? `I'm interested in: ${seed}.` : `Jeg er interessert i: ${seed}.`)),
    }));
    track("start_quote", { seed });
    if (ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    onSeedConsumed && onSeedConsumed();
  }, [seed]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = true;
    if (!form.phone.trim() && !form.email.trim()) { err.phone = true; err.email = true; }
    setErrors(err);
    if (Object.keys(err).length) return;
    track("submit_quote", { eventType: form.eventType, guests: form.guests, fulfil: form.fulfil, menus: form.menus.join(", ") });
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, menus: form.menus, source: "quote_form" }),
      });
    } catch (_) {}
    window.location.href = "/thank-you";
  };

  return (
    <section className="lae-section" id="quote" ref={ref}>
      <div className="lae-wrap">
        <div className="lae-form-shell">
          <div>
            <Reveal><Eyebrow>{t("form_eyebrow", lang)}</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("form_title", lang)}</h2></Reveal>
            <Reveal delay={140}><p className="lae-lead" style={{ marginTop: 14 }}>
              {t("form_description", lang)}
            </p></Reveal>
            <Reveal delay={200}>
              <div className="lae-card" style={{ marginTop: 26, padding: "20px 22px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <a href="tel:+4791586115" style={{ display: "flex", alignItems: "center", gap: 12 }}
                     data-analytics="click_call" onClick={() => track("click_call", { from: "form_aside" })}>
                    <span className="lae-fact__ico"><Icon name="phone" size={19} /></span>
                    <span style={{ display: "flex", flexDirection: "column" }}><strong>+47 915 86 115</strong><span className="muted" style={{ fontSize: ".85rem" }}>{t("form_call_lbl", lang)}</span></span>
                  </a>
                  <a href="mailto:post@lilleelling.no" style={{ display: "flex", alignItems: "center", gap: 12 }}
                     data-analytics="click_email" onClick={() => track("click_email", { from: "form_aside" })}>
                    <span className="lae-fact__ico"><Icon name="mail" size={19} /></span>
                    <span style={{ display: "flex", flexDirection: "column" }}><strong>post@lilleelling.no</strong><span className="muted" style={{ fontSize: ".85rem" }}>{t("form_email_lbl", lang)}</span></span>
                  </a>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="lae-fact__ico"><Icon name="pin" size={19} /></span>
                    <span style={{ display: "flex", flexDirection: "column" }}><strong>Losjeplassen 2, 3015 Drammen</strong><span className="muted" style={{ fontSize: ".85rem" }}>{t("form_delivery_lbl", lang)}</span></span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {sent ? (
              <div className="lae-form" style={{ display: "grid", placeItems: "center", textAlign: "center", minHeight: 420, gap: 14 }}>
                <span style={{ width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center", background: "color-mix(in srgb, var(--accent-2) 22%, var(--surface))", color: "var(--accent-2)" }}>
                  <Icon name="check" size={32} />
                </span>
                <h3 className="display-md">{t("form_success_title", lang)}</h3>
                <p className="muted" style={{ maxWidth: "40ch" }}>
                  {t("form_success_desc", lang)} <a className="accent" href="tel:+4791586115">+47 915 86 115</a>.
                </p>
                <Button variant="ghost" onClick={() => { setSent(false); }}>{t("form_success_another", lang)}</Button>
              </div>
            ) : (
              <form className="lae-form" onSubmit={submit} noValidate>
                <div className="lae-field-grid">
                  <div className="lae-field">
                    <label htmlFor="f-name">{t("field_name", lang)} <span className="req">*</span></label>
                    <input id="f-name" className="lae-input" value={form.name} onChange={set("name")}
                           placeholder={lang === 'en' ? "Your name" : "Ditt navn"} style={errors.name ? { borderColor: "var(--accent)" } : null} />
                  </div>
                  <div className="lae-field">
                    <label htmlFor="f-phone">{t("field_phone", lang)} <span className="req">*</span></label>
                    <div style={{ display: "flex" }}>
                      <span style={{ display: "flex", alignItems: "center", padding: "0 12px", background: "var(--surface-2)", border: "1px solid var(--line)", borderRight: "none", borderRadius: "var(--r-sm) 0 0 var(--r-sm)", fontWeight: 700, fontSize: ".88rem", color: "var(--ink-soft)", whiteSpace: "nowrap", userSelect: "none", ...(errors.phone ? { borderColor: "var(--accent)" } : {}) }}>🇳🇴 +47</span>
                      <input id="f-phone" className="lae-input" value={form.phone} onChange={set("phone")}
                             inputMode="tel" placeholder="915 86 115"
                             style={{ borderRadius: "0 var(--r-sm) var(--r-sm) 0", borderLeft: "none", ...(errors.phone ? { borderColor: "var(--accent)" } : {}) }} />
                    </div>
                  </div>
                  <div className="lae-field">
                    <label htmlFor="f-email">{t("field_email", lang)}</label>
                    <input id="f-email" className="lae-input" value={form.email} onChange={set("email")}
                           inputMode="email" placeholder="you@email.com" style={errors.email ? { borderColor: "var(--accent)" } : null} />
                  </div>
                  <div className="lae-field">
                    <label htmlFor="f-date">{t("field_date", lang)}</label>
                    <input id="f-date" className="lae-input" type="date" value={form.date} onChange={set("date")} />
                  </div>
                  <div className="lae-field">
                    <label htmlFor="f-guests">{t("field_guests", lang)}</label>
                    <input id="f-guests" className="lae-input" type="number" min="1" value={form.guests} onChange={set("guests")} placeholder="e.g. 24" />
                  </div>
                  <div className="lae-field">
                    <label htmlFor="f-type">{t("field_type", lang)}</label>
                    <select id="f-type" className="lae-input" value={form.eventType} onChange={set("eventType")}>
                      <option value="" disabled>{t("field_choose", lang)}</option>
                      {getEventTypes(lang).map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div className="lae-field col-2">
                    <label>{t("field_interest", lang)} <span className="muted" style={{ fontWeight: 400 }}>{t("field_interest_sub", lang)}</span></label>
                    <div className="lae-menu-chips">
                      {getMenuInterests(lang).map((m) => (
                        <button type="button" key={m.value} className={`lae-menu-chip ${form.menus.includes(m.value) ? "is-selected" : ""}`}
                          onClick={() => toggleMenu(m.value)}>
                          {form.menus.includes(m.value) && <Icon name="check" size={13} />}{m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="lae-field">
                    <label>{t("field_delivery", lang)}</label>
                    <div className="seg" role="group" aria-label="Fulfilment">
                      {["Delivery", "Pickup"].map((o) => (
                        <button type="button" key={o} className={form.fulfil === o ? "is-on" : ""}
                                onClick={() => setForm((f) => ({ ...f, fulfil: o }))}>
                          {o === 'Delivery' ? (lang === 'en' ? 'Delivery' : 'Levering') : (lang === 'en' ? 'Pickup' : 'Henting')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="lae-field col-2">
                    <label htmlFor="f-notes">{t("field_notes", lang)}</label>
                    <input id="f-notes" className="lae-input" value={form.notes} onChange={set("notes")}
                           placeholder="e.g. 2 gluten-free, 1 vegan" />
                  </div>
                  <div className="lae-field col-2">
                    <label htmlFor="f-msg">{t("field_msg", lang)}</label>
                    <textarea id="f-msg" className="lae-input" value={form.message} onChange={set("message")}
                               placeholder={lang === 'en' ? "Tell us anything else about your event…" : "Fortell oss gjerne mer om dine ønsker…"} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 20 }}>
                  <Button variant="primary" size="lg" type="submit" iconRight="arrow" data-analytics="submit_quote">
                    {t("field_submit", lang)}
                  </Button>
                  <span className="muted" style={{ fontSize: ".88rem" }}>{t("field_footer_note", lang)}</span>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- FAQ ----------------------------------------------------------------- */
function Faq({ lang }) {
  const [open, setOpen] = useStateC(0);
  return (
    <section className="lae-section" id="faq" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}>
      <div className="lae-wrap" style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 30 }}>
          <Reveal><Eyebrow>{t("faq_eyebrow", lang)}</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("faq_title", lang)}</h2></Reveal>
        </div>
        <Reveal>
          <div className="lae-faq">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q.en} className={`lae-faq__item ${isOpen ? "is-open" : ""}`}>
                  <button className="lae-faq__q" aria-expanded={isOpen}
                          onClick={() => { setOpen(isOpen ? -1 : i); if (!isOpen) track("faq_open", { q: f.q[lang] }); }}>
                    <span>{f.q[lang]}</span>
                    <span className="lae-faq__icon"><Icon name="plus" size={18} /></span>
                  </button>
                  <div className="lae-faq__a">
                    <div className="lae-faq__a-inner">{f.a[lang]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Final CTA ----------------------------------------------------------- */
function FinalCTA({ lang, onQuote }) {
  return (
    <section className="lae-section">
      <div className="lae-wrap">
        <Reveal>
          <div className="lae-finalcta">
            <div className="lae-hero__halo" style={{ width: 380, height: 380, top: -120, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", opacity: .25 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <DuckMark size={52} />
              <h2 className="display-lg" style={{ margin: "18px auto 14px", maxWidth: "16ch" }}>
                {t("final_title", lang)}
              </h2>
              <p className="lae-lead" style={{ margin: "0 auto 28px", textAlign: "center" }}>
                {t("final_description", lang)}
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Button variant="primary" size="lg" iconRight="arrow" data-analytics="start_quote" onClick={() => onQuote()}>
                  {t("final_cta", lang)}
                </Button>
                <Button variant="ink" size="lg" icon="phone" as="a" href="tel:+4791586115"
                        data-analytics="click_call" onClick={() => track("click_call", { from: "final" })}>
                  {t("final_call", lang)}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Footer -------------------------------------------------------------- */
function Footer({ lang }) {
  const footerMenus = lang === 'en' 
    ? ["Sandwiches", "Koldtbord", "Tapas", "Meeting Food", "Warm Dishes", "Cakes"]
    : ["Snitter", "Koldtbord", "Tapas", "Møtemat", "Varme retter", "Kaker"];

  return (
    <footer className="lae-footer">
      <div className="lae-wrap">
        <div className="lae-footer__grid">
          <div>
            <div className="lae-brand" style={{ color: "var(--surface)", marginBottom: 14 }}>
              <DuckMark size={36} />
              <span style={{ color: "var(--surface)" }}>Lille Ælling<small style={{ color: "var(--accent)" }}>Catering · Drammen</small></span>
            </div>
            <p style={{ color: "color-mix(in srgb, var(--surface) 70%, transparent)", maxWidth: "34ch", fontSize: ".92rem" }}>
              {t("footer_tagline", lang)}
            </p>
          </div>
          <div>
            <h4>{t("footer_menus", lang)}</h4>
            <div className="lae-footer__links">
              {footerMenus.map((m) => (
                <a key={m} href="#menus">{m}</a>
              ))}
            </div>
          </div>
          <div>
            <h4>{t("footer_visit", lang)}</h4>
            <div className="lae-footer__links">
              <span style={{ color: "color-mix(in srgb, var(--surface) 70%, transparent)" }}>Losjeplassen 2</span>
              <span style={{ color: "color-mix(in srgb, var(--surface) 70%, transparent)" }}>3015 Drammen, Norway</span>
              <a href="tel:+4791586115" data-analytics="click_call">+47 915 86 115</a>
              <a href="mailto:post@lilleelling.no" data-analytics="click_email">post@lilleelling.no</a>
            </div>
          </div>
          <div>
            <h4>{t("footer_follow", lang)}</h4>
            <div className="lae-footer__links">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="https://lilleelling.no/collections/catering" target="_blank" rel="noopener">{lang === 'en' ? "Order online" : "Bestill på nett"}</a>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center",
                      borderTop: "1px solid color-mix(in srgb, var(--surface) 16%, transparent)", marginTop: 40, padding: "22px 0 34px",
                      color: "color-mix(in srgb, var(--surface) 60%, transparent)", fontSize: ".84rem" }}>
          <span>© {new Date().getFullYear()} Lille Ælling Café & Bar. {t("footer_rights", lang)}</span>
          <span>Designed By: Yaser</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LeadForm, Faq, FinalCTA, Footer });
