/* =========================================================================
   Lille Ælling — Catering landing page
   data.jsx — reusable content arrays + theme config
   English copy, structured so strings can be swapped to Norwegian later
   (each block is a flat object; translate values in place).
   ========================================================================= */

// ---- Theme: palettes (CSS-variable bundles) --------------------------------
const PALETTES = {
  "Forest & Cream": {
    "--bg": "#F6F5EF",
    "--surface": "#FCFAF5",
    "--surface-2": "#EBE9DF",
    "--ink": "#0B100B",
    "--ink-soft": "#242E24",
    "--accent": "#224229",
    "--accent-2": "#556B55",
    "--butter": "#C29F38",
    "--line": "rgba(25, 32, 25, 0.09)",
    "--shadow": "rgba(25, 32, 25, 0.12)",
    "dark": false,
  },
  "Sage Garden": {
    "--bg": "#EEEFE2",
    "--surface": "#F9FAF1",
    "--surface-2": "#E3E6D2",
    "--ink": "#21281D",
    "--ink-soft": "#586051",
    "--accent": "#4F6B4C",
    "--accent-2": "#BC6B38",
    "--butter": "#DCBA52",
    "--line": "rgba(33,40,29,0.12)",
    "--shadow": "rgba(31,45,28,0.15)",
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
  "Forest Green": "#224229",
  "Sage": "#556B55",
  "Terracotta": "#BC6B38",
  "Caramel": "#B0763A",
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
  { icon: "leaf", label: "Freshly prepared" },
  { icon: "truck", label: "Delivery within 40 km" },
  { icon: "heart", label: "Allergy-friendly options" },
  { icon: "pin", label: "Local Drammen café" },
];

// ---- Intent selector -------------------------------------------------------
const INTENTS = [
  {
    icon: "briefcase",
    title: "Office meeting",
    copy: "Smart møtemat that arrives ready to serve — from quick lunches to all-day workshops.",
    cta: "See meeting menus",
    target: "menu",
  },
  {
    icon: "cake",
    title: "Birthday & private party",
    copy: "Generous platters, koldtbord and cakes that make the room go quiet for a second.",
    cta: "Plan a celebration",
    target: "menu",
  },
  {
    icon: "rings",
    title: "Wedding & confirmation",
    copy: "Considered menus for the milestone days — tasted, customised, delivered with care.",
    cta: "Request a quote",
    target: "quote",
  },
  {
    icon: "spark",
    title: "Casual gathering",
    copy: "Tapas, streetfood and grazing tables for the easy, unforced kind of get-together.",
    cta: "Browse tapas & streetfood",
    target: "menu",
  },
  {
    icon: "house",
    title: "Venue + catering",
    copy: "Host it at our café by the river — the room, the food and the duck, sorted in one go.",
    cta: "Ask about the venue",
    target: "venue",
  },
];

// ---- Menu discovery --------------------------------------------------------
const MENU_FILTERS = [
  "Most popular",
  "Meeting food",
  "Private events",
  "Warm dishes",
  "Cakes & dessert",
];

const MENU_ITEMS = [
  {
    name: "Snitterpakke Deluxe",
    no: "Snitter",
    price: 245,
    unit: "per pakke",
    bestFor: "Lunches & receptions",
    desc: "Open-faced Danish snitter, built tall on house bread with cured fish, roast beef and seasonal toppings.",
    tags: ["Most popular", "Private events"],
    tone: "accent",
  },
  {
    name: "Koldtbord",
    no: "Koldtbord",
    price: 379,
    unit: "per person",
    bestFor: "Celebrations & weddings",
    desc: "A full Norwegian cold table — salmon, cured meats, salads, cheeses and warm bread, plated to impress.",
    tags: ["Most popular", "Private events"],
    tone: "sage",
  },
  {
    name: "Tapas Selection",
    no: "Tapas",
    price: 445,
    unit: "per person",
    bestFor: "Social gatherings",
    desc: "A grazing spread of small warm and cold plates, made for sharing slowly across a long evening.",
    tags: ["Most popular", "Private events"],
    tone: "butter",
  },
  {
    name: "Møtemeny 2",
    no: "Møtemat",
    price: 159,
    unit: "per person",
    bestFor: "Half-day meetings",
    desc: "Sandwiches, fruit, something sweet and good coffee — the dependable middle option for any agenda.",
    tags: ["Most popular", "Meeting food"],
    tone: "accent",
  },
  {
    name: "Møtemeny 1",
    no: "Møtemat",
    price: 129,
    unit: "per person",
    bestFor: "Quick stand-ups",
    desc: "A tidy, light working lunch that keeps the room sharp without slowing the afternoon down.",
    tags: ["Meeting food"],
    tone: "sage",
  },
  {
    name: "Møtemeny 3",
    no: "Møtemat",
    price: 199,
    unit: "per person",
    bestFor: "All-day workshops",
    desc: "The generous meeting menu — a fuller spread for long sessions and visiting guests.",
    tags: ["Meeting food"],
    tone: "accent",
  },
  {
    name: "Varmretter & gryter",
    no: "Warm dishes",
    price: 245,
    unit: "per person",
    bestFor: "Cold-weather events",
    desc: "Slow-cooked stews and warm mains delivered hot and ready, for when comfort is the whole point.",
    tags: ["Warm dishes", "Private events"],
    tone: "sage",
  },
  {
    name: "Streetfood Catering",
    no: "Streetfood",
    price: 210,
    unit: "per person",
    bestFor: "Relaxed crowds",
    desc: "Informal, hands-on plates with personality — the loose, easy way to feed a happy room.",
    tags: ["Warm dishes"],
    tone: "butter",
  },
  {
    name: "Kaker & Desserter",
    no: "Kaker",
    price: 60,
    unit: "per slice",
    bestFor: "Birthdays & finishes",
    desc: "House cakes and desserts, from classic sponge to celebration centrepieces, made to order.",
    tags: ["Cakes & dessert", "Most popular"],
    tone: "butter",
  },
  {
    name: "Lunsjsnitter",
    no: "Snitter",
    price: 165,
    unit: "per pakke",
    bestFor: "Everyday lunches",
    desc: "The everyday snitter pack — fresh, balanced and made to land well at the lunch table.",
    tags: ["Meeting food", "Cakes & dessert"].slice(0, 1),
    tone: "accent",
  },
];

// ---- How it works ----------------------------------------------------------
const STEPS = [
  {
    n: "01",
    title: "Choose your menu",
    copy: "Browse menus built for meetings, parties and celebrations — or tell us the occasion and we'll suggest.",
  },
  {
    n: "02",
    title: "Customise your order",
    copy: "Adjust portions, swap dishes, flag allergies and preferences. Nothing is fixed in stone.",
  },
  {
    n: "03",
    title: "We prepare it fresh",
    copy: "Everything is made fresh in our Drammen kitchen and arranged ready to serve — no assembly required.",
  },
  {
    n: "04",
    title: "You enjoy the event",
    copy: "We deliver within 40 km, on time. You stay with your guests while the food does the talking.",
  },
];

// ---- Customisation / dietary -----------------------------------------------
const DIETARY = [
  "Vegetarian options",
  "Gluten-free on request",
  "Lactose-free on request",
  "Vegan by arrangement",
  "Allergy notes handled per order",
  "Portion sizes to match your crowd",
];

// ---- Local trust / delivery ------------------------------------------------
const LOCAL_FACTS = [
  { icon: "pin", title: "Losjeplassen 2, 3015 Drammen", copy: "Our café and kitchen, right by the river in the heart of town." },
  { icon: "truck", title: "Delivery within 40 km", copy: "From Drammen out to the surrounding region, arriving on schedule." },
  { icon: "leaf", title: "Made fresh, every order", copy: "Prepared the same day and arranged ready for serving." },
  { icon: "phone", title: "Talk to a real person", copy: "Call or email and reach the team who'll actually handle your event." },
];

// ---- Reviews ---------------------------------------------------------------
const REVIEWS = [
  {
    quote: "Ordered catering for a birthday, and everything was delicious. The food looked fantastic and the guests were happy!",
    name: "Linda S.",
    context: "Birthday celebration",
  },
  {
    quote: "Ordered meeting food and wanted to make changes to the menu. Everything was fixed without a problem, including allergies. Would order again.",
    name: "John G.",
    context: "Company meeting",
  },
  {
    quote: "Delivered on time, good food. Recommended.",
    name: "Camilla N.",
    context: "Office lunch",
  },
];

// ---- FAQ -------------------------------------------------------------------
const FAQS = [
  { q: "How far do you deliver?", a: "We deliver within roughly 40 km of Drammen, covering the town and the surrounding region. If you're unsure whether you're in range, just ask — we'll confirm quickly." },
  { q: "Can you customise the menu?", a: "Yes. Almost everything can be adjusted — swap dishes, change portions, combine menus or build something around your occasion. Tell us what you're picturing and we'll shape it." },
  { q: "Do you offer vegetarian or gluten-free options?", a: "We handle vegetarian, gluten-free, lactose-free and vegan requirements by request, and we take allergy notes seriously on every order. Add the details when you enquire." },
  { q: "How early should I order?", a: "The sooner the better, especially for weekends and larger events. For smaller meeting orders a few days' notice is usually fine — but get in touch and we'll tell you honestly what's possible." },
  { q: "Can I order online?", a: "Yes — many menus can be ordered directly online. For tailored or larger events, send a quote request and we'll put together a recommendation." },
  { q: "Can I rent the café for a private event?", a: "We do. Our café by the river can be booked for private gatherings, from 1,000 NOK per hour, and paired with catering so the room and the food arrive together." },
  { q: "Do prices apply per person?", a: "It depends on the menu. Some are priced per person (like koldtbord and tapas), others per package or per item. Each menu states its unit, and we'll always confirm the total before you commit." },
  { q: "Can I call instead of filling the form?", a: "Of course. Call +47 915 86 115 during opening hours and you'll reach the team directly — sometimes a two-minute conversation is the fastest way to plan." },
];

// share to other babel scripts
Object.assign(window, {
  PALETTES, ACCENTS, DISPLAY_FONTS, BODY_FONTS,
  TRUST_CHIPS, INTENTS, MENU_FILTERS, MENU_ITEMS, STEPS,
  DIETARY, LOCAL_FACTS, REVIEWS, FAQS,
});
