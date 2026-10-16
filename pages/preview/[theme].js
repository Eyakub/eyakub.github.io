import Head from 'next/head'
import Container from '../../components/Container'
import { THEMES, themeById } from '../../components/themes'

export default function Preview({ id }) {
  const { name, Home } = themeById(id)
  return (
    <>
      <Head>
        <title>{`${name} preview · Eyakub Sorkar`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Container>
        <Home />
      </Container>
    </>
  )
}

export function getStaticPaths() {
  return { paths: THEMES.map((t) => ({ params: { theme: t.id } })), fallback: false }
}

export function getStaticProps({ params }) {
  return { props: { id: params.theme } }
}
