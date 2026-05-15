import Head from 'next/head'
import { Box, Stack } from '@chakra-ui/react'
import Container from '../components/Container'
import Introduction from '../components/Introduction'
import FeaturedProjects from '../components/FeaturedProjects'
import AboutMe from '../components/AboutMe'
import ContactMe from '../components/ContactMe'
import WorkExperience from '../components/WorkExperience' 

// Import JSON data
import introductionData from '../data/introduction.json'
import projectsData from '../data/projects.json'
import contactMeData from '../data/contactMe.json'
import workExperienceData from '../data/workexperience.json'


export default function Index() {
  return (
    <>
      <Container enableTransition={true}>
        <Head>
          <title>Eyakub - Software Engineer</title>
          <meta content="Eyakub - Software Engineer" name="title" />
          <meta content="eyakub, eyakub website" name="keywords" />
          <meta
            content="Software Engineer based in Bangladesh."
            name="description"
          />

          <meta content="website" property="og:type" />
          <meta content="https://eyakub.github.io" property="og:url" />
          <meta
            content="Eyakub - Software Engineer"
            property="og:title"
          />
          <meta
            content="Software Engineer based in Bangladesh."
            property="og:description"
          />
          <meta
            content="https://imgur.com/a/gY0ZSa5"
            property="og:image"
          />

          <meta content="summary_large_image" property="twitter:card" />
          <meta content="https://eyakub.github.io/" property="twitter:url" />
          <meta
            content="Eyakub - Software Engineer"
            property="twitter:title"
          />
          <meta
            content="Software Engineer based in Bangladesh."
            property="twitter:description"
          />
          <meta
            content="https://imgur.com/a/gY0ZSa5"
            property="twitter:image"
          />
        </Head>

        <Stack
          as="main"
          alignItems="flex-start"
          justifyContent="center"
          mt={{ base: '12vh', md: '16vh' }}
          pb="144px"
          spacing={{ base: '100px', md: '144px' }}
        >
          <Introduction introduction={introductionData} />
          <AboutMe />
          <Box id="projects" w="full" scrollMarginTop="80px">
            <FeaturedProjects projects={projectsData} />
          </Box>
          <WorkExperience  workExperience={workExperienceData}/>
          <ContactMe contactMe={contactMeData} />
        </Stack>
      </Container>
    </>
  )
}

// Remove getStaticProps since data is now imported directly from JSON
