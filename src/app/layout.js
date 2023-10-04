import React from 'react';
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import RespectReducedMotion from '@/components/RespectReducedMotion';
import { cookies } from 'next/headers';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

async function RootLayout({ children,  }) {
  const theme = cookies().get('joy-of-react-blog-theme')?.value ?? 'light'; 

  return (
    <RespectReducedMotion>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-theme={theme}
        style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header theme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html></RespectReducedMotion>
  );
}

export default RootLayout;
