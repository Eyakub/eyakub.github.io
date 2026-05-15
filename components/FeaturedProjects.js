import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import projectsData from '../data/projects.json'
import ProjectCard from './ProjectCard'

export default function FeaturedProjects() {
  const featuredProjects = projectsData.slice(0, 3)

  return (
    <Stack spacing={12} w="full" py={16}>
      <Stack spacing={3} textAlign="center">
        <Text
          color="button1"
          fontSize="sm"
          fontWeight="600"
          letterSpacing="0.25em"
          textTransform="uppercase"
        >
          Selected Work
        </Text>
        <Heading
          color="displayColor"
          fontFamily="Ubuntu"
          fontSize={{ base: '3xl', md: '4xl' }}
        >
          Recent Projects
        </Heading>
        <Text color="textSecondary" fontSize={{ base: 'sm', md: 'md' }}>
          A few products I&apos;ve shipped recently — serving real users in production.
        </Text>
      </Stack>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 6, md: 7 }}
        px={{ base: 4, md: 6 }}
        maxW="6xl"
        w="full"
        mx="auto"
      >
        {featuredProjects.map((project, i) => (
          <SlideUpWhenVisible key={project.fields.slug} threshold={0.1}>
            <Box h="full">
              <ProjectCard project={project} featured={i === 0} />
            </Box>
          </SlideUpWhenVisible>
        ))}
      </SimpleGrid>

      <Flex justify="center">
        <Button
          as={NextLink}
          href="/projects"
          variant="ghost"
          color="button1"
          rightIcon={<FaArrowRight size={12} />}
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight="600"
          _hover={{ bg: 'rgba(60,207,145,0.08)' }}
          _focus={{ boxShadow: '0 0 0 2px rgba(60,207,145,0.5)' }}
        >
          View all projects
        </Button>
      </Flex>
    </Stack>
  )
}
