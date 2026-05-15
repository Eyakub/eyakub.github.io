module.exports = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'imagizer.imageshack.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.giphy.com' },
      { protocol: 'https', hostname: 'cdn-images-1.medium.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'imgur.com' },
    ],
  },
  output: 'export',
  assetPrefix: './',
}
