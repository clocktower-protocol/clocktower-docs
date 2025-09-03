import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Whitepaper() {
  const { i18n } = useDocusaurusContext();
  
  useEffect(() => {
    // Immediately redirect to the correct PDF based on locale
    const pdfUrl = i18n.currentLocale === 'es' 
      ? '/wp/v5_whitepaper_es.pdf' 
      : '/wp/v5_whitepaper.pdf';
    
    // Use window.location.replace to avoid adding to browser history
    window.location.replace(pdfUrl);
  }, [i18n.currentLocale]);

  // This will never render as the redirect happens immediately
  return null;
}
