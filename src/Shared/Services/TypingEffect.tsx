import { useState, useEffect } from "react";

const speed = 100;
const infinite = false;

const TypingEffect = ({ text }: { text: string }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true); // State to toggle cursor visibility

  useEffect(() => {
    let timeout: any;

    if (currentIndex <= text.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
    } else if (infinite) {
      // ADD THIS CHECK
      setCurrentIndex(0);
      setCurrentText("");
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, speed, infinite, text]);

  useEffect(() => {
    // Toggle cursor visibility every 500ms
    const interval = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <span className="typing-effect-text">
      {currentText}
      {showCursor && <span className="cursor">|</span>}
    </span>
  );
};

export default TypingEffect;
