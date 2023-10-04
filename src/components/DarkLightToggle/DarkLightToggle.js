"use client";
import React from 'react';
import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '@/components/VisuallyHidden';
import { DARK_COLORS, LIGHT_COLORS, DARK_SHADOWS, LIGHT_SHADOWS, DARK_TOKENS, LIGHT_TOKENS } from "@/constants"
import styles from './DarkLightToggle.module.css';
import Cookies from 'js-cookie';

const THEME_PROPERTIES = {
  light: { ...LIGHT_COLORS, ...LIGHT_SHADOWS, ...LIGHT_TOKENS },
  dark: { ...DARK_COLORS, ...DARK_SHADOWS, ...DARK_TOKENS },
}

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    // set cookie
    Cookies.set('joy-of-react-blog-theme', nextTheme);

    // update html attributes
    const root = document.documentElement;
    root.setAttribute('data-theme', nextTheme);
    Object.entries(THEME_PROPERTIES[nextTheme]).forEach(([name, property]) => {
      root.style.setProperty(name, property);
    });

    // set state
    setTheme(nextTheme);
  };


  return (
    <button className={styles.action} onClick={toggleTheme}>
      {theme === "light" ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
