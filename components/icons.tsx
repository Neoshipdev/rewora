/** Ikonová sada (nahrádza textové glyfy z prototypu). Stroke 1.6, 18×18. */

type Props = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false as const,
});

export function CartIcon({ size = 18 }: Props) {
  return (
    <svg {...base(size)}>
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
      <path d="M2.5 3.5h2.2l2.3 11.2h11.1l1.9-8.2H6.2" />
    </svg>
  );
}

export function CalendarIcon({ size = 18 }: Props) {
  return (
    <svg {...base(size)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

export function RefreshIcon({ size = 18 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
      <path d="M20.5 4v5h-5" />
    </svg>
  );
}

export function ReturnIcon({ size = 18 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M3.5 4v5h5" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 14 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon({ size = 14 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MenuIcon({ size = 22 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ size = 22 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/* --- ikony nástrojov (obrysový štýl ako na rewora.com) --- */

export function StarOutlineIcon({ size = 32 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M12 3.5l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.5-4 6-.6L12 3.5z" />
    </svg>
  );
}

export function ChatIcon({ size = 32 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M7.5 8.5h9m-9 3.5H12" />
      <path d="M3 13.2c0 1.6 1.1 3 2.7 3.2 1.1.2 2.3.3 3.4.4.35.03.67.21.86.5L12 21l2.05-3.7c.19-.29.51-.47.86-.5 1.14-.08 2.28-.21 3.42-.38 1.58-.23 2.67-1.62 2.67-3.22V7.8c0-1.6-1.09-2.99-2.67-3.22a48 48 0 0 0-12.6 0C4.15 4.81 3 6.2 3 7.8v5.4z" />
    </svg>
  );
}

export function TagIcon({ size = 32 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M9.6 3H5.25A2.25 2.25 0 0 0 3 5.25V9.6c0 .6.24 1.17.66 1.59l9.58 9.58c.7.7 1.78.87 2.61.33a18 18 0 0 0 5.22-5.22c.54-.83.37-1.91-.33-2.61L11.16 3.66A2.25 2.25 0 0 0 9.6 3z" />
      <path d="M6.75 6.75h.008v.008H6.75V6.75z" />
    </svg>
  );
}

export function ChartIcon({ size = 32 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M3.75 3v16.5c0 .414.336.75.75.75h15.75" />
      <path d="M7.5 16.5V11m4.5 5.5V7.5m4.5 9V13" />
    </svg>
  );
}

export function StoreIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M2.25 12 11.2 3.05c.44-.44 1.15-.44 1.6 0L21.75 12" />
      <path d="M4.5 9.75v10.13c0 .62.5 1.12 1.13 1.12H9.75V16.5c0-.62.5-1.13 1.13-1.13h2.25c.62 0 1.12.5 1.12 1.13V21h4.13c.62 0 1.12-.5 1.12-1.13V9.75" />
    </svg>
  );
}

export function BagIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5" />
      <path d="M19.6 8.5l1.27 12c.07.67-.45 1.25-1.12 1.25H4.25a1.13 1.13 0 0 1-1.12-1.25l1.26-12A1.13 1.13 0 0 1 5.5 7.5h13c.58 0 1.06.44 1.12 1z" />
    </svg>
  );
}

export function ChatDotsIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M8.6 15.2c.34 1.36 1.57 2.3 2.98 2.3h1.7l3.22 2.5v-2.6c1.4-.24 2.5-1.46 2.5-2.94V9.9c0-1.65-1.35-3-3-3H11.6c-1.66 0-3 1.35-3 3v5.3z" />
      <path d="M5.6 12.9A2.86 2.86 0 0 1 4.5 10.6V6.4c0-1.6 1.3-2.9 2.9-2.9h6.3c.98 0 1.85.49 2.37 1.24" />
    </svg>
  );
}

export function LanguageIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M10.5 21l5.25-11.25L21 21m-9-3h6.75M3 5.62c1.9-.25 3.83-.37 5.78-.37m0 0c1.11 0 2.21.04 3.3.12M8.78 5.25V3m3.3 2.37c-.67 4.53-3.4 8.4-7.2 10.63m4.6-4.87A11.9 11.9 0 0 1 6.6 9.3" />
    </svg>
  );
}

export function BookIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M12 6.04A7.5 7.5 0 0 0 3.75 4.7v11.55A7.5 7.5 0 0 1 12 17.6a7.5 7.5 0 0 1 8.25-1.35V4.7A7.5 7.5 0 0 0 12 6.04z" />
      <path d="M12 6.04V17.6" />
    </svg>
  );
}

export function DocumentIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M19.5 14.25V6.1c0-1.14-.85-2.1-1.98-2.22a48.4 48.4 0 0 0-1.02-.1V3.4c0-.98-.7-1.83-1.68-1.9a48 48 0 0 0-5.64 0A1.9 1.9 0 0 0 7.5 3.4v.38c-.34.03-.68.06-1.02.1A2.23 2.23 0 0 0 4.5 6.1v8.15" />
      <path d="M4.5 14.25v4.5c0 1.24 1 2.25 2.25 2.25h10.5c1.24 0 2.25-1 2.25-2.25v-4.5M9 9.75h6M9 13h4.5" />
    </svg>
  );
}

export function SlidersIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M6 13.5V3.75m0 9.75a1.5 1.5 0 1 1 0 3m0-3a1.5 1.5 0 1 0 0 3m0 3.75V16.5M18 13.5V3.75m0 9.75a1.5 1.5 0 1 1 0 3m0-3a1.5 1.5 0 1 0 0 3m0 3.75V16.5M12 7.5V3.75m0 3.75a1.5 1.5 0 1 1 0 3m0-3a1.5 1.5 0 1 0 0 3m0 9.75V10.5" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M2.25 18l5.25-6 4.5 4.5 6.75-8.25" />
      <path d="M14.25 7.5h5.25v5.25" />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 30 }: Props) {
  return (
    <svg {...base(size)}>
      <path d="M9 12.75 11.25 15 15 9.75" />
      <path d="M12 2.71a11.96 11.96 0 0 1-8.25 3.29c-.16.8-.25 1.63-.25 2.48 0 5.42 3.62 9.98 8.5 11.52.3.1.62.1.92 0 4.88-1.54 8.5-6.1 8.5-11.52 0-.85-.09-1.68-.25-2.48A11.96 11.96 0 0 1 12 2.71z" />
    </svg>
  );
}

export const subfeatureIcons = {
  star: StarOutlineIcon,
  store: StoreIcon,
  bag: BagIcon,
  chat: ChatIcon,
  chats: ChatDotsIcon,
  language: LanguageIcon,
  tag: TagIcon,
  book: BookIcon,
  document: DocumentIcon,
  sliders: SlidersIcon,
  trending: TrendingUpIcon,
  shield: ShieldCheckIcon,
} as const;

export const biIcons = {
  cart: CartIcon,
  calendar: CalendarIcon,
  refresh: RefreshIcon,
  return: ReturnIcon,
} as const;
