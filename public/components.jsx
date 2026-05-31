/* =========================================================================
   components.jsx — shared UI primitives, icons, brand mark, motion helpers
   ========================================================================= */
const { useState, useEffect, useRef, useCallback } = React;

// ---- Icon set (stroke-based, Lucide-flavoured, currentColor) ---------------
function Icon({ name, size = 22, stroke = 1.6, className = "", style }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round",
    strokeLinejoin: "round", className, style, "aria-hidden": true,
  };
  switch (name) {
    case "leaf": return (<svg {...p}><path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 0 6-2 10-9 11"/><path d="M11 20c0-5 3-8 8-9"/></svg>);
    case "truck": return (<svg {...p}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>);
    case "heart": return (<svg {...p}><path d="M12 20s-7-4.4-9.2-8.4A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9.2 4.6C19 15.6 12 20 12 20Z"/></svg>);
    case "pin": return (<svg {...p}><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 3 6.5 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>);
    case "briefcase": return (<svg {...p}><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M9 7V5h6v2M3 12h18"/></svg>);
    case "cake": return (<svg {...p}><path d="M4 20h16v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zM4 15h16"/><path d="M12 8V5M9 5.5l.01 0M15 5.5l.01 0"/></svg>);
    case "rings": return (<svg {...p}><circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="M9 6l1.5 2M15 6l-1.5 2M10.5 3.5h3"/></svg>);
    case "spark": return (<svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>);
    case "house": return (<svg {...p}><path d="M4 11l8-6 8 6M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>);
    case "phone": return (<svg {...p}><path d="M6 4h3l1.5 4.5L8.5 10a12 12 0 0 0 5.5 5.5l1.5-2 4.5 1.5V18a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z"/></svg>);
    case "mail": return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>);
    case "arrow": return (<svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case "check": return (<svg {...p}><path d="M5 12.5 10 17l9-10"/></svg>);
    case "plus": return (<svg {...p}><path d="M12 5v14M5 12h14"/></svg>);
    case "clock": return (<svg {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.5l3 1.7"/></svg>);
    case "users": return (<svg {...p}><circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 5.7M16.5 14.2A5.5 5.5 0 0 1 20.5 19"/></svg>);
    case "calendar": return (<svg {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>);
    case "menu": return (<svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>);
    case "x": return (<svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>);
    case "star": return (<svg {...p} fill="currentColor" stroke="none"><path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/></svg>);
    case "quote": return (<svg {...p} fill="currentColor" stroke="none"><path d="M9 7c-2.7 1-4 3-4 6h3v4H4v-4c0-4 1.8-6.6 5-7.6zM19 7c-2.7 1-4 3-4 6h3v4h-4v-4c0-4 1.8-6.6 5-7.6z"/></svg>);
    case "sparkle": return (<svg {...p}><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"/></svg>);
    default: return null;
  }
}

// ---- Duck brand mark (original line-art) -----------------------------------
function DuckMark({ size = 34, className = "", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="var(--accent)" opacity="0.1"/>
      <path d="M16.5 30c-2.8-1-4.6-3.6-4.6-6.7 0-4.2 3.4-7.4 7.7-7.4 3.1 0 5.8 1.8 7 4.4l5.9-1c.7-.1 1.2.6.9 1.2l-2 3.6c.2.8.3 1.5.3 2.3 0 5-3.9 8.6-9.3 8.6-2.2 0-4-.5-5.6-1.4"
        stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="21.6" cy="20.4" r="1.15" fill="var(--ink)"/>
      <path d="M14 33.5c2.6 1.2 6.2 1.6 9.6 1" stroke="var(--butter)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

// ---- Scroll reveal (IntersectionObserver, reduced-motion safe) -------------
const PREFERS_REDUCED = typeof window !== "undefined" &&
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Reveal({ children, delay = 0, y = 22, as = "div", className = "", style = {}, ...rest }) {
  // Pure-CSS entrance: the element's resting state is fully visible; the keyframe
  // only adds a fade/rise on mount. No dependency on IntersectionObserver, scroll,
  // or state updates — so content can never be left invisible.
  const Tag = as;
  return (
    <Tag
      className={`lae-reveal ${className}`}
      style={{ ...style, animationDelay: `${delay}ms`, "--reveal-y": `${y}px` }}
      {...rest}
    >{children}</Tag>
  );
}

// ---- Buttons ---------------------------------------------------------------
function Button({ children, variant = "primary", size = "md", icon, iconRight, as = "button", className = "", ...rest }) {
  const base = "lae-btn";
  const cls = `${base} ${base}--${variant} ${base}--${size} ${className}`;
  const Tag = as;
  return (
    <Tag className={cls} {...rest}>
      {icon && <Icon name={icon} size={size === "lg" ? 20 : 18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 20 : 18} className="lae-btn__arrow" />}
    </Tag>
  );
}

// ---- Small chip / pill -----------------------------------------------------
function Chip({ icon, children, tone = "default" }) {
  return (
    <span className={`lae-chip lae-chip--${tone}`}>
      {icon && <Icon name={icon} size={15} />}
      <span>{children}</span>
    </span>
  );
}

// ---- Eyebrow / section label ----------------------------------------------
function Eyebrow({ children, align = "left" }) {
  return (
    <div className={`lae-eyebrow lae-eyebrow--${align}`}>
      <span className="lae-eyebrow__tick" />
      <span>{children}</span>
    </div>
  );
}

Object.assign(window, { Icon, DuckMark, Reveal, Button, Chip, Eyebrow, PREFERS_REDUCED });
