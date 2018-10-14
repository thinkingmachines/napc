module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'napc',
          appMountIds: ['map'],
          links: [
            {
              href: 'css/style.css',
              rel: 'stylesheet'
            }
          ]
        }
      }
    ]
  ]
}
