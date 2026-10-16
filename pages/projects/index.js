import { useState } from 'react'
import { Box, Button, Heading, SimpleGrid, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import Head from 'next/head'
import Container from '../../components/Container'
import ProjectCard from '../../components/ProjectCard'
import projectsData from '../../data/projects.json'

const KINDS = [
  ['all', 'All'],
  ['work', 'Work'],
  ['founder', 'Founder'],
  ['open-source', 'Open source'],
]

const DESCRIPTION =
  'Projects by Eyakub Sorkar: work for SDS Manager, Goama and others, products he founded under Razlio, and open source.'

export default function Projects({ projects }) {
  const [kind, setKind] = useState('all')
  const count = (k) => (k === 'all' ? projects.length : projects.filter((p) => p.fields.kind === k).length)
  const shown = kind === 'all' ? projects : projects.filter((p) => p.fields.kind === kind)

  return (
    <>
      <Head>
        <title>Projects · Eyakub Sorkar</title>
        <meta name="title" content="Projects · Eyakub Sorkar" />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eyakub.github.io/projects" />
        <meta property="og:title" content="Projects · Eyakub Sorkar" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="https://eyakub.github.io/og.png" />
      </Head>

      <Container>
        <Stack justifyContent="center" my={{ base: '12vh', md: '14vh' }} spacing={10}>
          <Stack spacing={4}>
            <Text color="button1" fontSize="12px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase">
              Archive
            </Text>
            <Heading
              color="displayColor"
              fontFamily="Ubuntu"
              fontSize={{ base: '4xl', md: '6xl' }}
              letterSpacing={{ base: '-1px', md: '-1.5px' }}
              lineHeight="1"
            >
              Projects
            </Heading>
            <Text color="textSecondary" fontSize={{ base: 'md', md: 'lg' }} maxW="60ch" lineHeight="1.65">
              Work for the teams I&apos;ve been part of, products I founded under Razlio, and open source.{' '}
              {projects.length} in total.
            </Text>
          </Stack>

          <Wrap spacing={2} role="group" aria-label="Filter projects">
            {KINDS.map(([k, label]) => {
              const active = kind === k
              return (
                <WrapItem key={k}>
                  <Button
                    onClick={() => setKind(k)}
                    aria-pressed={active}
                    minH="40px"
                    px={4}
                    rounded="full"
                    fontSize="sm"
                    fontWeight="600"
                    bg={active ? 'rgba(60,207,145,0.15)' : 'transparent'}
                    color={active ? 'button1' : 'textSecondary'}
                    border="1px solid"
                    borderColor={active ? 'rgba(60,207,145,0.4)' : '#1c1f25'}
                    _hover={{ borderColor: '#3a3f4a', color: active ? 'button1' : 'displayColor' }}
                  >
                    {label}
                    <Box as="span" ml={2} color={active ? 'button1' : '#6b6e75'} fontWeight="500">
                      {count(k)}
                    </Box>
                  </Button>
                </WrapItem>
              )
            })}
          </Wrap>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 7 }}>
            {shown.map((project) => (
              <ProjectCard key={project.fields.slug} project={project} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      projects: projectsData,
    },
  }
}
