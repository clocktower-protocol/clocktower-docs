// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

//import { useLocation } from '@docusaurus/router';
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Clocktower',
  tagline: 'Its Time',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://clocktowerdev.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  staticDirectories: ['static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Clocktower', // Usually your GitHub org/user name.
  projectName: 'Clocktower', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },

  //fonts
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "/static/fonts/univiapro-regular-webfont.woff2",
      },
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      //image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false
      },
      navbar: {
        
        title: 'Clocktower',
        hideOnScroll: false,
        /*
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        */
       
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'conceptsSidebar', // The ID of your sidebar
            label: 'Concepts',
            position: 'right'
          },
          {
            type: 'docSidebar',
            sidebarId: "howtoSidebar",
            label: 'How to',
            position: 'right'
          },
          {
            type: 'dropdown',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'contractsSidebar',
                label: 'Contract',
              },
              {
                to: 'pathname:///wp/v5_whitepaper.pdf',
                label: 'Whitepaper',
              },
              {
                label: 'Github',
                to: 'https://github.com/clocktower-protocol',
              },
              
            ],
            position: 'right',
            label: 'Documentation'
          },
          /*
          {
            type: 'localeDropdown',
            position: 'right',
          },
          */
          {
            to: 'https://app.clocktowerdev.com', // The path you want to link to
            label: 'App', // The text on the button
            position: 'right', // Positioning on the navbar
            className: 'button button--secondary button--lg', // CSS classes for styling
          },
          
         /*
          {
            type: 'docSidebar',
            sidebarId: 'conceptsSidebar',
            position: 'left',
            label: 'Concepts',
          },
          {
            type: 'docSidebar',
            sidebarId: 'contractsSidebar',
            position: 'left',
            label: 'Contract',
          },
          {
            type: 'docSidebar',
            sidebarId: "howtoSidebar",
            position: "left",
            label: 'Howto'
          },
          
          {
            to: 'pathname:///wp/v5_whitepaper.pdf',
            position: 'right',
            label: 'Whitepaper',
          },
          
          {
            label: 'Github',
            href: 'https://google.com',
            position: 'right'
          },
          */
        ],
        
      },
      footer: {
        //style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Concepts',
                to: '/docs/concepts/Clocktower Protocol/whatis',
              },
              {
                label: 'Contract',
                to: '/docs/contracts/Subscribe/subscribe_tech_reference',
              },
              {
                label: 'HowTo',
                to: '/docs/howto/howto/',
              },
              {
                label: 'Whitepaper',
                to: 'pathname:///wp/v5_whitepaper.pdf',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Clocktower-LLC',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Clocktower LLC.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
