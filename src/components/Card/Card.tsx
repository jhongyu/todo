import type { ReactNode } from 'react';

function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded bg-white drop-shadow-[0_35px_50px_rgba(194,195,214,0.5)] ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
