// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import 'dotenv/config'; // Ou require('dotenv').config(); si CommonJS

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Agence BB Doc",
  tagline: "Dinosaurs are cool",
  favicon: "img/BBS.png",

  // Set the production url of your site here
  url: "https://docs.agence-bb.ch/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  noIndex: false, // Defaults to `false`

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },

  presets: [
    [
      "classic",
      {
        docs: false, // <------ désactive la doc "classique"
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],  

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "rh",
        path: "docs-rh", // Dossier de ta doc RH
        routeBasePath: "rh", // URL => /rh
        sidebarPath: require.resolve("./sidebarsRh.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "digital",
        path: "docs-digital", // Dossier de ta doc Digital/Web
        routeBasePath: "digital", // URL => /digital
        sidebarPath: require.resolve("./sidebarsDigital.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "onboarding",
        path: "docs-onboarding", // Dossier de ta doc Onboarding
        routeBasePath: "onboarding", // URL => /onboarding
        sidebarPath: require.resolve("./sidebarsOnboarding.js"),
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: 'Agence BB Doc',
        logo: {
          alt: 'Agence BB Logo',
          src: 'img/BBS.png',
        },
        items: [
          {
            to: '/rh', // page d'accueil RH
            label: 'RH',
            position: 'left',
          },
          {
            to: '/digital', // page d'accueil Digital/Web
            label: 'Digital & Web',
            position: 'left',
          },
          {
            to: '/onboarding', // page d'accueil Onboarding
            label: 'Onboarding',
            position: 'left',
          },
        ],
      },      
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "X",
                href: "https://x.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      algolia: {
        // The application ID provided by Algolia
        appId: process.env.ALGOLIA_APP_ID,

        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,

        indexName: "crawler_Agence BB Doc Crawler",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/docs/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,

        //... other Algolia params
      },
    }),
};

export default config;
