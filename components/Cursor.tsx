"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    document.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll("a, button, input, textarea, label");
    interactiveElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.cursor = "none"; // hide default hand
      htmlEl.addEventListener("mouseenter", addHover);
      htmlEl.addEventListener("mouseleave", removeHover);
    });

    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.removeEventListener("mouseenter", addHover);
        htmlEl.removeEventListener("mouseleave", removeHover);
        htmlEl.style.cursor = "";
      });
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease, height 0.2s ease, border-width 0.2s ease, transform 0.1s ease"
      }}
      className={`
        fixed pointer-events-none z-50 rounded-full border border-yellow-500
        ${hovered ? "w-10 h-10 border-4" : "w-6 h-6 border-2"}
      `}
    ></div>
  );
}
