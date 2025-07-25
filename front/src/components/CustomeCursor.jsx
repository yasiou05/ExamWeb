import React, { useEffect, useRef, useState } from 'react';
import '../styles/global.css';

const CustomeCursor = () => {
  const cursorRef = useRef(null);
  const lastX = useRef(0);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // فقط زمانی اجازه ادامه بده که window وجود داشته باشه (برای SSR یا لود اولیه)
    if (typeof window !== 'undefined') setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser || !cursorRef.current) return;

    const moveCursor = (e) => {
      if (!cursorRef.current) return;
      const { clientX, clientY } = e;
      const deltaX = clientX - lastX.current;
      lastX.current = clientX;

      const el = cursorRef.current;
      el.style.left = `${clientX}px`;
      el.style.top = `${clientY}px`;
      el.style.transform = `translate(-50%, -50%) rotate(${deltaX * 0.2}deg)`;

      createTrail(clientX, clientY);
    };

    const clickCursor = (e) => {
      const el = cursorRef.current;
      if (!el || !el.classList) return;

      el.classList.add('tap');
      setTimeout(() => {
        el.classList?.remove('tap');
      }, 150);

      createBubbleBurst(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('click', clickCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('click', clickCursor);
    };
  }, [isBrowser]);

  const createTrail = (x, y) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
  };

  const createBubbleBurst = (x, y) => {
    for (let i = 0; i < 6; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble-paw';
      bubble.innerText = '💕';
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.setProperty('--x', `${Math.random() * 100 - 50}px`);
      bubble.style.setProperty('--y', `${Math.random() * -100 - 30}px`);
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 800);
    }
  };

  // اگر هنوز DOM آماده نیست، چیزی رندر نکن
  if (!isBrowser) return null;

  return (
    <div ref={cursorRef} className="custom-cursor">
      😻
    </div>
  );
};

export default CustomeCursor;
