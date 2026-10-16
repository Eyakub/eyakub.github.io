import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { TOPICS } from '../data/learn'
import homepage from '../data/homepage.json'

const CELLS = [
  [homepage.contributions.toLocaleString('en-US'), 'GitHub contributions in the last 12 months'],
  [`★ ${homepage.ralloStars}`, 'stars on Rallo, my macOS app for agent workflows'],
  [String(Object.keys(TOPICS).length), 'interactive backend films, English and বাংলা'],
  ['6+ yrs', '5 companies, Python since 2019'],
]

export default function ProofStrip() {
  return (
    <SimpleGrid
      as="section"
      aria-label="Highlights"
      w="full"
      columns={{ base: 2, md: 4 }}
      border="1px solid #1c1f25"
      borderRadius="12px"
      bg="#0e0f12"
      overflow="hidden"
    >
      {CELLS.map(([value, label], i) => (
        <Box
          key={label}
          p={{ base: '14px', sm: '18px 20px' }}
          borderLeft={{ base: i % 2 ? '1px solid #1c1f25' : 'none', md: i ? '1px solid #1c1f25' : 'none' }}
          borderTop={{ base: i > 1 ? '1px solid #1c1f25' : 'none', md: 'none' }}
        >
          <Text
            fontSize={{ base: '24px', sm: '28px' }}
            fontWeight="700"
            lineHeight="1.1"
            letterSpacing="-0.02em"
            color="displayColor"
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {value}
          </Text>
          <Text mt="4px" fontSize="13px" lineHeight="1.45" color="textSecondary">
            {label}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
