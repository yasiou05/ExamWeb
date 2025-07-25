import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypewriterText = ({
  text = "Loading your content...",
  speed = 0.1, // typing speed (seconds per char)
  delayBeforeStart = 1,
  loop = false, // 🔁 new prop for looping
}) => {
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [readyToStart, setReadyToStart] = useState(delayBeforeStart === 0);

  useEffect(() => {
    const delay = setTimeout(() => {
      setReadyToStart(true);
    }, delayBeforeStart * 1000);
    return () => clearTimeout(delay);
  }, [delayBeforeStart]);

  useEffect(() => {
    if (!readyToStart) return;

    const interval = setInterval(() => {
      setRevealedLetters((prev) => {
        if (prev < text.length) return prev + 1;
        else {
          clearInterval(interval);
          // 🔁 Restart after pause if loop is on
          if (loop) {
            setTimeout(() => {
              setRevealedLetters(0);
            }, 1500); // pause before restarting
          }
          return prev;
        }
      });
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [text, speed, readyToStart, loop, revealedLetters]);

  return (
    <div>
      {text.split("").map((char, i) => (
        <motion.span
          key={i + revealedLetters}
          initial={{ opacity: 0 }}
          animate={{
            opacity: i < revealedLetters ? 1 : 0,
          }}
          transition={{
            duration: 0.01,
            delay: i * speed + delayBeforeStart,
          }}
        >
          {char}
        </motion.span>
      ))}

      {revealedLetters < text.length && readyToStart && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1,
          }}
          style={{
            width: "1ch",
            marginLeft: "2px",
            borderLeft: "2px solid white",
            height: "2rem",
          }}
        />
      )}
    </div>
  );
};

export default TypewriterText;
