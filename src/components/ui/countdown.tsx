"use client"

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const fontSize = 40;
const padding = 10;
const height = fontSize + padding;

interface CountdownProps {
  start?: number;
  onComplete?: () => void;
  className?: string;
  fontSize?: number;
}

export const Countdown = ({
  start = 22,
  onComplete,
  className,
  fontSize: customFontSize = 60,
}: CountdownProps) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (value <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [value, onComplete]);

  return (
    <div
      style={{ fontSize: customFontSize }}
      className={cn(
        "flex overflow-hidden rounded px-2 leading-none text-foreground font-bold",
        className
      )}
    >
      {value >= 10 && <Digit place={10} value={value} />}
      <Digit place={1} value={value} />
    </div>
  );
};

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height: height * (60 / fontSize) }} className="relative w-[1ch] tabular-nums">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * (height * (60 / fontSize));

    if (offset > 5) {
      memo -= 10 * (height * (60 / fontSize));
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
