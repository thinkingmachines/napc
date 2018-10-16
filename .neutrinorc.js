module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'napc',
          links: [
            '/static/css/style.css'
          ],
          appMountIds: [
            'map'
          ]
        }
      }
    ]
  ]
}
