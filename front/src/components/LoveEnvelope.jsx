import React, { useState } from 'react';

function LoveEnvelope({ letter }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!letter) return null; // 🛡️ prevents crash if undefined

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={handleOpen}>
            <div className="letter-content">
                <p>{letter.content}</p>
                <small>{new Date(letter.created_at).toLocaleString()}</small>
            </div>
        </div>
    );
}

export default LoveEnvelope;
