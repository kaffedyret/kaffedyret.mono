import { useEffect, useState } from "react";
import { blinkDuration, steamFrameDuration } from "./constants";

let blinkTimer: NodeJS.Timeout;
let interval: NodeJS.Timeout;

export const useMaskotAnimation = (): { blinking: boolean; steamFrame: number } => {
  const [blinking, setBlinking] = useState(false);
  const [steamFrame, setSteamFrame] = useState(0);

  const getBlinkDelay = () => (6 + Math.random() * 4) * 1000;

  const blink = () => {
    clearTimeout(blinkTimer);
    setBlinking(true);

    setTimeout(() => {
      setBlinking(false);
    }, blinkDuration);
    
    setTimeout(blink, getBlinkDelay());
  };

  const startAnim = () => {
    if (blinkTimer) clearTimeout(blinkTimer);
    if (interval) clearInterval(interval);

    const tick = () => {
      setSteamFrame((f) => (f > 6 ? 0 : f + 1));
    };

    interval = setInterval(tick, steamFrameDuration);

    blink();
    tick();
  };

  useEffect(() => {
    startAnim();
    
    return () => {
      clearTimeout(blinkTimer);
      clearInterval(interval);
    };
  }, []);

  return { blinking, steamFrame };
};
