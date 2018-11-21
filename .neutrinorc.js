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
          appMountIds: ['map']
        },
        minify: {
          babel: false
        }
      }
    ]
  ]
}
