import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { FolderOpen, X } from 'lucide-react'
import Head from 'next/head'
import Container from '../../components/Container'
import ProjectCard from '../../components/ProjectCard'
import projectsData from '../../data/projects.json'

export default function Projects({ projects }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)

  const allTags = useMemo(() => {
    const set = new Set()
    projects.forEach((p) => (p.fields.tags || []).forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [projects])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesQuery =
        !q ||
        p.fields.title.toLowerCase().includes(q) ||
        (p.fields.tags || []).some((t) => t.toLowerCase().includes(q))
      const matchesTag = !activeTag || (p.fields.tags || []).includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [projects, query, activeTag])

  const clearFilters = () => {
    setQuery('')
    setActiveTag(null)
  }

  const hasActiveFilters = query || activeTag

  return (
    <>
      <Head>
        <title>Projects — Eyakub Sorkar</title>
        <meta name="title" content="Projects — Eyakub Sorkar" />
        <meta
          name="description"
          content="An archive of things Eyakub Sorkar has built — full-stack systems, AI features, and shipped products."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eyakub.github.io/projects" />
        <meta property="og:title" content="Projects — Eyakub Sorkar" />
        <meta
          property="og:description"
          content="An archive of things Eyakub Sorkar has built."
        />
      </Head>

      <Container>
        <Stack
          justifyContent="center"
          my={{ base: '12vh', md: '14vh' }}
          spacing={10}
        >
          {/* Header */}
          <Stack spacing={4}>
            <HStack spacing={3} color="textSecondary">
              <Text
                fontFamily="Ubuntu"
                fontSize="sm"
                fontWeight="700"
                color="button1"
                letterSpacing="0.18em"
              >
                ALL
              </Text>
              <Box w="32px" h="1px" bg="#2a2e36" />
              <Text
                fontSize="xs"
                letterSpacing="0.25em"
                textTransform="uppercase"
                fontWeight="600"
              >
                Archive
              </Text>
            </HStack>

            <Heading
              color="displayColor"
              fontFamily="Ubuntu"
              fontSize={{ base: '4xl', md: '6xl' }}
              letterSpacing={{ base: '-1px', md: '-1.5px' }}
              lineHeight="1"
            >
              Projects
            </Heading>

            <Text
              color="textSecondary"
              fontSize={{ base: 'md', md: 'lg' }}
              maxW="60ch"
              lineHeight="1.65"
            >
              An archive of things I&apos;ve built — full-stack systems, AI features, and shipped products. {projects.length} total.
            </Text>
          </Stack>

          {/* Search + tag filters */}
          <Stack spacing={4}>
            <InputGroup maxW={{ base: 'full', md: '420px' }}>
              <InputLeftElement pointerEvents="none" color="textSecondary">
                <FaSearch size={14} />
              </InputLeftElement>
              <Input
                placeholder="Search by name or tech"
                type="text"
                bg="#0e0f12"
                color="displayColor"
                borderColor="#1c1f25"
                _hover={{ borderColor: '#2a2e36' }}
                _focus={{
                  borderColor: 'button1',
                  boxShadow: '0 0 0 1px #3CCF91',
                }}
                _placeholder={{ color: 'gray.500' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>

            <Wrap spacing={2}>
              <WrapItem>
                <Tag
                  size="md"
                  variant={activeTag === null ? 'solid' : 'outline'}
                  bg={activeTag === null ? 'rgba(60,207,145,0.15)' : 'transparent'}
                  color={activeTag === null ? 'button1' : 'textSecondary'}
                  borderColor={activeTag === null ? 'rgba(60,207,145,0.4)' : '#1c1f25'}
                  border="1px solid"
                  cursor="pointer"
                  fontWeight="600"
                  fontSize="xs"
                  onClick={() => setActiveTag(null)}
                  _hover={{ borderColor: '#3a3f4a' }}
                >
                  All
                </Tag>
              </WrapItem>
              {allTags.map((t) => {
                const isActive = activeTag === t
                return (
                  <WrapItem key={t}>
                    <Tag
                      size="md"
                      bg={isActive ? 'rgba(60,207,145,0.15)' : 'transparent'}
                      color={isActive ? 'button1' : 'textSecondary'}
                      borderColor={isActive ? 'rgba(60,207,145,0.4)' : '#1c1f25'}
                      border="1px solid"
                      cursor="pointer"
                      fontWeight={isActive ? '700' : '500'}
                      fontSize="xs"
                      onClick={() => setActiveTag(isActive ? null : t)}
                      _hover={{ borderColor: '#3a3f4a' }}
                    >
                      {t}
                    </Tag>
                  </WrapItem>
                )
              })}
            </Wrap>
          </Stack>

          {/* Result count + clear */}
          <Flex
            justify="space-between"
            align="center"
            borderTop="1px solid #1c1f25"
            pt={4}
          >
            <Text color="textSecondary" fontSize="sm">
              Showing{' '}
              <Box as="span" color="displayColor" fontWeight="700">
                {filtered.length}
              </Box>{' '}
              of {projects.length} projects
            </Text>
            {hasActiveFilters && (
              <Button
                size="xs"
                variant="ghost"
                color="textSecondary"
                leftIcon={<X size={12} />}
                onClick={clearFilters}
                _hover={{ color: 'button1', bg: 'rgba(60,207,145,0.08)' }}
              >
                Clear filters
              </Button>
            )}
          </Flex>

          {/* Grid */}
          {filtered.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 7 }}>
              {filtered.map((project) => (
                <ProjectCard
                  key={project.fields.slug}
                  project={project}
                  showAllTags
                />
              ))}
            </SimpleGrid>
          ) : (
            <Flex
              direction="column"
              align="center"
              gap={4}
              py={16}
              bg="#0e0f12"
              border="1px dashed #1c1f25"
              rounded="lg"
            >
              <Flex
                align="center"
                justify="center"
                w="56px"
                h="56px"
                rounded="full"
                bg="rgba(60,207,145,0.08)"
                color="button1"
              >
                <FolderOpen size={24} />
              </Flex>
              <Stack spacing={1} textAlign="center">
                <Text color="displayColor" fontWeight="700" fontSize="lg">
                  No projects match
                </Text>
                <Text color="textSecondary" fontSize="sm">
                  Try a different search term or clear the filters.
                </Text>
              </Stack>
              <Button
                size="sm"
                bg="button1"
                color="#0b0c0f"
                fontWeight="700"
                onClick={clearFilters}
                _hover={{ bg: '#34b67e' }}
              >
                Clear filters
              </Button>
            </Flex>
          )}
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
