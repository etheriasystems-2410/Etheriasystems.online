import React from 'react';

interface GlyphProps {
  className?: string;
  size?: number;
}

export const EyeGlyph: React.FC<GlyphProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse
      cx="50"
      cy="50"
      rx="40"
      ry="25"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="50"
      cy="50"
      r="15"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="50"
      cy="50"
      r="6"
      fill="currentColor"
    />
    <path
      d="M10 50 Q50 20 90 50"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    <path
      d="M10 50 Q50 80 90 50"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

export const FlameGlyph: React.FC<GlyphProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 85 C30 85 20 65 25 45 C28 35 35 25 50 10 C65 25 72 35 75 45 C80 65 70 85 50 85 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M50 70 C40 70 35 60 38 50 C40 45 45 40 50 30 C55 40 60 45 62 50 C65 60 60 70 50 70 Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    <circle
      cx="50"
      cy="55"
      r="5"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

export const CrescentGlyph: React.FC<GlyphProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M65 15 A40 40 0 1 0 65 85 A30 30 0 1 1 65 15"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="72"
      cy="50"
      r="4"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

export const SpiralGlyph: React.FC<GlyphProps> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 50 m0 -40 a40 40 0 1 1 0 80 a35 35 0 1 0 0 -70 a30 30 0 1 1 0 60 a25 25 0 1 0 0 -50 a20 20 0 1 1 0 40 a15 15 0 1 0 0 -30 a10 10 0 1 1 0 20"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <circle
      cx="50"
      cy="50"
      r="5"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

export const MoonDotGlyph: React.FC<GlyphProps> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M40 10 A25 25 0 1 0 40 50 A20 20 0 1 1 40 10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="48"
      cy="30"
      r="4"
      fill="currentColor"
    />
  </svg>
);
