import React, {useEffect, useRef} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';

function stripForeignLocalePrefix(pathname, locales, currentLocale) {
  for (const locale of locales) {
    if (locale === currentLocale) {
      continue;
    }
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length) || '/';
    }
  }
  return null;
}

function addLocalePrefix(pathname, locale, defaultLocale) {
  if (locale === defaultLocale) {
    return pathname;
  }
  const prefix = `/${locale}`;
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    return pathname;
  }
  return `${prefix}${pathname === '/' ? '' : pathname}`;
}

/**
 * In single-locale dev, strip stale /es/ prefixes left over from preview,
 * production, or the old locale dropdown behavior.
 */
export default function Root({children}) {
  const {siteConfig, i18n} = useDocusaurusContext();
  const {currentLocale, defaultLocale, locales} = i18n;
  const location = useLocation();
  const redirected = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
    if (siteConfig.customFields?.i18nDualDev === true) {
      return;
    }

    const {pathname, search, hash} = location;
    const foreignPrefix = stripForeignLocalePrefix(pathname, locales, currentLocale);
    if (foreignPrefix !== null) {
      if (!redirected.current) {
        redirected.current = true;
        window.location.replace(`${foreignPrefix}${search}${hash}`);
      }
      return;
    }

    if (currentLocale !== defaultLocale) {
      const withPrefix = addLocalePrefix(pathname, currentLocale, defaultLocale);
      if (withPrefix !== pathname) {
        if (!redirected.current) {
          redirected.current = true;
          window.location.replace(`${withPrefix}${search}${hash}`);
        }
      }
    }
  }, [currentLocale, defaultLocale, locales, location, siteConfig.customFields]);

  return <>{children}</>;
}