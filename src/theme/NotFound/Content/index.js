import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';

export default function NotFoundContent({className}) {
  const {
    i18n: {currentLocale, locales},
  } = useDocusaurusContext();
  const {pathname} = useLocation();
  const isDev = process.env.NODE_ENV === 'development';
  const isForeignLocalePath =
    isDev &&
    locales.some(
      (locale) =>
        locale !== currentLocale &&
        pathname.startsWith(`/${locale}/`),
    );

  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          {isForeignLocalePath ? (
            <p>
              <Translate
                id="theme.NotFound.localeDevHint"
                description="Hint shown in dev when switching to another locale"
                values={{
                  startEs: <code>npm run start:es</code>,
                  preview: <code>npm run preview</code>,
                }}>
                {
                  'The development server only runs one locale at a time. To preview Spanish, run {startEs} or test both locales with {preview}.'
                }
              </Translate>
            </p>
          ) : (
            <p>
              <Translate
                id="theme.NotFound.p2"
                description="The 2nd paragraph of the 404 page">
                Please contact the owner of the site that linked you to the
                original URL and let them know their link is broken.
              </Translate>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}