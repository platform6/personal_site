// src/components/MetaTags.js
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MetaTags = ({ title, description, keywords, image, url }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />

    {/* Open Graph meta tags */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
  </Helmet>
);

export const HelmetWrapper = ({ children }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default MetaTags;
