import type { SVGProps } from 'react';

export const TractorIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        {...props}
    >
        <defs>
            <linearGradient id="icon-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF8C00" /> 
                <stop offset="100%" stopColor="#FF0080" /> 
            </linearGradient>
        </defs>
        <g stroke="url(#icon-gradient)" strokeWidth="1.5">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.5h9.75l1.5 5.25"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 5.25h1.5"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 19.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5h11.25"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12.75h-5.25"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 19.5v-3.75"
            />
            <circle cx="6.75" cy="15.75" r="3" />
            <circle cx="18" cy="15.75" r="3" />
        </g>
    </svg>
);
