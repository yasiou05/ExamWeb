// TypingText.jsx
import React, { useEffect, useState } from 'react';

const TypeAnimation = ({
    text = '',
    speed = 100,           // ms per character
    delay = 0,             // delay before start (ms)
    loop = false,          // loop typing effect
    className = '',
    cursor = true,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeoutId;
        if (index < text.length) {
            timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, speed);
        } else if (loop) {
            timeoutId = setTimeout(() => {
                setDisplayedText('');
                setIndex(0);
            }, 1500);
        }

        return () => clearTimeout(timeoutId);
    }, [index, text, speed, loop]);

    return (
        <span className={`typing-text ${className}`}>
            {displayedText}
            {cursor && <span className="blinking-cursor">|</span>}
        </span>
    );
};

export default TypeAnimation;
