module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/inchkiev-test/'
    : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Inchkiev test',
    },
  },
  pwa: {
    name: 'Inchkiev test',
  }
}
