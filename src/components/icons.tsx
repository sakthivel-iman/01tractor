import type { SVGProps } from 'react';

export const TractorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 15h2.5" />
    <path d="M11 15h10" />
    <path d="M4 10h9" />
    <path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5V10" />
    <path d="m18 15-2-5" />
    <path d="M4.5 15.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path d="M16.5 15.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  </svg>
);
