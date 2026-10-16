import { Fragment } from 'react'
import Head from 'next/head'
import Container from '../components/Container'
import { themeById } from '../components/themes'
import site from '../data/site.json'

const TITLE = 'Eyakub Sorkar · Full-stack engineer'
const DESCRIPTION =
  "Full-stack engineer in Dhaka. I build the parts of a business that can't break: orders, payments, deliveries, compliance. Python, Django, FastAPI, PostgreSQL, Next.js."
const URL = 'https://eyakub.github.io/'
const OG_IMAGE = 'https://eyakub.github.io/og.png'

const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Eyakub Sorkar',
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'SDS Manager', url: 'https://sdsmanager.com/' },
  address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
  url: URL,
  sameAs: ['https://github.com/Eyakub', 'https://linkedin.com/in/eyakub-sorkar'],
  knowsAbout: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Next.js', 'LLMs', 'RAG', 'Docker', 'Kubernetes', 'Rust', 'Swift'],
}

const theme = themeById(site.home)
if (!theme) throw new Error(`data/site.json "home" is "${site.home}"; use one of the ids in components/themes.js`)
const { Home, bare } = theme
const Shell = bare ? Fragment : Container

export default function Index() {
  return (
    <Shell {...(bare ? {} : { enableTransition: true })}>
      <Head>
        <title>{TITLE}</title>
        <meta content={TITLE} name="title" />
        <meta content="eyakub, eyakub website" name="keywords" />
        <meta content={DESCRIPTION} name="description" />

        <meta content="website" property="og:type" />
        <meta content={URL} property="og:url" />
        <meta content={TITLE} property="og:title" />
        <meta content={DESCRIPTION} property="og:description" />
        <meta content={OG_IMAGE} property="og:image" />

        <meta content="summary_large_image" property="twitter:card" />
        <meta content={URL} property="twitter:url" />
        <meta content={TITLE} property="twitter:title" />
        <meta content={DESCRIPTION} property="twitter:description" />
        <meta content={OG_IMAGE} property="twitter:image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }} />
      </Head>

      <Home />
    </Shell>
  )
}
