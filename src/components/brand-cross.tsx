import React from 'react';

interface BrandCrossProps {
  className?: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
  opacity?: number;
  variant?: 'solid' | 'duo' | 'outline' | 'subtle';
}

export default function BrandCross({
  className = '',
  size = 24,
  color = '#43B8BA',
  secondaryColor = '#0C4463',
  opacity = 1,
  variant = 'solid',
}: BrandCrossProps) {
  if (variant === 'duo') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Horizontal bar */}
        <rect x="15" y="36" width="70" height="28" rx="14" fill={color} />
        {/* Vertical bar */}
        <rect x="36" y="15" width="28" height="70" rx="14" fill={secondaryColor} />
        {/* Center overlay pill accent */}
        <rect x="36" y="36" width="28" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.25" />
      </svg>
    );
  }

  if (variant === 'outline') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ opacity }}
        aria-hidden="true"
      >
        <path
          d="M38 18C38 14.6863 40.6863 12 44 12H56C59.3137 12 62 14.6863 62 18V38H82C85.3137 38 88 40.6863 88 44V56C88 59.3137 85.3137 62 82 62H62V82C62 85.3137 59.3137 88 56 88H44C40.6863 88 38 85.3137 38 82V62H18C14.6863 62 12 59.3137 12 56V44C12 40.6863 14.6863 38 18 38H38V18Z"
          stroke={color}
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'subtle') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ opacity }}
        aria-hidden="true"
      >
        <path
          d="M38 16C38 11.5817 41.5817 8 46 8H54C58.4183 8 62 11.5817 62 16V38H84C88.4183 38 92 41.5817 92 46V54C92 58.4183 88.4183 62 84 62H62V84C62 88.4183 58.4183 92 54 92H46C41.5817 92 38 88.4183 38 84V62H16C11.5817 62 8 58.4183 8 54V46C8 41.5817 11.5817 38 16 38H38V16Z"
          fill={color}
          fillOpacity={opacity}
        />
      </svg>
    );
  }

  // default: solid rounded cross
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M36 16C36 11.5817 39.5817 8 44 8H56C60.4183 8 64 11.5817 64 16V36H84C88.4183 36 92 39.5817 92 44V56C92 60.4183 88.4183 64 84 64H64V84C64 88.4183 60.4183 92 56 92H44C39.5817 92 36 88.4183 36 84V64H16C11.5817 64 8 60.4183 8 56V44C8 39.5817 11.5817 36 16 36H36V16Z"
        fill={color}
      />
    </svg>
  );
}
