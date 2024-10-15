import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'

import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { useRouter } from 'next/router'
import Container from '../../components/Container'
import MDXComponents from '../../components/MDXComponents'
import ProjectContainer from '../../components/ProjectContainer'

import { FaGithub, FaLink, FaUser } from 'react-icons/fa'
import NextSeoData from '../../components/NextSeoData'
import useUtterances from '../../hook/useUtterances'
import Image from 'next/image'

// Import JSON data
import projectsData from '../../data/projects.json'

export default function Post({ metadata, publishedDate, source, toc }) {
  const [views, setViews] = useState('...')

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    fetch(`/api/views/${slug}`)
      .then((res) => res.json())
      .then((json) => setViews(json.views))
  }, [slug])

  const [activeId, setActiveId] = useState()
  useEffect(() => {
    const handleScroll = () => {
      let currentId
      for (const heading of toc) {
        const element = document.getElementById(heading.title)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight / 2) {
            currentId = heading.title
          } else {
            break
          }
        }
      }
      setActiveId(currentId)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toc])

  const { isCommentsLoading } = useUtterances('comments', metadata.title)

  return (
    <>
      <NextSeoData
        slug={slug}
        metadata={metadata}
        publishedDate={publishedDate}
      />

      <Container>
        <Stack>
          <Stack
            mx="auto"
            mt="73px"
            border="1px"
            borderColor={{ base: '#333', md: 'borderColor' }}
            borderRadius="10px"
          >
            <Image
              width={1366}
              height={768}
              objectFit="cover"
              style={{
                borderRadius: '10px',
              }}
              alt=""
              priority
              src={metadata.frontmatter.image}
              blurDataURL={metadata.frontmatter.image}
            />
          </Stack>

          <Stack pt={4}>
            <Heading
              as="h1"
              color="displayColor"
              fontSize={['3xl', '3xl', '5xl', '5xl']}
            >
              {metadata.title}
            </Heading>
            <Text color="textPrimary" fontSize={['xs', 'xs', 'sm', 'sm']}>
              {metadata.frontmatter.summary}
            </Text>
            <HStack spacing={2}>
              <Text color="textPrimary" fontSize={['xs', 'xs', 'sm', 'sm']}>
                {views} views
              </Text>
              {metadata.frontmatter.githubLink && (
                <>
                  <Text>-</Text>
                  <HStack alignItems="center">
                    <FaGithub fontSize="20px" />
                    <Link
                      fontSize={['xs', 'xs', 'sm', 'sm']}
                      href={metadata.frontmatter.githubLink}
                      isExternal
                    >
                      Github
                    </Link>
                  </HStack>
                </>
              )}

              {metadata.frontmatter.deployLink && (
                <>
                  <Text>-</Text>
                  <HStack>
                    <FaLink fontSize="18px" />
                    <Link
                      fontSize={['xs', 'xs', 'sm', 'sm']}
                      href={metadata.frontmatter.deployLink}
                      isExternal
                    >
                      Live Site
                    </Link>
                  </HStack>
                </>
              )}
            </HStack>
            <HStack>
              <FaUser fill="#D1D5DB" fontSize="14px" />
              <Text color="#D1D5DB" fontSize={['xs', 'xs', 'sm', 'sm']}>
                {metadata.frontmatter.category}
              </Text>
            </HStack>
          </Stack>

          <Divider h="0.5px" my={4} bg="textSecondary" />
        </Stack>

        <HStack alignItems="start" pt="23px" spacing="36px">
          <Stack w={{ base: '100%', md: '50rem' }}>
            <ProjectContainer>
              <MDXRemote {...source} components={MDXComponents} />
            </ProjectContainer>
          </Stack>

          <Stack
            pos="sticky"
            top="6rem"
            display={{ base: 'none', md: 'flex' }}
            w="250px"
            h="500px"
          >
            <Text color="displayColor" fontSize="xl" fontWeight="semibold">
              Table of Contents
            </Text>

            {toc.map((heading) => (
              <Box key={heading.title} pl={`${heading.level * 1}rem`}>
                <Text
                  key={heading.id}
                  color={
                    heading.title === activeId ? 'activeColor' : 'textSecondary'
                  }
                  fontSize={['sm', 'sm', 'md', 'md']}
                  fontWeight={
                    heading.title === activeId ? 'semibold' : 'normal'
                  }
                >
                  <a href={`#${heading.title}`}>{heading.title}</a>
                </Text>
              </Box>
            ))}
          </Stack>
        </HStack>

        <Stack w="100%" mt="36px" mb="15vh">
          {isCommentsLoading && (
            <Center flexDir="column" pt={8}>
              <Spinner w="56px" h="56px" color="#058d92" thickness="5px" />
              <Text pt={2} color="textSecondary" fontSize="sm">
                Loading comments...
              </Text>
            </Center>
          )}
          <Stack opacity={isCommentsLoading ? 0 : 1}>
            <div id="comments" />
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    // Find the project data from JSON
    const project = projectsData.find(
      (project) => project.fields && project.fields.slug === params.slug
    )

    if (!project) {
      return {
        notFound: true,
      }
    }

    const source = project.body || ''
    project.readingTime = readingTime(source).text
    const mdxSource = await serialize(source, {
      mdxOptions: {
        rehypePlugins: [mdxPrism],
      },
    })

    const headings = source.match(/#{2,4} .+/g) || []
    const toc = headings.map((heading) => {
      const level = (heading.match(/#/g) || []).length - 2
      const title = heading.replace(/#{2,4} /, '')
      return { title, level }
    })

    return {
      props: {
        metadata: project,
        publishedDate: project.frontmatter && project.frontmatter.date 
          ? new Date(project.frontmatter.date).toISOString()
          : null,
        source: mdxSource,
        toc: toc,
      },
      revalidate: 30,
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true,
    }
  }
}
