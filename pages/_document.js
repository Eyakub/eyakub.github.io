import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossorigin href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          onload="this.onload=null;this.rel='stylesheet'"
          rel="stylesheet preload prefetch"
        />
        <link
          as="style"
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap"
          onload="this.onload=null;this.rel='stylesheet'"
          rel="stylesheet preload prefetch"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <meta content="black" name="theme-color" />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
