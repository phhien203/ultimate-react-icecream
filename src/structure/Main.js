import React from 'react';
import { Helmet } from 'react-helmet';

export default function Main({ children, headingText, headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <main>
      <Helmet>
        <title>{headingText} | Ultimate Ice Cream</title>
      </Helmet>
      <H className="main-heading">{headingText}</H>
      {children}
    </main>
  );
}
