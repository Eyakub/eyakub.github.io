import {
  Link,
  Stack,
  Heading,
  Text,
  Box,
  SimpleGrid,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Cards from './Card'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import projectsData from '../data/projects.json'

export default function FeaturedProjects() {
  return (
    <Stack spacing={8} w="full">
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={16}>
        <SlideUpWhenVisible threshold={0.1}>
          <Stack spacing={1}>
            <Stack
              isInline
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading
                color="displayColor"
                fontFamily="Ubuntu"
                fontSize={{ base: 'xl', md: '2xl' }}
              >
                All Creative Works.
              </Heading>
              <NextLink passHref href="/projects">
                <Link>
                  <Text
                    _hover={{ color: 'button2' }}
                    color="button1"
                    display={{ base: 'block', md: 'none' }}
                    fontSize={{ base: 'sm', md: 'xl' }}
                  >
                    {' '}
                    Explore more &rarr;
                  </Text>
                </Link>
              </NextLink>
            </Stack>
            <Text color="textSecondary" fontSize={{ base: 'md', md: 'xl' }}>
              Here's some of my projects that I have worked on.
            </Text>
            <NextLink href="/projects">
              <Link>
                <Text
                  display={{ base: 'none', md: 'block' }}
                  fontSize={{ base: 'md', md: 'xl' }}
                >
                  Explore more &rarr;
                </Text>
              </Link>
            </NextLink>
          </Stack>
        </SlideUpWhenVisible>
        <SlideUpWhenVisible>
            <Cards
              slug={projectsData[0].fields.slug}
              desc={projectsData[0].fields.description}
              imageURL={projectsData[0].fields.imageUrl}
              liveUrl={projectsData[0].fields.liveUrl}
              tag={projectsData[0].fields.tags}
              title={projectsData[0].fields.title}
            />
          </SlideUpWhenVisible>
          <SlideUpWhenVisible>
            <Box mt={{ md: '-50%' }}>
              <Cards
                slug={projectsData[1].fields.slug}
                desc={projectsData[1].fields.description}
                imageURL={projectsData[1].fields.imageUrl}
                liveUrl={projectsData[1].fields.liveUrl}        
                tag={projectsData[1].fields.tags}
                title={projectsData[1].fields.title}
              />
            </Box>
          </SlideUpWhenVisible>
          <SlideUpWhenVisible threshold={0.8}>
            <Cards
              slug={projectsData[2].fields.slug}
              desc={projectsData[2].fields.description}
              imageURL={projectsData[2].fields.imageUrl}
              liveUrl={projectsData[2].fields.liveUrl}      
              tag={projectsData[2].fields.tags}
              title={projectsData[2].fields.title}
            />
          </SlideUpWhenVisible>
      </SimpleGrid>
    </Stack>
  )
}
