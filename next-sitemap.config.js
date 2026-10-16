module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eyakub.github.io',
  generateRobotsTxt: true,
  // unlisted page, reachable only by its URL
  exclude: ['/terminal'],
  // output: 'export' copies public/ before postbuild runs, so write straight into out/
  outDir: 'out',
}
