import { Flex, Link } from '@chakra-ui/react'
import homepage from '../data/homepage.json'
import { MONO } from './SectionHead'

const updated = new Date(`${homepage.asOf}T00:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function HomeFooter() {
  return (
    <Flex
      as="footer"
      w="full"
      flexWrap="wrap"
      justify="space-between"
      gap="10px"
      pt="22px"
      pb="28px"
      borderTop="1px solid #1c1f25"
      fontFamily={MONO}
      fontSize="12px"
      color="textSecondary"
    >
      <span>
        For agents: <Link href="/llms.txt">/llms.txt</Link> · <Link href="/resume.json">/resume.json</Link>
      </span>
      <span>Next.js · GitHub Pages · updated {updated}</span>
    </Flex>
  )
}
