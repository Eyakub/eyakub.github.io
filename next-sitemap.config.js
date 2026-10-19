module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eyakub.github.io',
  generateRobotsTxt: true,
  // unlisted pages, reachable only by their URL
  exclude: ['/terminal', '/switch', '/preview/*', '/workout', '/workout/*'],
  // output: 'export' copies public/ before postbuild runs, so write straight into out/
  outDir: 'out',
}
