import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import homepage from '../data/homepage.json'

const CELLS = [
  ['2', 'products of my own, both live'],
  [`★ ${homepage.ralloStars}`, 'stars on Rallo, my macOS app for agent workflows'],
  ['5', 'chat channels Razlio AI sells on, in Bengali and English'],
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
