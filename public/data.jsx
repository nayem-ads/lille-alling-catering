/* =========================================================================
   Lille Ælling — Catering landing page
   data.jsx — reusable content arrays + theme config
   Supports both English and Norwegian languages.
   ========================================================================= */

// ---- Theme: palettes (CSS-variable bundles) --------------------------------
const PALETTES = {
  "Coffee & Cream": {
    "--bg": "#F6F0EE",
    "--surface": "#FCFAF5",
    "--surface-2": "#EBE9DF",
    "--ink": "#373029",
    "--ink-soft": "#5B5046",
    "--accent": "#8C6239",
    "--accent-2": "#B0763A",
    "--butter": "#C29F38",
    "--line": "rgba(55, 48, 41, 0.09)",
    "--shadow": "rgba(55, 48, 41, 0.12)",
    "dark": false,
  },
  "Espresso Noir": {
    "--bg": "#231A12",
    "--surface": "#2E241A",
    "--surface-2": "#3A2E21",
    "--ink": "#F4EAD7",
    "--ink-soft": "#C3B29C",
    "--accent": "#D98A4E",
    "--accent-2": "#A0A682",
    "--butter": "#E6BE48",
    "--line": "rgba(244,234,215,0.14)",
    "--shadow": "rgba(0,0,0,0.45)",
    "dark": true,
  },
};

const ACCENTS = {
  "Espresso": "#373029",
  "Caramel": "#B0763A",
  "Cortado": "#8C6239",
  "Terracotta": "#BC6B38",
};

const DISPLAY_FONTS = {
  "Fraunces": "'Fraunces', Georgia, serif",
  "Playfair": "'Playfair Display', Georgia, serif",
  "Cormorant": "'Cormorant Garamond', Georgia, serif",
};

const BODY_FONTS = {
  "Manrope": "'Manrope', system-ui, sans-serif",
  "Inter": "'Inter', system-ui, sans-serif",
};

// ---- Trust chips (hero) ----------------------------------------------------
const TRUST_CHIPS = [
  { icon: "check", label: { en: "Freshly prepared today", no: "Nylaget samme dag" } },
  { icon: "truck", label: { en: "Delivery within 40 km", no: "Levering innen 40 km" } },
  { icon: "heart", label: { en: "Tailored for allergies", no: "Tilpasset allergier" } },
  { icon: "sparkle", label: { en: "Free & non-binding", no: "Gratis og uforpliktende" } },
];

// ---- Intent selector -------------------------------------------------------
const INTENTS = [
  {
    icon: "briefcase",
    title: { en: "Office meeting", no: "Møtemat til kontoret" },
    copy: { 
      en: "Smart meeting food that arrives ready to serve — from quick lunches to all-day workshops.", 
      no: "Smart møtemat som leveres klar til servering – fra raske lunsjer til heldagsseminarer." 
    },
    cta: { en: "See meeting menus", no: "Se møtemenyer" },
    target: "menus",
  },
  {
    icon: "cake",
    title: { en: "Birthday & private party", no: "Bursdag & privat selskap" },
    copy: { 
      en: "Generous platters, koldtbord and cakes that make the room go quiet for a second.", 
      no: "Innholdsrike fat, koldtbord og kaker som setter spiss på feiringen." 
    },
    cta: { en: "Plan a celebration", no: "Planlegg feiring" },
    target: "menus",
  },
  {
    icon: "rings",
    title: { en: "Wedding & confirmation", no: "Bryllup & konfirmasjon" },
    copy: { 
      en: "Considered menus for the milestone days — tasted, customised, delivered with care.", 
      no: "Gjennomtenkte menyer for de store merkedagene – smaksprøver, tilpasning og levering med omhu." 
    },
    cta: { en: "Request a quote", no: "Be om tilbud" },
    target: "quote",
  },
  {
    icon: "spark",
    title: { en: "Casual gathering", no: "Uformelt lag" },
    copy: { 
      en: "Tapas, streetfood and grazing tables for the easy, unforced kind of get-together.", 
      no: "Tapas, streetfood og spekefat for den uformelle, koselige sammenkomsten." 
    },
    cta: { en: "Browse tapas & streetfood", no: "Se tapas & streetfood" },
    target: "menus",
  },
  {
    icon: "house",
    title: { en: "Venue + catering", no: "Lokaler + catering" },
    copy: { 
      en: "Host it at our café by the river — the room, the food and the duck, sorted in one go.", 
      no: "Hold selskapet i vår kafé ved elva – lokaler, mat og drikke i én enkel løsning." 
    },
    cta: { en: "Ask about the venue", no: "Sjekk våre lokaler" },
    target: "venue",
  },
];

// ---- Menu discovery --------------------------------------------------------
const MENU_FILTERS = [
  { id: "Most popular", en: "Most popular", no: "Mest populær" },
  { id: "Meeting food", en: "Meeting food", no: "Møtemat" },
  { id: "Private events", en: "Private events", no: "Selskap & fest" },
  { id: "Warm dishes", en: "Warm dishes", no: "Varme retter" },
  { id: "Cakes & dessert", en: "Cakes & dessert", no: "Kaker & dessert" },
];

const MENU_ITEMS = [
  {
    name: { en: "Snitterpakke Deluxe", no: "Snitterpakke Deluxe" },
    no: { en: "Snitter", no: "Snitter" },
    price: 245,
    unit: { en: "per pack", no: "per pakke" },
    bestFor: { en: "Lunches & receptions", no: "Lunsj & mottakelser" },
    desc: { 
      en: "Open-faced Danish snitter, built tall on house bread with cured fish, roast beef and seasonal toppings.", 
      no: "Klassiske danske snitter, høye på vårt eget brød med røkt fisk, roastbiff og sesongens råvarer." 
    },
    tags: ["Most popular", "Private events"],
    tone: "accent",
  },
  {
    name: { en: "Koldtbord", no: "Koldtbord" },
    no: { en: "Koldtbord", no: "Koldtbord" },
    price: 379,
    unit: { en: "per person", no: "per person" },
    bestFor: { en: "Celebrations & weddings", no: "Selskap & konfirmasjon" },
    desc: { 
      en: "A full Norwegian cold table — salmon, cured meats, salads, cheeses and warm bread, plated to impress.", 
      no: "Klassisk koldtbord med laks, spekemat, friske salater, oster og lunt brød – dandert og klart til servering." 
    },
    tags: ["Most popular", "Private events"],
    tone: "sage",
  },
  {
    name: { en: "Tapas Selection", no: "Tapasanretning" },
    no: { en: "Tapas", no: "Tapas" },
    price: 445,
    unit: { en: "per person", no: "per person" },
    bestFor: { en: "Social gatherings", no: "Uformelle selskaper" },
    desc: { 
      en: "A grazing spread of small warm and cold plates, made for sharing slowly across a long evening.", 
      no: "Et fyldig utvalg av varme og kalde småretter, perfekt til deling over en hyggelig kveld." 
    },
    tags: ["Most popular", "Private events"],
    tone: "butter",
  },
  {
    name: { en: "Møtemeny 2", no: "Møtemeny 2" },
    no: { en: "Møtemat", no: "Møtemat" },
    price: 159,
    unit: { en: "per person", no: "per person" },
    bestFor: { en: "Half-day meetings", no: "Halvdagsmøter" },
    desc: { 
      en: "Sandwiches, fruit, something sweet and good coffee — the dependable middle option for any agenda.", 
      no: "Snitter, frisk frukt, noe søtt til kaffen – den perfekte lunsjpakken for møterommet." 
    },
    tags: ["Most popular", "Meeting food"],
    tone: "accent",
  },
  {
    name: { en: "Møtemeny 1", no: "Møtemeny 1" },
    no: { en: "Møtemat", no: "Møtemat" },
    price: 129,
    unit: { en: "per person", no: "per person" },
    bestFor: { en: "Quick stand-ups", no: "Korte statusmøter" },
    desc: { 
      en: "A tidy, light working lunch that keeps the room sharp without slowing the afternoon down.", 
      no: "En lett og frisk lunsj som holder energinivået oppe gjennom møtet." 
    },
    tags: ["Meeting food"],
    tone: "sage",
  },
  {
    name: { en: "Møtemeny 3", no: "Møtemeny 3" },
    no: { en: "Møtemat", no: "Møtemat" },
    price: 199,
    unit: { en: "per person", no: "per person" },
    bestFor: { en: "All-day workshops", no: "Heldagsmøter & kurs" },
    desc: { 
      en: "The generous meeting menu — a fuller spread for long sessions and visiting guests.", 
      no: "Vår mest sjenerøse møtemeny – et fyldig utvalg til heldagsmøter og gjester." 
    },
    tags: ["Meeting food"],
    tone: "accent",
  },
  {
    name: { en: "Varmretter & gryter", no: "Gryter & varmretter" },
    no: { en: "Warm dishes", no: "Varme retter" },
    price: 245,
    unit: { en: "per person", no: "per person" },
    bestFor: { en: "Cold-weather events", no: "Lune selskaper" },
    desc: { 
      en: "Slow-cooked stews and warm mains delivered hot and ready, for when comfort is the whole point.", 
      no: "Saktekokte gryteretter levert rykende varme. Den enkleste måten å servere lun og god mat på." 
    },
    tags: ["Warm dishes", "Private events"],
    tone: "sage",
  },
  {
    name: { en: "Streetfood Catering", no: "Streetfood" },
    no: { en: "Streetfood", no: "Streetfood" },
    price: 210,
    unit: { en: "per person", no: "per person" },
    bestFor: { en: "Relaxed crowds", no: "Uformelle samlinger" },
    desc: { 
      en: "Informal, hands-on plates with personality — the loose, easy way to feed a happy room.", 
      no: "Uformelle, smaksrike retter med særpreg – perfekt for en avslappet samling." 
    },
    tags: ["Warm dishes"],
    tone: "butter",
  },
  {
    name: { en: "Kaker & Desserter", no: "Kaker & dessert" },
    no: { en: "Kaker", no: "Kaker" },
    price: 60,
    unit: { en: "per slice", no: "per kakestykke" },
    bestFor: { en: "Birthdays & finishes", no: "Bursdag & fest" },
    desc: { 
      en: "House cakes and desserts, from classic sponge to celebration centrepieces, made to order.", 
      no: "Hjemmelagede kaker og desserter fra eget bakeri, perfekt til avslutning eller bursdag." 
    },
    tags: ["Cakes & dessert", "Most popular"],
    tone: "butter",
  },
  {
    name: { en: "Lunsjsnitter", no: "Lunsjsnitter" },
    no: { en: "Snitter", no: "Snitter" },
    price: 165,
    unit: { en: "per pack", no: "per pakke" },
    bestFor: { en: "Everyday lunches", no: "Hverdagslunsj på kontoret" },
    desc: { 
      en: "The everyday snitter pack — fresh, balanced and made to land well at the lunch table.", 
      no: "Friske og varierte lunsjsnitter til hverdagslunsjen på kontoret." 
    },
    tags: ["Meeting food"],
    tone: "accent",
  },
];

// ---- How it works ----------------------------------------------------------
const STEPS = [
  {
    n: "01",
    title: { en: "Send request", no: "Send forespørsel" },
    copy: { 
      en: "30 seconds — completely free and non-binding.", 
      no: "30 sekunder — helt uforpliktende." 
    },
  },
  {
    n: "02",
    title: { en: "Get menu proposal with price", no: "Få menyforslag med pris" },
    copy: { 
      en: "We'll call you quickly with a tailored proposal. Response within 2 hours (weekdays).", 
      no: "Vi ringer deg raskt med et tilpasset forslag. Svar innen 2 timer (hverdager)." 
    },
  },
  {
    n: "03",
    title: { en: "We deliver ready", no: "Vi leverer ferdig" },
    copy: { 
      en: "Ready to serve, right on time.", 
      no: "Klar til servering, til avtalt tid." 
    },
  },
];

// ---- Customisation / dietary -----------------------------------------------
const DIETARY = [
  { en: "Vegetarian options", no: "Vegetariske alternativer" },
  { en: "Gluten-free on request", no: "Glutenfritt på forespørsel" },
  { en: "Lactose-free on request", no: "Laktosefritt på forespørsel" },
  { en: "Vegan by arrangement", no: "Vegansk etter avtale" },
  { en: "Allergy notes handled per order", no: "Allergier tas hensyn til på alle bestillinger" },
  { en: "Portion sizes to match your crowd", no: "Portjonsstørrelser tilpasset ditt selskap" },
];

// ---- Local trust / delivery ------------------------------------------------
const LOCAL_FACTS = [
  { icon: "pin", title: { en: "Losjeplassen 2, 3015 Drammen", no: "Losjeplassen 2, 3015 Drammen" }, copy: { en: "Our café and kitchen, right by the river in the heart of town.", no: "Vår kafé og kjøkken ligger idyllisk til ved elva, midt i Drammen." } },
  { icon: "truck", title: { en: "Delivery within 40 km", no: "Levering innen 40 km" }, copy: { en: "From Drammen out to the surrounding region, arriving on schedule.", no: "Vi kjører ut maten i hele Drammen og omegn – levert presist som avtalt." } },
  { icon: "leaf", title: { en: "Made fresh, every order", no: "Alltid nylaget" }, copy: { en: "Prepared the same day and arranged ready for serving.", no: "Laget fra bunnen samme dag og lekkert anrettet på fat." } },
  { icon: "phone", title: { en: "Talk to a real person", no: "Snakk med en av oss" }, copy: { en: "Call or email and reach the team who'll actually handle your event.", no: "Ring eller send e-post for å prate direkte med de som lager maten din." } },
];

// ---- Reviews ---------------------------------------------------------------
const REVIEWS = [
  {
    quote: { 
      en: "Ordered catering for a birthday, and everything was delicious. The food looked fantastic and the guests were happy!", 
      no: "Bestilte catering til en bursdag, og alt var kjempegodt. Maten så fantastisk ut og gjestene var superfornøyde!" 
    },
    name: "Linda S.",
    context: { en: "Birthday celebration", no: "Bursdagsfeiring" },
  },
  {
    quote: { 
      en: "Ordered meeting food and wanted to make changes to the menu. Everything was fixed without a problem, including allergies. Would order again.", 
      no: "Bestilte møtemat og ønsket å gjøre noen endringer i menyen. Alt ble ordnet uten problemer, inkludert allergier. Bestiller gjerne igjen." 
    },
    name: "John G.",
    context: { en: "Company meeting", no: "Bedriftsmøte" },
  },
  {
    quote: { 
      en: "Delivered on time, good food. Recommended.", 
      no: "Levert på tiden, kjempegod mat og service. Anbefales!" 
    },
    name: "Camilla N.",
    context: { en: "Office lunch", no: "Kontorlunsj" },
  },
];

// ---- FAQ -------------------------------------------------------------------
const FAQS = [
  { 
    q: { en: "How far do you deliver?", no: "Hvor langt leverer dere?" }, 
    a: { 
      en: "We deliver within 40 km of Drammen. Contact us if you are unsure.", 
      no: "Vi leverer innen 40 km fra Drammen. Kontakt oss om du er usikker." 
    } 
  },
  { 
    q: { en: "How early should I order?", no: "Hvor tidlig må jeg bestille?" }, 
    a: { 
      en: "Preferably 3–5 days in advance, but we do our best at short notice.", 
      no: "Helst 3–5 dager før, men vi gjør vårt beste ved kort varsel." 
    } 
  },
  { 
    q: { en: "Can you customise for allergies?", no: "Kan dere tilpasse for allergier?" }, 
    a: { 
      en: "Yes. Specify allergies in the form and we will adapt the menus.", 
      no: "Ja. Oppgi allergier i skjemaet, så tilpasser vi menyene." 
    } 
  },
  { 
    q: { en: "What does it cost?", no: "Hva koster det?" }, 
    a: { 
      en: "Prices vary from 85 to 379 NOK per person, depending on the menu. You receive a precise quote after your inquiry.", 
      no: "Prisene varierer fra 85 til 379 kr per person, avhengig av meny. Du får et nøyaktig tilbud etter forespørselen." 
    } 
  },
  { 
    q: { en: "Can I order online?", no: "Kan jeg bestille direkte på nett?" }, 
    a: { 
      en: "Yes, many menus can be ordered directly online. For events, send an inquiry.", 
      no: "Ja, mange av våre menyer kan bestilles direkte i nettbutikken. For selskaper kan du sende en forespørsel." 
    } 
  },
  { 
    q: { en: "Can I rent the café for private events?", no: "Kan jeg leie kaféen til private selskaper?" }, 
    a: { 
      en: "Yes, the café by the river can be rented from 1,000 NOK/hour and paired with catering.", 
      no: "Ja, kaféen ved elva kan leies fra kr 1 000 per time og kombineres med catering." 
    } 
  },
  { 
    q: { en: "Do prices apply per person?", no: "Gjelder prisene per person?" }, 
    a: { 
      en: "Yes, most menus are priced per person, while some are per package. This is always confirmed.", 
      no: "Ja, de fleste menyer har priser per person, mens enkelte har priser per pakke. Dette bekreftes alltid." 
    } 
  },
  { 
    q: { en: "Can I call instead of filling the form?", no: "Kan jeg ringe dere i stedet for å fylle ut skjemaet?" }, 
    a: { 
      en: "Of course. Call us at 915 86 115 and we'll help you plan.", 
      no: "Selvfølgelig. Ring oss på 915 86 115, så hjelper vi deg med planleggingen." 
    } 
  },
];

// ---- Global static dictionary for inline page content ----------------------
const LOCALIZATION = {
  // Navigation
  "nav_menus": { en: "Menus", no: "Menyer" },
  "nav_how": { en: "How it works", no: "Slik fungerer det" },
  "nav_reviews": { en: "Reviews", no: "Omtaler" },
  "nav_faq": { en: "FAQ", no: "Ofte stilte spørsmål" },
  "nav_request_quote": { en: "Get menu proposal", no: "Få menyforslag" },
  "nav_call": { en: "+47 915 86 115", no: "+47 915 86 115" },
  "nav_skip": { en: "Skip to menus", no: "Gå til menyer" },

  // Hero
  "hero_tagline": { en: "Boutique catering in Drammen · Response within 2 hours", no: "Boutique-catering i Drammen · Svar innen 2 timer" },
  "hero_title_1": { en: "Local catering ", no: "Lokal catering " },
  "hero_title_2": { en: "by the river", no: "ved Drammenselva" },
  "hero_title_3": { en: " in\u00a0Drammen", no: " i\u00a0Drammen" },
  "hero_description": { 
    en: "Freshly prepared food for meetings, events and birthdays — made the same day in our café by the river.", 
    no: "Nylaget mat til møter, selskaper og bursdager — tilberedt samme dag i kaféen vår ved Drammenselva." 
  },
  "hero_cta": { en: "Get free menu proposal", no: "Få gratis menyforslag" },

  // Occasions Section (Intent Selector)
  "intent_eyebrow": { en: "What are you planning?", no: "Hva planlegger du?" },
  "intent_title": { en: "Choose by occasion", no: "Velg etter anledning" },
  "intent_description": { 
    en: "Tell us the kind of day you're hosting and we'll point you to the right menu — or build something around it.", 
    no: "Fortell oss litt om anledningen, så hjelper vi deg med å finne den rette menyen – eller skreddersyr noe eget." 
  },

  // Menus Section
  "menu_eyebrow": { en: "The menus", no: "Menyene" },
  "menu_title": { en: "Popular menus", no: "Populære menyer" },
  "menu_description": { 
    en: "All menus are made from scratch in our Drammen kitchen.", 
    no: "Alle menyer lages fra bunnen i vårt kjøkken i Drammen." 
  },
  "menu_order_online": { en: "Order online", no: "Bestill på nett" },
  "menu_best_for": { en: "Best for: ", no: "Passer til: " },
  "menu_from": { en: "from", no: "fra" },
  "menu_nok": { en: "NOK", no: "kr" },
  "menu_view_details": { en: "View details", no: "Se detaljer" },

  // How it works
  "how_eyebrow": { en: "Simple process", no: "Enkel prosess" },
  "how_title": { en: "How it works", no: "Slik fungerer det" },
  "how_description": { 
    en: "No stress or unexpected costs. We make the whole process simple for you.", 
    no: "Ingen stress eller uforutsette kostnader. Vi gjør hele prosessen enkel og oversiktlig for deg." 
  },

  // Customization
  "cust_eyebrow": { en: "Made to fit your guests", no: "Tilpasset dine gjester" },
  "cust_title": { en: "Food should fit your guests — ", no: "Maten skal passe gjestene – " },
  "cust_title_italic": { en: "not the other way around.", no: "ikke omvendt." },
  "cust_description": { 
    en: "Vegetarian, gluten-free, lactose-free or vegan — tell us what your table needs and we'll handle it. Allergies are taken seriously on every single order, and the menu bends to you.", 
    no: "Vegetar, glutenfritt, laktosefritt eller vegansk – fortell oss hva dine gjester trenger, så fikser vi det. Vi tar allergier på største alvor på hver eneste bestilling." 
  },
  "cust_cta": { en: "Ask about a custom menu", no: "Be om tilpasset meny" },
  "cust_talk": { en: "Talk it through", no: "Ta en prat med oss" },
  "cust_allergy_title": { en: "Allergy note", no: "Allergier" },
  "cust_allergy_bubble": { en: "“2 gluten-free, 1 vegan” — noted on your order, every time.", no: "«2 glutenfrie, 1 vegansk» – vi følger opp dette nøye på din bestilling." },
  "cust_tag": { en: "Tailored plating", no: "Skreddersydd anretning" },

  // Local Trust
  "local_eyebrow": { en: "Local & dependable", no: "Lokalt og pålitelig" },
  "local_title": { en: "Made in Drammen, delivered to you", no: "Laget i Drammen, levert til deg" },
  "local_description": { 
    en: "We're not a faceless delivery brand. We're a café and kitchen on Losjeplassen, run by people who'll answer the phone.", 
    no: "Vi er ikke en ansiktsløs kjede. Vi er en koselig kafé og kjøkken på Losjeplassen, drevet av ekte folk som svarer når du ringer." 
  },
  "local_radius": { en: "40 km radius", no: "40 km radius" },
  "local_tag": { en: "Drammen", no: "Drammen" },

  // Reviews
  "reviews_eyebrow": { en: "Kind words", no: "Hyggelige ord" },
  "reviews_title": { en: "What our customers say", no: "Dette sier kundene" },
  "reviews_chip": { en: "Loved by local hosts", no: "Elsket av lokale verter" },

  // Venue
  "venue_eyebrow": { en: "Need a place too?", no: "Trenger du lokaler også?" },
  "venue_title": { en: "Hold the party with us", no: "Hold selskapet hos oss" },
  "venue_description": { 
    en: "Book the room and the food together. Our café makes an easy, warm setting for birthdays, confirmations and company get-togethers — and we'll cater it end to end.", 
    no: "Lei lokalet og bestill maten samlet. Vår kafé gir en varm, intim og uformell ramme for bursdager, konfirmasjoner og firmafester." 
  },
  "venue_stat_seated_n": { en: "35", no: "35" },
  "venue_stat_seated_txt": { en: "seated, intimate", no: "sitteplasser, intimt" },
  "venue_stat_standing_n": { en: "70", no: "70" },
  "venue_stat_standing_txt": { en: "standing reception", no: "stående mottakelse" },
  "venue_stat_price_n": { en: "1 000", no: "1 000" },
  "venue_stat_price_txt": { en: "NOK / hour, from", no: "kr / time, fra" },
  "venue_cta": { en: "Ask about venue + catering", no: "Sjekk ledige datoer" },
  "venue_call": { en: "Call to check dates", no: "Ring for avtale" },
  
  // Quick Survey Funnel
  "survey_eyebrow": { en: "Takes only 30 seconds", no: "Tar kun 30 sekunder" },
  "survey_title": { en: "Tailor your menu", no: "Skreddersy din meny" },
  "survey_description": { 
    en: "Answer 4 quick questions and we'll match you with the perfect menu.", 
    no: "Svar på 4 kjappe spørsmål, så foreslår vi den perfekte menyen for deg." 
  },
  "survey_q_occasion": { en: "What's the occasion?", no: "Hva er anledningen?" },
  "survey_sub_occasion": { en: "Pick the one that fits best.", no: "Velg det alternativet som passer best." },
  "survey_q_guests": { en: "How many guests?", no: "Hvor mange gjester blir dere?" },
  "survey_sub_guests": { en: "An estimate is fine.", no: "Et omtrentlig tall går helt fint." },
  "survey_q_date": { en: "When's the event?", no: "Når skal det holdes?" },
  "survey_sub_date": { en: "Approximate date is fine.", no: "Datoen trenger ikke være helt spikret." },
  "survey_q_contact": { en: "Last step — how do we reach you?", no: "Siste steg – hvordan kontakter vi deg?" },
  "survey_sub_contact": { en: "We'll send a personalised menu recommendation. No spam, ever.", no: "Vi sender deg et skreddersydd menyforslag. Helt uforpliktende." },
  "survey_step": { en: "Step", no: "Steg" },
  "survey_of": { en: "of", no: "av" },
  "survey_back": { en: "Back", no: "Tilbake" },
  "survey_next": { en: "Next step", no: "Neste steg" },
  "survey_submit": { en: "Get menu recommendation", no: "Få menyforslag" },
  "survey_success_title": { en: "Got it — we'll be in touch!", no: "Mottatt – vi hører fra oss!" },
  "survey_success_desc": { en: "Thanks! Fill in a few more details below for a full quote, or we'll call you shortly.", no: "Takk! Legg gjerne til litt mer info under for et nøyaktig tilbud, eller så ringer vi deg om kort tid." },
  "survey_success_cta": { en: "Complete your quote request", no: "Fullfør forespørselen" },
  "survey_consent": { en: "By submitting you agree we may contact you about your catering enquiry.", no: "Ved å sende inn godtar du at vi kan kontakte deg angående din forespørsel." },

  // Lead Form
  "form_eyebrow": { en: "Request a quote", no: "Be om uforpliktende tilbud" },
  "form_title": { en: "Get free menu proposal", no: "Få gratis menyforslag" },
  "form_description": { 
    en: "Fill in 3 fields — we will call you with a proposal and price.", 
    no: "Fyll ut 3 felt — vi ringer deg med forslag og pris." 
  },
  "form_call_lbl": { en: "Prefer to talk? Call us.", no: "Foretrekker du å ringe? Ring oss." },
  "form_email_lbl": { en: "Email your brief over.", no: "Send oss en e-post." },
  "form_delivery_lbl": { en: "Delivery within 40 km.", no: "Levering innen 40 km." },
  "form_success_title": { en: "Request received — takk!", no: "Forespørsel mottatt – takk!" },
  "form_success_desc": { en: "Thanks! We'll get back to you as soon as possible with a menu recommendation and price. For anything urgent, call", no: "Takk! Vi kommer tilbake til deg så fort som mulig med et menyforslag og tilbud. Haster det, ring oss gjerne på" },
  "form_success_another": { en: "Send another request", no: "Send en ny forespørsel" },
  
  // Fields
  "field_name": { en: "Name", no: "Navn" },
  "field_phone": { en: "Phone", no: "Telefon" },
  "field_email": { en: "Email", no: "E-post" },
  "field_date": { en: "Event date", no: "Dato for selskapet" },
  "field_guests": { en: "Guest count", no: "Antall gjester" },
  "field_type": { en: "Event type", no: "Type arrangement" },
  "field_choose": { en: "Choose…", no: "Velg…" },
  "field_interest": { en: "Menu interest", no: "Hvilken meny ønsker du?" },
  "field_interest_sub": { en: "(pick any)", no: "(velg gjerne flere)" },
  "field_delivery": { en: "Delivery or pickup", no: "Levering eller henting" },
  "field_notes": { en: "Allergies / preferences", no: "Allergier og spesielle behov" },
  "field_msg": { en: "Message", no: "Ytterligere beskrivelse / melding" },
  "field_submit": { en: "Get free menu proposal", no: "Få gratis menyforslag" },
  "field_footer_note": { en: "We'll get back to you as soon as possible.", no: "Vi svarer deg så fort vi overhodet kan." },

  // FAQ
  "faq_eyebrow": { en: "Good to know", no: "Verdt å vite" },
  "faq_title": { en: "Frequently asked questions", no: "Vanlige spørsmål" },

  // Final CTA
  "final_title": { en: "Ready to order?", no: "Klar til å bestille?" },
  "final_description": { en: "Tell us the occasion — we'll handle the food, so you stay with your guests.", no: "Tell us the occasion — we'll handle the food, so you stay with your guests." },
  "final_cta": { en: "Get free menu proposal →", no: "Få gratis menyforslag →" },
  "final_call": { en: "Call us: 915 86 115", no: "Ring oss: 915 86 115" },

  // Floating Widget (FloatCard)
  "float_title": { en: "Get free menu proposal", no: "Få gratis menyforslag" },

  // Footer
  "footer_tagline": { en: "A little café by the river, catering the meetings, milestones and quiet celebrations of Drammen.", no: "En koselig kafé ved elva som leverer mat til møter, merkedager og hyggelige selskaper i Drammen." },
  "footer_menus": { en: "Menus", no: "Menyer" },
  "footer_visit": { en: "Visit", no: "Besøk oss" },
  "footer_follow": { en: "Follow", no: "Følg oss" },
  "footer_rights": { en: "All rights reserved.", no: "Alle rettigheter reservert." }
};

// Simple global translation helper
const t = (key, lang) => {
  const item = LOCALIZATION[key];
  if (!item) return key;
  return item[lang] || item['no']; // Fallback to Norwegian
};

// share to other babel scripts
Object.assign(window, {
  PALETTES, ACCENTS, DISPLAY_FONTS, BODY_FONTS,
  TRUST_CHIPS, INTENTS, MENU_FILTERS, MENU_ITEMS, STEPS,
  DIETARY, LOCAL_FACTS, REVIEWS, FAQS, LOCALIZATION, t
});
