import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import data from '../data/contributions.json'
import { toWeeks } from '../lib/contributions'
import { MONO } from './SectionHead'

const LEVELS = ['#1a1d23', 'rgba(60,207,145,0.3)', 'rgba(60,207,145,0.52)', 'rgba(60,207,145,0.76)', '#3CCF91']
// 53 weeks don't fit a phone; show the last 26 there and the full year from md up.
const PHONE_WEEKS = 26

const weeks = toWeeks(data.from, data.days)
const privatePct = Math.round((data.private / data.total) * 100)
const long = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const shown = (i) => (i < weeks.length - PHONE_WEEKS ? { base: 'none', md: 'flex' } : 'flex')

export default function ContributionGraph() {
  return (
    <Box
      mt="12px"
      p={{ base: '18px', md: '24px' }}
      border="1px solid rgba(60,207,145,0.3)"
      borderRadius="12px"
      bg="linear-gradient(180deg, rgba(60,207,145,0.06), transparent)"
    >
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ md: 'flex-end' }} gap="10px" mb="20px">
        <Box>
          <Text fontFamily={MONO} fontSize="11px" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase" color="button1">
            Receipt
          </Text>
          <Heading as="h3" mt="6px" mb="6px" fontSize="22px" letterSpacing="-0.015em" color="displayColor">
            {data.total.toLocaleString('en-US')} contributions in the last 12 months
          </Heading>
          <Text fontSize="14px" color="textSecondary">
            {privatePct}% of them in private repos, so most of it doesn&apos;t show on my public profile.
          </Text>
        </Box>
        <Link href="https://github.com/Eyakub" isExternal flexShrink={0} color="button1" fontSize="14px" fontWeight="600">
          github.com/Eyakub →
        </Link>
      </Flex>

      <Box role="img" aria-label={`${data.total.toLocaleString('en-US')} GitHub contributions from ${long(data.from)} to ${long(data.to)}`}>
        <Flex aria-hidden="true" gap="3px" h="14px" mb="6px">
          {weeks.map((w, i) => (
            <Box key={w.days[0].date} display={shown(i)} flex="1" minW={0} position="relative">
              {w.month && (
                <Text position="absolute" top={0} left={0} fontFamily={MONO} fontSize="11px" lineHeight="14px" color="textSecondary" whiteSpace="nowrap">
                  {w.month}
                </Text>
              )}
            </Box>
          ))}
        </Flex>
        <Flex aria-hidden="true" gap="3px">
          {weeks.map((w, i) => (
            <Flex key={w.days[0].date} display={shown(i)} direction="column" gap="3px" flex="1" minW={0}>
              {w.days.map((d) => (
                <Box
                  key={d.date}
                  title={`${d.n} contribution${d.n === 1 ? '' : 's'} on ${long(d.date)}`}
                  w="full"
                  borderRadius="2px"
                  bg={LEVELS[d.level]}
                  sx={{ aspectRatio: '1' }}
                />
              ))}
            </Flex>
          ))}
        </Flex>
      </Box>

      <Flex aria-hidden="true" mt="12px" justify="flex-end" align="center" gap="4px" fontFamily={MONO} fontSize="11px" color="textSecondary">
        <Text mr="4px">Less</Text>
        {LEVELS.map((bg) => (
          <Box key={bg} boxSize="10px" borderRadius="2px" bg={bg} />
        ))}
        <Text ml="4px">More</Text>
      </Flex>
    </Box>
  )
}
