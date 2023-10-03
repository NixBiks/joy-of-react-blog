"use client";
import React from 'react';
import {MotionConfig} from "framer-motion"

// respect the user's OS-level preference for reduced motion
function RespectReducedMotion({children}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default RespectReducedMotion;
