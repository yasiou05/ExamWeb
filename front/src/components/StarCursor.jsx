import React, { useEffect, useRef } from 'react';
import { Sparkles } from "lucide-react";
import { WiStars } from "react-icons/wi";

const StarCursor = () => {
    const cursorRef = useRef(null);
    const lastX = useRef(0);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            const deltaX = clientX - lastX.current;
            lastX.current = clientX;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${clientX}px`;
                cursorRef.current.style.top = `${clientY}px`;
                cursorRef.current.style.transform = `translate(-50%, -50%) rotate(${deltaX * 0.2}deg)`;
            }

            createTrail(clientX, clientY);
        };

        document.addEventListener('mousemove', moveCursor);
        return () => document.removeEventListener('mousemove', moveCursor);
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            const el = cursorRef.current;
            if (!el) return;

            el.classList.add('tap');
            setTimeout(() => {
                if (el && el.classList) {
                    el.classList.remove('tap');
                }
            }, 150);

            createBubbleBurst(e.clientX, e.clientY);
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const createBubbleBurst = (x, y) => {
        for (let i = 0; i < 6; i++) {
            const bubble = document.createElement('div');
            bubble.innerText = '✨';
            Object.assign(bubble.style, {
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                fontSize: '16px',
                pointerEvents: 'none',
                zIndex: 9999,
                transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 30}px)`,
                opacity: 1,
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            });
            document.body.appendChild(bubble);
            setTimeout(() => {
                bubble.style.opacity = 0;
                bubble.style.transform += ' scale(0.5)';
            }, 10);
            setTimeout(() => bubble.remove(), 800);
        }
    };

    const createTrail = (x, y) => {
        const wrapper = document.createElement('div');
        Object.assign(wrapper.style, {
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%) scale(1)',
            pointerEvents: 'none',
            zIndex: 9998,
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            opacity: 1,
            color: '#ffffff',
        });

        const icon = document.createElement('div');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-sparkles" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v2"/><path d="M12 19v2"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="m16.24 7.76 1.42-1.42"/><path d="m6.34 17.66 1.42-1.42"/><path d="m6.34 6.34 1.42 1.42"/><path d="m16.24 16.24 1.42 1.42"/><circle cx="12" cy="12" r="1"/></svg>`;
        wrapper.appendChild(icon);

        document.body.appendChild(wrapper);

        setTimeout(() => {
            wrapper.style.opacity = 0;
            wrapper.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }, 10);

        setTimeout(() => wrapper.remove(), 500);
    };

    return (
        <div
            ref={cursorRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                fontSize: '24px',
                zIndex: 9999,
                color: '#ffffff',
                filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-sparkles" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v2" /><path d="M12 19v2" /><path d="M3 12h2" /><path d="M19 12h2" /><path d="m16.24 7.76 1.42-1.42" /><path d="m6.34 17.66 1.42-1.42" /><path d="m6.34 6.34 1.42 1.42" /><path d="m16.24 16.24 1.42 1.42" /><circle cx="12" cy="12" r="1" /></svg>
        </div>
    );
};

export default StarCursor;
