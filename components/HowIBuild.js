import { Box, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react'
import { Check, GitBranch, ListChecks, Network } from 'lucide-react'
import { TOPICS } from '../data/learn'
import homepage from '../data/homepage.json'
import SectionHead, { MONO } from './SectionHead'

const STEPS = [
  [ListChecks, 'Spec and options', 'I write the spec, then compare two or three playable design options before any production code.'],
  [Network, 'Orchestrate', 'A planner agent splits the work. One maps the code, workers implement, a deep-reasoning agent takes the single hardest problem.'],
  [GitBranch, 'Isolate', 'Each task runs in its own git worktree, so parallel agents never step on each other.'],
  [Check, 'Verify and commit', 'Tests, type-check and real-browser screenshots before anything is called done. One commit per feature.'],
]

const max = Math.max(...homepage.sprint.map((d) => d.n))
const chartLabel = `Commits per day, 4 to 13 October: ${homepage.sprint.map((d) => `${d.day}th ${d.n}`).join(', ')}`

export default function HowIBuild() {
  const films = Object.keys(TOPICS).length
  return (
    <Box as="section" id="build" w="full" scrollMarginTop="80px" pt={{ base: '56px', md: '96px' }}>
      <SectionHead eyebrow="How I build">One engineer, a team of agents, every change reviewed</SectionHead>

      <SimpleGrid as="ol" columns={{ base: 1, sm: 2, md: 4 }} gap="12px" listStyleType="none" m={0} p={0}>
        {STEPS.map(([Icon, title, text], i) => (
          <Box as="li" key={title} bg="#0e0f12" border="1px solid #1c1f25" borderRadius="12px" p="18px">
            <Flex align="center" justify="space-between" mb="10px">
              <Flex boxSize="40px" borderRadius="10px" bg="rgba(60,207,145,0.12)" color="button1" align="center" justify="center">
                <Icon size={20} aria-hidden="true" />
              </Flex>
              <Text fontFamily={MONO} fontSize="12px" fontWeight="500" color="textSecondary">
                0{i + 1}
              </Text>
            </Flex>
            <Heading as="h3" mb="10px" fontSize="16px" color="displayColor">
              {title}
            </Heading>
            <Text fontSize="14px" lineHeight="1.55" color="textSecondary">
              {text}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <SimpleGrid
        mt="12px"
        columns={{ base: 1, md: 2 }}
        templateColumns={{ md: 'minmax(0,1fr) minmax(0,1.3fr)' }}
        gap="28px"
        alignItems="end"
        p="24px"
        border="1px solid rgba(60,207,145,0.3)"
        borderRadius="12px"
        bg="linear-gradient(180deg, rgba(60,207,145,0.06), transparent)"
      >
        <Box>
          <Text fontFamily={MONO} fontSize="11px" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase" color="button1">
            Receipt
          </Text>
          <Heading as="h3" mt="6px" mb="8px" fontSize="22px" letterSpacing="-0.015em" color="displayColor">
            /learn: {films} films in 10 days
          </Heading>
          <Text mb="12px" fontSize="14px" color="textSecondary">
            163 commits between 4 and 13 Oct 2026. Every film went through the same loop: spec, agents, verify, commit.
          </Text>
          <Link href="https://github.com/Eyakub/eyakub.github.io/commits/master" isExternal color="button1" fontSize="14px" fontWeight="600">
            Browse the commit log →
          </Link>
        </Box>
        <Box>
          <Box role="img" aria-label={chartLabel}>
            <Flex aria-hidden="true" gap="6px" align="end" h="150px" borderBottom="1px solid #2a2e36">
              {homepage.sprint.map(({ day, n }) => (
                <Flex key={day} flex="1" minW={0} direction="column" justify="flex-end" align="center" gap="4px" h="full">
                  <Text fontSize="11px" fontWeight="600" color="displayColor" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {n}
                  </Text>
                  <Box
                    w="full"
                    minH="2px"
                    h={n ? `${(n / max) * 82}%` : '2px'}
                    bg={n ? 'button1' : '#2a2e36'}
                    borderRadius="4px 4px 0 0"
                  />
                </Flex>
              ))}
            </Flex>
            <Flex aria-hidden="true" gap="6px" mt="6px" fontFamily={MONO} fontSize="11px" color="textSecondary">
              {homepage.sprint.map(({ day }) => (
                <Box key={day} flex="1" minW={0} textAlign="center">
                  {day}
                </Box>
              ))}
            </Flex>
          </Box>
          <Text mt="8px" fontSize="12px" color="textSecondary">
            Commits per day to eyakub.github.io, October 2026
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
