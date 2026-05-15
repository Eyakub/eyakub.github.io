import {
  Box,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'

const TAG_COLORS = {
  python: 'orange',
  fastapi: 'green',
  django: 'green',
  drf: 'green',
  flask: 'green',
  'gemini ai': 'purple',
  react: 'blue',
  'next.js': 'gray',
  'node.js': 'green',
  vuejs: 'green',
  'vue.js': 'green',
  javascript: 'yellow',
  typescript: 'blue',
  'tailwind css': 'cyan',
  aws: 'orange',
  docker: 'blue',
  kubernetes: 'blue',
  git: 'red',
  webpack: 'cyan',
}
const tagColor = (t) => TAG_COLORS[t.toLowerCase()] || 'gray'

const MAX_VISIBLE_TAGS = 4

export default function ProjectCard({ project, featured = false, showAllTags = false }) {
  const { title, imageUrl, liveUrl, tags = [], description } = project.fields
  const desc = Array.isArray(description) ? description.filter(Boolean)[0] : description
  const visibleTags = showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS)
  const overflowCount = showAllTags ? 0 : Math.max(0, tags.length - visibleTags.length)

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
      className="group"
      transition="border-color 0.2s ease, transform 0.2s ease"
      _hover={{
        borderColor: featured ? 'button1' : '#2a2e36',
        transform: 'translateY(-4px)',
      }}
    >
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

        {desc ? (
          <Text
            color="textSecondary"
            fontSize="sm"
            lineHeight="1.65"
            noOfLines={3}
          >
            {desc}
          </Text>
        ) : (
          <Text color="gray.500" fontSize="sm" fontStyle="italic">
            Description coming soon.
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
