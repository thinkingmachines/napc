module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'napc',
          appMountIds: ['map']
        }
      }
    ]
  ]
}
