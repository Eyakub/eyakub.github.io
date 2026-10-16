import Head from 'next/head'
import Container from '../components/Container'
import Terminal from '../components/terminal/Terminal'

const TITLE = 'Terminal · Eyakub Sorkar'
const DESCRIPTION = "Explore Eyakub Sorkar's projects, experience and stack from a terminal."

export default function TerminalPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="title" content={TITLE} />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eyakub.github.io/terminal" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="https://eyakub.github.io/og.png" />
      </Head>
      <Container>
        <Terminal />
      </Container>
    </>
  )
}
