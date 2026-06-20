/* =========================================================================
   sections-c.jsx — Survey funnel, Lead form, FAQ, Final CTA, Footer
   ========================================================================= */
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

/* ---- Quick survey funnel (after Hero) ------------------------------------ */
const getSurveyOccasions = (lang) => [
  { icon: "🏢", label: lang === 'en' ? "Office meeting" : "Møtemat", sub: lang === 'en' ? "Lunch, workshop" : "Lunsj, heldag", value: "Office meeting" },
  { icon: "🎂", label: lang === 'en' ? "Birthday & fest" : "Bursdag & fest", sub: lang === 'en' ? "Celebrations" : "Bursdag, fest", value: "Birthday / party" },
  { icon: "💍", label: lang === 'en' ? "Wedding & confirmation" : "Bryllup & konfirmasjon", sub: lang === 'en' ? "Milestone events" : "Store merkedager", value: "Wedding / confirmation" },
  { icon: "🎉", label: lang === 'en' ? "Casual gathering" : "Uformelt selskap", sub: lang === 'en' ? "Tapas, streetfood" : "Tapas, streetfood", value: "Casual gathering" },
];

const GUEST_OPTIONS = ["1–10", "10–25", "25–50", "50–100", "100+"];

const TOTAL_STEPS = 4;

const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const sessionId = 'sess_' + Math.random().toString(36).substring(2, 11);

function QuickSurvey({ lang, onQuote, onComplete }) {
  const [step, setStepS] = useStateC(1);
  const [answers, setAnswers] = useStateC({ occasion: "", guests: "", date: getTodayDateString(), name: "", phone: "+47 ", address: "", message: "" });
  const [phoneErr, setPhoneErr] = useStateC("");
  const [nameErr, setNameErr] = useStateC("");
  const [addressErr, setAddressErr] = useStateC("");
  const surveyDateRef = useRefC(null);

  const set = (k, v) => setAnswers((a) => ({ ...a, [k]: v }));
  const progress = `${Math.round((step / TOTAL_STEPS) * 100)}%`;

  const next = () => setStepS((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStepS((s) => Math.max(s - 1, 1));

  const sendSurveyPartialLead = async (currentAnswers) => {
    const digits = currentAnswers.phone.replace(/\D/g, "");
    if (digits.length >= 8) {
      const payload = {
        name: currentAnswers.name,
        phone: currentAnswers.phone,
        email: "",
        address: currentAnswers.address,
        date: currentAnswers.date || getTodayDateString(),
        guests: currentAnswers.guests,
        eventType: currentAnswers.occasion,
        menus: [],
        fulfil: "Delivery",
        notes: "",
        message: currentAnswers.message,
        source: "survey_funnel_auto_capture",
        sessionId,
        partial: true
      };
      try {
        await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch (_) {}
    }
  };

  const submit = async () => {
    let hasErr = false;

    if (!answers.name.trim()) {
      setNameErr(lang === 'en' ? "Please enter your name." : "Vennligst oppgi navn.");
      hasErr = true;
    } else {
      setNameErr("");
    }

    if (!answers.address.trim()) {
      setAddressErr(lang === 'en' ? "Please enter your delivery address." : "Vennligst oppgi leveringsadresse.");
      hasErr = true;
    } else {
      setAddressErr("");
    }

    const digits = answers.phone.replace(/\D/g, "");
    if (!digits || digits.length < 8) {
      setPhoneErr(lang === 'en' ? "Please enter a valid phone number (min 8 digits)." : "Vennligst oppgi et gyldig telefonnummer (minst 8 siffer).");
      hasErr = true;
    } else {
      setPhoneErr("");
    }

    if (hasErr) return;

    track("survey_submit", { occasion: answers.occasion, guests: answers.guests });

    const payload = {
      name: answers.name,
      phone: answers.phone,
      email: "",
      address: answers.address,
      date: answers.date || getTodayDateString(),
      guests: answers.guests,
      eventType: answers.occasion,
      menus: [],
      fulfil: "Delivery",
      notes: "",
      message: answers.message,
      source: "survey_funnel",
      sessionId,
      partial: false
    };

    track("submit_quote", { eventType: payload.eventType, guests: payload.guests, fulfil: payload.fulfil, menus: "" });

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {}

    // Fire Meta Pixel lead event
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    } else if (typeof fbq === "function") {
      fbq("track", "Lead");
    }

    window.location.href = "/thank-you";
  };

  return (
    <section className="lae-section lae-section--tight lae-survey-section" id="survey">
      <div className="lae-wrap" style={{ maxWidth: 860 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 className="display-lg" style={{ marginTop: 0, marginBottom: 8 }}>{t("survey_title", lang)}</h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--accent)", color: "#fff", padding: "4px 10px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>
              <Icon name="clock" size={13} stroke={2.2} />
              <span>{t("survey_eyebrow", lang)}</span>
            </div>
            <p className="lae-lead" style={{ margin: "4px auto 0", maxWidth: "46ch", fontSize: "0.96rem", lineHeight: "1.45" }}>
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
                  <div style={{ position: "relative", maxWidth: 320 }}>
                    <input ref={surveyDateRef} className="lae-input" type="date" value={answers.date} onChange={(e) => set("date", e.target.value)}
                      onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }}
                      style={{ fontSize: "1.05rem", padding: "14px 16px", paddingRight: "44px" }} />
                    <span onClick={() => { if (surveyDateRef.current) { try { surveyDateRef.current.showPicker(); } catch (_) { surveyDateRef.current.focus(); } } }}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--accent)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                      <Icon name="calendar" size={20} />
                    </span>
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
                      <label htmlFor="sv-name">{t("field_name", lang)} <span className="req">*</span></label>
                      <input id="sv-name" name="name" autocomplete="name" className="lae-input" value={answers.name} placeholder={lang === 'en' ? "Your full name" : "Ditt fulle navn"}
                        onChange={(e) => { set("name", e.target.value); setNameErr(""); }}
                        onBlur={() => sendSurveyPartialLead(answers)}
                        style={{ fontSize: "1rem", padding: "13px 14px", ...(nameErr ? { borderColor: "var(--accent)" } : null) }} />
                      {nameErr && <span style={{ fontSize: ".8rem", color: "var(--accent)", marginTop: 4 }}>{nameErr}</span>}
                    </div>
                    <div className="lae-field">
                      <label htmlFor="sv-address">{t("field_address", lang)} <span className="req">*</span></label>
                      <input id="sv-address" name="address" autocomplete="street-address" className="lae-input" value={answers.address} placeholder={lang === 'en' ? "Delivery address" : "Leveringsadresse"}
                        onChange={(e) => { set("address", e.target.value); setAddressErr(""); }}
                        onBlur={() => sendSurveyPartialLead(answers)}
                        style={{ fontSize: "1rem", padding: "13px 14px", ...(addressErr ? { borderColor: "var(--accent)" } : null) }} />
                      {addressErr && <span style={{ fontSize: ".8rem", color: "var(--accent)", marginTop: 4 }}>{addressErr}</span>}
                    </div>
                    <div className="lae-field" style={{ gridColumn: "1 / -1" }}>
                      <label htmlFor="sv-phone">{t("field_phone", lang)} <span className="req">*</span></label>
                      <input id="sv-phone" type="tel" name="phone" autocomplete="tel" className="lae-input" value={answers.phone} placeholder="+47 915 86 115"
                        onChange={(e) => { set("phone", e.target.value); setPhoneErr(""); }}
                        onBlur={() => sendSurveyPartialLead(answers)}
                        style={{ fontSize: "1rem", padding: "13px 14px", ...(phoneErr ? { borderColor: "var(--accent)" } : null) }} />
                      {phoneErr && <span style={{ fontSize: ".8rem", color: "var(--accent)", marginTop: 4 }}>{phoneErr}</span>}
                    </div>
                    <div className="lae-field" style={{ gridColumn: "1 / -1" }}>
                      <label htmlFor="sv-message">{t("field_msg", lang)} <span className="muted" style={{ fontWeight: 400 }}>({lang === 'en' ? 'optional' : 'valgfritt'})</span></label>
                      <input id="sv-message" name="message" className="lae-input" value={answers.message} placeholder={lang === 'en' ? "Any additional comments..." : "Eventuelle ønsker eller kommentarer..."}
                        onChange={(e) => set("message", e.target.value)}
                        onBlur={() => sendSurveyPartialLead(answers)}
                        style={{ fontSize: "1rem", padding: "13px 14px" }} />
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

function LeadForm({ lang, seed, onSeedConsumed, surveyData }) {
  const [form, setForm] = useStateC({
    name: "", phone: "+47 ", email: "", address: "", date: getTodayDateString(), guests: "",
    eventType: "", menus: [], fulfil: "Delivery", notes: "", message: "",
  });
  const [loading, setLoading] = useStateC(false);
  const [sent, setSent] = useStateC(false);
  const [errors, setErrors] = useStateC({});
  const ref = useRefC(null);
  const leadDateRef = useRefC(null);

  const handleLeadDateIconClick = () => {
    if (leadDateRef.current) {
      try {
        leadDateRef.current.showPicker();
      } catch (_) {
        leadDateRef.current.focus();
      }
    }
  };

  useEffectC(() => {
    if (!surveyData) return;
    setForm((f) => ({
      ...f,
      name: surveyData.name || f.name,
      phone: surveyData.phone || f.phone,
      guests: surveyData.guests || f.guests,
      date: surveyData.date || f.date,
      address: surveyData.address || f.address,
      message: surveyData.message || f.message,
    }));
  }, [surveyData]);

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

  const sendPartialLead = async (currentForm) => {
    const digits = currentForm.phone.replace(/\D/g, "");
    if (digits.length >= 8) {
      const payload = {
        ...currentForm,
        eventType: surveyData ? surveyData.occasion : (currentForm.eventType || ""),
        date: currentForm.date || (surveyData ? surveyData.date : getTodayDateString()),
        email: currentForm.email || (surveyData ? surveyData.email : ""),
        source: "quote_form_auto_capture",
        sessionId,
        partial: true
      };
      try {
        await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch (_) {}
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const err = {};
    if (!form.name.trim()) err.name = true;
    if (!form.address.trim()) err.address = true;
    if (!form.date.trim()) err.date = true;

    const digits = form.phone.replace(/\D/g, "");
    if (!digits || digits.length < 8) {
      err.phone = true;
    }

    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);

    const payload = {
      ...form,
      eventType: surveyData ? surveyData.occasion : (form.eventType || ""),
      date: form.date || (surveyData ? surveyData.date : getTodayDateString()),
      email: form.email || (surveyData ? surveyData.email : ""),
      source: "quote_form",
      sessionId,
      partial: false
    };

    track("submit_quote", { eventType: payload.eventType, guests: payload.guests, fulfil: payload.fulfil, menus: payload.menus.join(", ") });
    
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {}

    setLoading(false);

    // Fire Meta Pixel lead event
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    } else if (typeof fbq === "function") {
      fbq("track", "Lead");
    }

    window.location.href = "/thank-you";
  };

  return (
    <section className="lae-section" id="quote" ref={ref}>
      <div className="lae-wrap">
        <div className="lae-form-shell">
          <div className="lae-form-header">
            <Reveal><Eyebrow>{t("form_eyebrow", lang)}</Eyebrow></Reveal>
            <Reveal delay={80}><h2 className="display-lg" style={{ marginTop: 16 }}>{t("form_title", lang)}</h2></Reveal>
            <Reveal delay={140}><p className="lae-lead" style={{ marginTop: 14 }}>
              {t("form_description", lang)}
            </p></Reveal>
          </div>

          <div className="lae-form-contact">
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

          <div className="lae-form-body">
            <Reveal delay={120}>
              {sent ? (
                <div className="lae-form" style={{ display: "grid", placeItems: "center", textAlign: "center", minHeight: 320, gap: 14 }}>
                  <span style={{ width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center", background: "color-mix(in srgb, var(--accent-2) 22%, var(--surface))", color: "var(--accent-2)" }}>
                    <Icon name="check" size={32} />
                  </span>
                  <h3 className="display-md">
                    {lang === 'en' ? `Thanks, ${form.name}! We'll call you soon with a menu proposal.` : `Takk, ${form.name}! Vi ringer deg snart med menyforslag.`}
                  </h3>
                  <p className="muted" style={{ maxWidth: "40ch" }}>
                    {t("form_success_desc", lang)} <a className="accent" href="tel:+4791586115">+47 915 86 115</a>.
                  </p>
                  <Button variant="ghost" onClick={() => { setSent(false); setForm(f => ({ ...f, name: "", phone: "+47 ", address: "", eventType: "", date: getTodayDateString(), guests: "" })); }}>{t("form_success_another", lang)}</Button>
                </div>
              ) : (
                <form className="lae-form" onSubmit={submit} noValidate>
                  <div className="lae-field-grid">
                    <div className="lae-field">
                      <label htmlFor="f-guests">{t("field_guests", lang)}</label>
                      <input id="f-guests" type="number" min="1" name="guests" autocomplete="off" className="lae-input" value={form.guests} onChange={set("guests")} onBlur={() => sendPartialLead(form)}
                             placeholder={lang === 'en' ? "Number of guests" : "Antall gjester"} />
                    </div>
                    <div className="lae-field">
                      <label htmlFor="f-event-type">{t("field_type", lang)}</label>
                      <select id="f-event-type" name="eventType" className="lae-input" value={form.eventType} onChange={set("eventType")} onBlur={() => sendPartialLead(form)}>
                        <option value="">{t("field_choose", lang)}</option>
                        {getEventTypes(lang).map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="lae-field">
                      <label htmlFor="f-name">{t("field_name", lang)} <span className="req">*</span></label>
                      <input id="f-name" name="name" autocomplete="name" required className="lae-input" value={form.name} onChange={set("name")} onBlur={() => sendPartialLead(form)}
                             placeholder={lang === 'en' ? "Your name" : "Ditt navn"} style={errors.name ? { borderColor: "var(--accent)" } : null} />
                    </div>
                    <div className="lae-field">
                      <label htmlFor="f-phone">{t("field_phone", lang)} <span className="req">*</span></label>
                      <input id="f-phone" type="tel" name="phone" autocomplete="tel" required className="lae-input" value={form.phone} onChange={set("phone")} onBlur={() => sendPartialLead(form)}
                             placeholder="+47 915 86 115" style={errors.phone ? { borderColor: "var(--accent)" } : null} />
                    </div>
                    <div className="lae-field col-2">
                      <label htmlFor="f-address">{t("field_address", lang)} <span className="req">*</span></label>
                      <input id="f-address" name="address" autocomplete="street-address" required className="lae-input" value={form.address} onChange={set("address")} onBlur={() => sendPartialLead(form)}
                             placeholder={lang === 'en' ? "Delivery address" : "Leveringsadresse"} style={errors.address ? { borderColor: "var(--accent)" } : null} />
                    </div>
                    <div className="lae-field">
                      <label htmlFor="f-date">{t("field_date", lang)} <span className="req">*</span></label>
                      <div style={{ position: "relative" }}>
                        <input id="f-date" type="date" ref={leadDateRef} name="date" required className="lae-input" value={form.date} onChange={set("date")}
                               onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }}
                               onBlur={() => sendPartialLead(form)}
                               style={{ paddingRight: "44px", ...(errors.date ? { borderColor: "var(--accent)" } : null) }} />
                        <span onClick={handleLeadDateIconClick} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--accent)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                          <Icon name="calendar" size={20} />
                        </span>
                      </div>
                    </div>
                    <div className="lae-field col-2">
                      <label htmlFor="f-message">{t("field_msg", lang)}</label>
                      <textarea id="f-message" name="message" className="lae-input" value={form.message} onChange={set("message")} onBlur={() => sendPartialLead(form)}
                                placeholder={lang === 'en' ? "Tell us about your event details or special requests..." : "Fortell oss litt om arrangementet eller spesielle ønsker..."} />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 20 }}>
                    <Button variant="primary" size="lg" type="submit" className="lae-form-submit-btn" iconRight={loading ? null : "arrow"} data-analytics="submit_quote" disabled={loading} style={{ width: "100%" }}>
                      {loading ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                          <span className="lae-spinner" /> {lang === 'en' ? "Sending..." : "Sender..."}
                        </span>
                      ) : (
                        t("field_submit", lang)
                      )}
                    </Button>
                    <span className="muted" style={{ fontSize: ".88rem", textAlign: "center", width: "100%" }}>{t("field_footer_note", lang)}</span>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
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
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Button variant="primary" size="lg" data-analytics="start_quote" onClick={() => onQuote()}>
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
              <span className="lae-brand-sub" style={{ color: "var(--accent)", borderLeftColor: "rgba(255,255,255,0.15)" }}>Catering · Drammen</span>
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
