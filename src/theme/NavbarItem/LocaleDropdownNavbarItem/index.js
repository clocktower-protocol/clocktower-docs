import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import {mergeSearchStrings, useHistorySelector} from '@docusaurus/theme-common';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';
import styles from './styles.module.css';

function stripLocalePrefix(pathname, locales, defaultLocale) {
  for (const locale of locales) {
    if (locale === defaultLocale) {
      continue;
    }
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length) || '/';
    }
  }
  return pathname;
}

function toLocalizedPath(canonicalPath, locale, defaultLocale) {
  if (locale === defaultLocale) {
    return canonicalPath;
  }
  return `/${locale}${canonicalPath === '/' ? '' : canonicalPath}`;
}

function useLocaleDropdownUtils() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const {localeConfigs, defaultLocale, locales} = i18n;
  const alternatePageUtils = useAlternatePageUtils();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);
  const pathname = useHistorySelector((history) => history.location.pathname);
  const isDev = process.env.NODE_ENV === 'development';
  const dualDev = siteConfig.customFields?.i18nDualDev === true;
  const devPorts = siteConfig.customFields?.i18nDevPorts ?? {en: 3000, es: 3001};

  const getLocaleConfig = (locale) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(
        `Docusaurus bug, no locale config found for locale=${locale}`,
      );
    }
    return localeConfig;
  };

  const getDevURL = (locale) => {
    const canonicalPath = stripLocalePrefix(pathname, locales, defaultLocale);
    const localizedPath = toLocalizedPath(canonicalPath, locale, defaultLocale);
    const port = devPorts[locale] ?? 3000;
    const finalSearch = mergeSearchStrings([search], 'append');
    return `http://localhost:${port}${localizedPath}${finalSearch}${hash}`;
  };

  const getBaseURLForLocale = (locale) => {
    const localeConfig = getLocaleConfig(locale);
    const isSameDomain = localeConfig.url === siteConfig.url;

    if (isSameDomain) {
      return `pathname://${alternatePageUtils.createUrl({
        locale,
        fullyQualified: false,
      })}`;
    }

    return alternatePageUtils.createUrl({
      locale,
      fullyQualified: true,
    });
  };

  return {
    getURL: (locale, options) => {
      if (isDev && dualDev) {
        return getDevURL(locale);
      }

      const finalSearch = mergeSearchStrings(
        [search, options.queryString],
        'append',
      );
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale) => getLocaleConfig(locale).label,
    getLang: (locale) => getLocaleConfig(locale).htmlLang,
  };
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}) {
  const {siteConfig, i18n} = useDocusaurusContext();
  const isDev = process.env.NODE_ENV === 'development';
  const dualDev = siteConfig.customFields?.i18nDualDev === true;

  // Docusaurus dev serves one locale per process. Hiding the dropdown prevents
  // accidental /es/ URLs that look like Spanish or 404. Use npm run start:i18n
  // when you need to switch locales locally.
  if (isDev && !dualDev) {
    return null;
  }

  const utils = useLocaleDropdownUtils();
  const {currentLocale, locales} = i18n;
  const localeItems = locales.map((locale) => {
    return {
      label: utils.getLabel(locale),
      lang: utils.getLang(locale),
      to: utils.getURL(locale, {queryString}),
      target: '_self',
      autoAddBaseUrl: false,
      className:
        locale === currentLocale
          ? mobile
            ? 'menu__link--active'
            : 'dropdown__link--active'
          : '',
    };
  });
  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];
  const dropdownLabel = mobile
    ? translate({
        message: 'Languages',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : utils.getLabel(currentLocale);
  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage className={styles.iconLanguage} />
          {dropdownLabel}
        </>
      }
      items={items}
    />
  );
}