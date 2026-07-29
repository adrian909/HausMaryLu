/**
 * Inline stroke icons. Keeping them here means no icon-font dependency and
 * icons that inherit `currentColor` like any other text.
 */
const paths = {
  wifi: 'M2.5 9a15 15 0 0 1 19 0M5.5 12.5a10 10 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01',
  parking: 'M6 3.5h5.5a4.5 4.5 0 0 1 0 9H6zM6 12.5v8',
  kitchen: 'M4 3.5h16v17H4zM4 9.5h16M8.5 6h.01M8.5 13.5v3.5',
  shower: 'M5 20.5V7a3 3 0 0 1 6 0M9.5 10.5h9M14 10.5V8M9.5 15h.01M14 15h.01M18.5 15h.01M11.5 19h.01M16 19h.01',
  tv: 'M3 6.5h18v11H3zM8.5 21h7M12 6.5 8 3M12 6.5 16 3',
  terrace: 'M3 10.5h18L12 3zM6 10.5v10M18 10.5v10M6 15.5h12',
  leaf: 'M20 4c0 9-5.5 13-10 13a5.5 5.5 0 0 1 0-11c3 0 5-2 10-2M4 20c2-4 4.5-6.5 8-8.5',
  coffee: 'M4 8.5h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M7.5 4v1.5M11 3.5V5.5M14.5 4v1.5',
  fridge: 'M6 2.5h12v19H6zM6 10h12M9 6v2M9 13v2.5',
  pin: 'M12 21.5s7-6 7-11.5a7 7 0 1 0-14 0c0 5.5 7 11.5 7 11.5ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  mail: 'M3 5.5h18v13H3zM3 6.5l9 6.5 9-6.5',
  phone: 'M8 3.5 10.5 9l-2.5 2c1 2.5 3 4.5 5.5 5.5l2-2.5 5.5 2.5v3a1.5 1.5 0 0 1-1.7 1.5C11.5 20 4 12.5 3 5.2A1.5 1.5 0 0 1 4.5 3.5Z',
  arrowRight: 'M4 12h16M14 6l6 6-6 6',
  arrowLeft: 'M20 12H4M10 6l-6 6 6 6',
  chevronDown: 'M5 9l7 7 7-7',
  close: 'M5 5l14 14M19 5 5 19',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 3 19.5v-12A1.5 1.5 0 0 1 4.5 6H10',
  star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z',
  check: 'M4 12.5l5 5 11-11',
}

export default function Icon({ name, size = 24, strokeWidth = 1.4, ...rest }) {
  const d = paths[name]
  if (!d) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={d} />
    </svg>
  )
}
