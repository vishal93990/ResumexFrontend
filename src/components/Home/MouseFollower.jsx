import React, { useEffect, useRef, useState } from "react";

const MouseFollower = () => {
  const [visible, setVisible] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    const speed = 0.12;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);

    const animate = () => {
      x += (mouseX - x) * speed;
      y += (mouseY - y) * speed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (rippleRef.current) {
        rippleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* core glowing dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-4 h-4 rounded-full 
        bg-gradient-to-r from-indigo-400 to-emerald-400 
        shadow-[0_0_10px_#6366f1aa,0_0_20px_#10b98166] 
        transition-all duration-150 ease-out 
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        style={{
          transform: "translate3d(0,0,0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      />

      {/* surrounding follow ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] w-16 h-16 rounded-full 
        border border-indigo-400/30 
        transition-all duration-500 ease-out 
        ${visible ? "opacity-60 scale-100" : "opacity-0 scale-75"}`}
        style={{
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* subtle pulsing ripple effect */}
      <div
        ref={rippleRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9997] w-24 h-24 rounded-full
        border border-indigo-400/10 animate-[pulseRipple_2.2s_ease-out_infinite]
        ${visible ? "opacity-40" : "opacity-0"}`}
        style={{
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Keyframes inline (Tailwind doesn’t allow dynamic custom names easily) */}
      <style>{`
        @keyframes pulseRipple {
          0% { transform: scale(0.8); opacity: 0.2; }
          50% { transform: scale(1.5); opacity: 0.1; }
          100% { transform: scale(2.0); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default MouseFollower;