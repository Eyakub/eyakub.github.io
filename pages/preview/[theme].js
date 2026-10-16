import { Fragment } from 'react'
import Head from 'next/head'
import Container from '../../components/Container'
import { THEMES, themeById } from '../../components/themes'

export default function Preview({ id }) {
  const { name, Home, bare } = themeById(id)
  const Shell = bare ? Fragment : Container
  return (
    <>
      <Head>
        <title>{`${name} preview · Eyakub Sorkar`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Shell>
        <Home />
      </Shell>
    </>
  )
}

export function getStaticPaths() {
  return { paths: THEMES.map((t) => ({ params: { theme: t.id } })), fallback: false }
}

export function getStaticProps({ params }) {
  return { props: { id: params.theme } }
}
