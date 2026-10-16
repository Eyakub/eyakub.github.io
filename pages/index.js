import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import Container from '../components/Container'
import Introduction from '../components/Introduction'
import ProofStrip from '../components/ProofStrip'
import HowIBuild from '../components/HowIBuild'
import FeaturedProjects from '../components/FeaturedProjects'
import LearnBand from '../components/LearnBand'
import WorkExperience from '../components/WorkExperience'
import ContactMe from '../components/ContactMe'
import HomeFooter from '../components/HomeFooter'

const TITLE = 'Eyakub Sorkar · Backend + AI engineer'
const DESCRIPTION =
  'Backend engineer in Dhaka shipping AI features in Python. FastAPI, Django, Next.js, and a team of coding agents.'
const URL = 'https://eyakub.github.io/'
const OG_IMAGE = 'https://eyakub.github.io/og.png'

export default function Index() {
  return (
    <Container enableTransition={true}>
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
      </Head>

      <Stack as="main" alignItems="flex-start" mt={{ base: 4, md: 8 }} spacing={0} w="full">
        <Introduction />
        <ProofStrip />
        <HowIBuild />
        <FeaturedProjects />
        <LearnBand />
        <WorkExperience />
        <ContactMe />
        <HomeFooter />
      </Stack>
    </Container>
  )
}
