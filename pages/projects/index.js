import { useState } from 'react'
import { Stack, Heading, Text, SimpleGrid, Divider } from '@chakra-ui/react'

import Cards from '../../components/Card'
import Container from '../../components/Container'
import Head from 'next/head'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { FaSearch } from 'react-icons/fa'
import projectsData from '../../data/projects.json'

export default function Projects({ projects }) {
  const [query, setQuery] = useState('')
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <Container>
        <Head>
          <title>Eyakub - Software Engineer</title>
          <meta content="Eyakub Sorkar - Software Engineer" name="title" />
          <meta
            content="Software Engineer based in Bangladesh"
            name="description"
          />

          <meta content="website" property="og:type" />
          <meta content="https://eyakub.github.io/projects" property="og:url" />
          <meta
            content="Eyakub Sorkar - Software Engineer"
            property="og:title"
          />
          <meta
            content="Software Engineer based in Bangladesh"
            property="og:description"
          />
          <meta
            content="https://imagizer.imageshack.com/a/img923/3917/IFUVhm.png"
            property="og:image"
          />

          <meta content="summary_large_image" property="twitter:card" />
          <meta
            content="https://eyakub.github.io/projects"
            property="twitter:url"
          />
          <meta
            content="Eyakub - Software Engineer"
            property="twitter:title"
          />
          <meta
            content="Software Engineer based in Bangladesh"
            property="twitter:description"
          />
          <meta
            content="https://imagizer.imageshack.com/a/img923/3917/IFUVhm.png"
            property="twitter:image"
          />
        </Head>
        <Stack
          justifyContent="center"
          my={{ base: '15vh', md: '16vh' }}
          spacing={10}
        >
          <Stack spacing={5}>
            {' '}
            <Heading color="displayColor" fontSize={{ base: '4xl', md: '6xl' }}>
              Projects
            </Heading>
            <Text fontSize={{ base: '14px', md: '16px' }} color="white">
              I love building projects and practice my engineering skills,
              here's an archive of things that I've worked on.
            </Text>
            <InputGroup maxW="400px">
              <InputRightElement pointerEvents="none">
                <FaSearch />
              </InputRightElement>
              <Input
                placeholder="Search projects"
                type="text"
                color="gray.100"
                value={query}
                onChange={handleChange}
              />
            </InputGroup>
            <Divider />
          </Stack>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
            {projects
              .filter((project) =>
                project.fields.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((project) => (
                <Cards
                  key={project.fields.title}
                  desc={project.fields.description}
                  imageURL={project.fields.imageUrl}
                  tag={project.fields.tags}
                  title={project.fields.title}
                  // slug={project.fields.slug}
                />
              ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const sortedProjects = projectsData.sort((a, b) => {
    return new Date(b.fields.date) - new Date(a.fields.date)
  })

  return {
    props: {
      projects: sortedProjects,
    },
  }
}
