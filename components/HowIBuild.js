import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Check, GitBranch, ListChecks, Network } from 'lucide-react'
import ContributionGraph from './ContributionGraph'
import SectionHead, { MONO } from './SectionHead'

const STEPS = [
  [ListChecks, 'Spec and options', 'I write the spec, then compare two or three playable design options before any production code.'],
  [Network, 'Orchestrate', 'A planner agent splits the work. One maps the code, workers implement, a deep-reasoning agent takes the single hardest problem.'],
  [GitBranch, 'Isolate', 'Each task runs in its own git worktree, so parallel agents never step on each other.'],
  [Check, 'Verify and commit', 'Tests, type-check and real-browser screenshots before anything is called done. One commit per feature.'],
]

export default function HowIBuild() {
  return (
    <Box as="section" id="build" w="full" scrollMarginTop="80px" pt={{ base: '56px', md: '96px' }}>
      <SectionHead eyebrow="How I build">Agents take the scoped work. Tests and the browser decide what ships.</SectionHead>

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

      <ContributionGraph />
    </Box>
  )
}
