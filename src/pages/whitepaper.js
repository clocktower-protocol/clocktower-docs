import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

function getWhitepaperPdfPath(locale) {
  return locale === 'es' ? 'wp/v5_whitepaper_es.pdf' : 'wp/v5_whitepaper.pdf';
}

export default function Whitepaper() {
  const {i18n} = useDocusaurusContext();
  const pdfUrl = useBaseUrl(getWhitepaperPdfPath(i18n.currentLocale), {
    locale: i18n.currentLocale,
  });

  useEffect(() => {
    window.location.replace(pdfUrl);
  }, [pdfUrl]);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${pdfUrl}`} />
        <link rel="canonical" href={pdfUrl} />
      </Head>
      <main style={{padding: '2rem', textAlign: 'center'}}>
        <p>
          <Translate
            id="whitepaper.redirect.message"
            description="Message shown while redirecting to the whitepaper PDF">
            Redirecting to the whitepaper PDF...
          </Translate>
        </p>
        <p>
          <a href={pdfUrl}>
            <Translate
              id="whitepaper.redirect.link"
              description="Fallback link when the whitepaper redirect does not happen automatically">
              Click here if you are not redirected automatically.
            </Translate>
          </a>
        </p>
      </main>
    </>
  );
}