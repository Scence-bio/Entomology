const PATHS = {
  beetle: (
    <>
      <ellipse cx="12" cy="14.2" rx="5" ry="6" />
      <circle cx="12" cy="6.4" r="2.1" />
      <path d="M12 8.6v11.2" />
      <path d="M9.9 5.2C8.2 3.3 6.4 3.5 5.2 4.3" />
      <path d="M14.1 5.2c1.7-1.9 3.5-1.7 4.7-.9" />
    </>
  ),
  butterfly: (
    <>
      <path d="M12 6.2C9.6 3.4 5.4 3.6 4.6 7.2c-.9 4 1.8 6.2 4.4 5.6" />
      <path d="M12 6.2c2.4-2.8 6.6-2.6 7.4 1 0.9 4-1.8 6.2-4.4 5.6" />
      <path d="M12 7.4V19" />
      <path d="M9.6 18.2c.8-1.1 1.6-1.5 2.4-1.5s1.6.4 2.4 1.5" />
    </>
  ),
  pin: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <path d="M12 7.2v13" />
    </>
  ),
  legs: (
    <>
      <circle cx="12" cy="5" r="1.6" />
      <ellipse cx="12" cy="10" rx="2.1" ry="2.5" />
      <ellipse cx="12" cy="16.2" rx="2.5" ry="2.9" />
      <path d="M9.7 9.2 5.6 7.2M14.3 9.2l4.1-2M9.3 12.2 4.8 13.6M14.7 12.2l4.5 1.4M9.5 16.4 5.2 19M14.5 16.4 18.8 19" />
    </>
  ),
  card: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.6" />
      <path d="M8 9h8M8 12.5h8M8 16h5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 3.6v2.1M12 18.3v2.1M3.6 12h2.1M18.3 12h2.1M6.1 6.1l1.5 1.5M16.4 16.4l1.5 1.5M17.9 6.1l-1.5 1.5M7.6 16.4 6.1 17.9" />
    </>
  ),
  moon: <path d="M15.2 4.6A6.8 6.8 0 1 0 19 15.2 5.4 5.4 0 0 1 15.2 4.6z" />,
  bee: (
    <>
      <ellipse cx="12" cy="13.2" rx="3.2" ry="4.2" />
      <circle cx="12" cy="7.2" r="2" />
      <path d="M10.2 12.2h3.6M10.2 14.4h3.6" />
      <path d="M9.2 10.4C6.6 8.6 5.4 9.4 5.6 11.4c.2 1.6 2 2.2 3.6 1.4" />
      <path d="M14.8 10.4c2.6-1.8 3.8-1 3.6 1 .2 1.6-2 2.2-3.6 1.4" />
      <path d="M10.6 5.6 9.2 3.8M13.4 5.6l1.4-1.8" />
    </>
  ),
  fly: (
    <>
      <ellipse cx="12" cy="14" rx="2.6" ry="3.4" />
      <circle cx="12" cy="8.4" r="1.8" />
      <path d="M9.6 11.2C7.2 9.2 5.8 10 6.2 12.2" />
      <path d="M14.4 11.2c2.4-2 3.8-1.2 3.4 1" />
      <circle cx="9.2" cy="15.6" r="0.7" />
      <circle cx="14.8" cy="15.6" r="0.7" />
      <path d="M10.8 6.8 9.6 4.6M13.2 6.8l1.2-2.2" />
    </>
  ),
  net: (
    <>
      <circle cx="9" cy="8" r="4.2" />
      <path d="M12.2 11.2 19 20" />
    </>
  ),
};

export function Mark({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name] || PATHS.beetle}
    </svg>
  );
}
