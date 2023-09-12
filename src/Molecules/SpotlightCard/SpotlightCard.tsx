import React from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  return (
    <div
      className={`relative h-[15rem] w-[10rem] overflow-hidden rounded-2xl before:pointer-events-none before:absolute  before:-left-40 before:-top-40 before:z-10 before:h-32 before:w-32 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-primary before:opacity-0 before:blur-[100px] before:transition-opacity before:duration-500 before:group-hover:opacity-70 lg:h-[20rem] lg:w-[18rem] ${className}`}
    >
      {children}
    </div>
  );
}

export default SpotlightCard;
