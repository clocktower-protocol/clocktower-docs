import React, { useEffect } from 'react';

export default function Whitepaper() {
  useEffect(() => {
    // Immediately redirect to Spanish PDF
    window.location.replace('/wp/v5_whitepaper_es.pdf');
  }, []);

  // This will never render as the redirect happens immediately
  return null;
}
