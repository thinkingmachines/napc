require('dotenv').config()

module.exports = {
  use: [
    // '@neutrinojs/standardjs',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'napc',
          baseHref: '/',
          links: [
            '/static/css/style.css'
          ],
          appMountId: null,
          appMountIds: ['map', 'root']
        },
        minify: {
          babel: false
        }
      }
    ],
    ['@neutrinojs/env', ['MAPBOX_ACCESS_TOKEN']]
  ]
}
