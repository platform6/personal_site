// src/components/MetaTags.js
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const t = Math.floor(new Date().getTime() / 1000);

const MetaTags = ({ title, description, keywords, image, alt }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />

    {/* Open Graph meta tags */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    {/* TODO: // fix all alts */}
    <meta
      property="og:image:alt"
      content={alt ? alt : 'alt text not available'}
    />
    <meta property="og:updated_time" content={t} />
    <meta property="og:url" content="https://garrettc.dev" />
    <meta property="og:type" content="article" />
  </Helmet>
);

export const HelmetWrapper = ({ children }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default MetaTags;
