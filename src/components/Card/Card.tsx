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
      className={`rounded bg-[--content-background] drop-shadow-[--drop-shadow] ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
