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
    ]
  ]
}
