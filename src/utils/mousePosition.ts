import { useEffect, useState } from "react";

interface MousePositionProps {
  x: number;
  y: number;
}

export default function useMousePosition(): MousePositionProps {
  const [mousePosition, setMousePosition] = useState<MousePositionProps>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}
