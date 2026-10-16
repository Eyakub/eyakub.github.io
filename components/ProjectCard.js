import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { ArrowUpRight } from 'lucide-react'
import { Chips } from './FeaturedProjects'
import { MONO } from './SectionHead'

const STATUS = {
  live: ['Live', '#3CCF91'],
  'in-development': ['In development', '#F2B53A'],
  'open-source': ['Open source', '#8EA2FF'],
  archived: ['Archived', '#9EA0A6'],
}

export default function ProjectCard({ project }) {
  const { title, imageUrl, liveUrl, summary, meta, chips, status } = project.fields
  const [label, dot] = STATUS[status]

  return (
    <Flex
      as="article"
      direction="column"
      bg="#0e0f12"
      border="1px solid #1c1f25"
      rounded="lg"
      overflow="hidden"
      h="full"
      className="group"
      transition="border-color 0.2s ease, transform 0.2s ease"
      _hover={{ borderColor: '#2a2e36', transform: 'translateY(-4px)' }}
    >
      <Box position="relative" w="full" pt="56.25%" overflow="hidden" bg="#070809">
        <Box
          as="img"
          src={imageUrl}
          alt=""
          loading="lazy"
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.4s ease"
          sx={{ '.group:hover &': { transform: 'scale(1.05)' } }}
        />
      </Box>

      <Flex direction="column" flex="1" p={{ base: 5, md: 6 }} gap={3}>
        <Stack spacing={1.5} fontFamily={MONO} fontSize="12px">
          <HStack spacing={1.5} color="displayColor">
            <Box w="6px" h="6px" bg={dot} rounded="full" />
            <Text>{label}</Text>
          </HStack>
          <Text color="textSecondary">{meta}</Text>
        </Stack>
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
              aria-label={`Open ${title}`}
              color="textSecondary"
              p={2}
              rounded="md"
              transition="all 0.2s ease"
              _hover={{ color: 'button1', bg: 'rgba(60,207,145,0.08)' }}
            >
              <ArrowUpRight size={18} />
            </Box>
          )}
        </Flex>
        <Text color="textSecondary" fontSize="sm" lineHeight="1.65">
          {summary}
        </Text>
        <Box mt="auto" pt={3} borderTop="1px solid #1c1f25">
          <Chips items={chips} />
        </Box>
      </Flex>
    </Flex>
  )
}
