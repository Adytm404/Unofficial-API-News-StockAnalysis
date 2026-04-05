// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'StockAnalysis Unofficial API',
  tagline: 'Dokumentasi endpoint news dan IPO news',
  url: 'http://localhost:3000',
  baseUrl: '/',
  organizationName: 'local',
  projectName: 'be-next-stockanalysts',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'id',
    locales: ['id']
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'StockAnalysis API',
        items: [
          {
            to: '/',
            label: 'Dokumentasi',
            position: 'left'
          },
          {
            href: '/api/news',
            label: 'GET /api/news',
            position: 'right'
          },
          {
            href: '/api/news/ipos',
            label: 'GET /api/news/ipos',
            position: 'right'
          },
          {
            href: '/api/trending',
            label: 'GET /api/trending',
            position: 'right'
          },
          {
            href: '/api/gainers',
            label: 'GET /api/gainers',
            position: 'right'
          },
          {
            href: '/api/losers',
            label: 'GET /api/losers',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        copyright: 'Unofficial API documentation for StockAnalysis news.'
      },
      docs: {
        sidebar: {
          hideable: false
        }
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true
      }
    })
}

module.exports = config
