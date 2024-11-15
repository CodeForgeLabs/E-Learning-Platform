import React, { useState, useEffect } from "react";

const Typingeffect = () => {
  const phrase = "Peer to Peer"; 
  const [text, setText] = useState(""); // Current displayed text
  const [isDeleting, setIsDeleting] = useState(false); // Backspacing state
  const [typingSpeed, setTypingSpeed] = useState(150); // Speed of typing/backspacing

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        // Backspace
        setText((prev) => prev.slice(0, -1));
        setTypingSpeed(100); // Faster backspacing
      } else {
        // Typing
        setText((prev) => phrase.slice(0, prev.length + 1));
        setTypingSpeed(150); // Regular speed for typing
      }

      // Pause and toggle modes
      if (!isDeleting && text === phrase) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false); // Restart typing
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, phrase]);

  return (
    
      <h1 className="text-5xl font-bold">
        {text}
        <span className="border-r-2 border-white animate-pulse"></span>
      </h1>
    
  );
};

export default Typingeffect;
