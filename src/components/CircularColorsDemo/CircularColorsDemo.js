"use client";
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { motion } from 'framer-motion';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggle-play-pause':
      return { ...state, isPlaying: !state.isPlaying };
    case 'reset':
      return { ...state, timeElapsed: 0, isPlaying: false };
    case 'tick':
      return { ...state, timeElapsed: state.timeElapsed + 1 };
  }
};


function CircularColorsDemo() {
  const [{ timeElapsed, isPlaying }, dispatch] = React.useReducer(reducer, {
    timeElapsed: 0,
    isPlaying: false,
  });
  const instanceId = React.useId();

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);
  
  const handlePlayPause = () => {
    dispatch({ type: 'toggle-play-pause' });
  }
  const handleReset = () => {
    dispatch({ type: 'reset' });
  }

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  className={
                    styles.selectedColorOutline
                  }
                  layoutId={`selected-color-outline-${instanceId}`}
                  style={{zIndex: 1}}
                  transition={{type: "spring", stiffness: 500, damping: 40}}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
