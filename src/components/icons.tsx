import type { SVGProps } from 'react';

export const TractorIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M3 4h9l1 5" />
        <path d="M13 5h2" />
        <path d="M12 19H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" />
        <path d="M19 12h-6" />
        <path d="M17 19v-4" />
        <circle cx="6" cy="15" r="4" />
        <circle cx="17" cy="15" r="4" />
    </svg>
);
