import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import projectsData from '../data/projects.json'

const TAG_COLORS = {
  python: 'orange',
  fastapi: 'green',
  django: 'green',
  drf: 'green',
  'gemini ai': 'purple',
  react: 'blue',
  'next.js': 'gray',
  'node.js': 'green',
  vuejs: 'green',
  javascript: 'yellow',
  typescript: 'blue',
  'tailwind css': 'cyan',
  aws: 'orange',
  docker: 'blue',
  kubernetes: 'blue',
  git: 'red',
}
const tagColor = (t) => TAG_COLORS[t.toLowerCase()] || 'gray'

const MAX_VISIBLE_TAGS = 4

function ProjectCard({ project, featured = false }) {
  const { title, imageUrl, liveUrl, tags = [], description } = project.fields
  const desc = Array.isArray(description) ? description.filter(Boolean)[0] : description
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS)
  const overflowCount = tags.length - visibleTags.length

  return (
    <Flex
      as="article"
      direction="column"
      bg="#0e0f12"
      border="1px solid"
      borderColor={featured ? 'rgba(60,207,145,0.35)' : '#1c1f25'}
      rounded="lg"
      overflow="hidden"
      h="full"
      transition="border-color 0.2s ease, transform 0.2s ease"
      _hover={{
        borderColor: featured ? 'button1' : '#2a2e36',
        transform: 'translateY(-4px)',
      }}
    >
      {/* Image */}
      <Box position="relative" w="full" pt="56.25%" overflow="hidden" bg="#070809">
        <Box
          as="img"
          src={imageUrl}
          alt={title}
          loading="lazy"
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.4s ease"
          sx={{ '.group:hover &': { transform: 'scale(1.05)' } }}
        />
        <Box
          aria-hidden
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, transparent 60%, rgba(0,0,0,0.7))"
        />
        {liveUrl && (
          <HStack
            position="absolute"
            top={3}
            left={3}
            spacing={1.5}
            bg="rgba(60,207,145,0.15)"
            color="button1"
            px={2.5}
            py={1}
            rounded="full"
            fontSize="xs"
            fontWeight="600"
            backdropFilter="blur(6px)"
            border="1px solid rgba(60,207,145,0.3)"
          >
            <Box
              w="6px"
              h="6px"
              bg="button1"
              rounded="full"
              boxShadow="0 0 8px #3CCF91"
            />
            <Text>Live</Text>
          </HStack>
        )}
      </Box>

      {/* Body */}
      <Flex direction="column" flex="1" p={{ base: 5, md: 6 }} gap={3}>
        <Flex align="center" justify="space-between" gap={3}>
          <Heading
            as="h3"
            color="displayColor"
            fontFamily="Ubuntu"
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="700"
            lineHeight="1.25"
          >
            {title}
          </Heading>
          {liveUrl && (
            <Box
              as="a"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} live site`}
              color="textSecondary"
              p={2}
              rounded="md"
              transition="all 0.2s ease"
              _hover={{ color: 'button1', bg: 'rgba(60,207,145,0.08)' }}
            >
              <FaExternalLinkAlt size={14} />
            </Box>
          )}
        </Flex>

        {desc && (
          <Text
            color="textSecondary"
            fontSize={{ base: 'sm', md: 'sm' }}
            lineHeight="1.65"
            noOfLines={3}
          >
            {desc}
          </Text>
        )}

        <Wrap spacing={2} mt="auto" pt={3} borderTop="1px solid #1c1f25">
          {visibleTags.map((t) => (
            <WrapItem key={t}>
              <Tag
                size="sm"
                variant="subtle"
                colorScheme={tagColor(t)}
                fontSize="xs"
                fontWeight="500"
                opacity={0.92}
              >
                {t}
              </Tag>
            </WrapItem>
          ))}
          {overflowCount > 0 && (
            <WrapItem>
              <Tag
                size="sm"
                variant="subtle"
                colorScheme="gray"
                fontSize="xs"
                fontWeight="500"
                opacity={0.7}
              >
                +{overflowCount} more
              </Tag>
            </WrapItem>
          )}
        </Wrap>
      </Flex>
    </Flex>
  )
}

export default function FeaturedProjects() {
  // First card gets the "Featured" treatment (current/headline project)
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

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 7 }} px={{ base: 4, md: 6 }} maxW="6xl" w="full" mx="auto">
        {featuredProjects.map((project, i) => (
          <SlideUpWhenVisible key={project.fields.slug} threshold={0.1}>
            <Box className="group" h="full">
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
