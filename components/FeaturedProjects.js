import { Box, Button, Heading, Image, Link, SimpleGrid, Text, Wrap, WrapItem } from '@chakra-ui/react'
import NextLink from 'next/link'
import projectsData from '../data/projects.json'
import SectionHead, { MONO } from './SectionHead'

const Chips = ({ items }) => (
  <Wrap spacing="6px">
    {items.map((c) => (
      <WrapItem key={c}>
        <Box fontSize="12px" px="9px" py="3px" borderRadius="999px" bg="#15171C" border="1px solid #1c1f25" color="#C9CBD0">
          {c}
        </Box>
      </WrapItem>
    ))}
  </Wrap>
)

const Card = ({ wide, children }) => (
  <Box
    gridColumn={wide ? { md: '1 / -1' } : undefined}
    display="grid"
    gap="12px"
    alignContent="start"
    bg="#0e0f12"
    border="1px solid #1c1f25"
    borderRadius="14px"
    p="22px"
  >
    {children}
  </Box>
)

const Meta = ({ children }) => (
  <Text fontFamily={MONO} fontSize="12px" color="textSecondary">
    {children}
  </Text>
)

const Title = ({ children }) => (
  <Heading as="h3" fontSize="22px" lineHeight="1.25" letterSpacing="-0.015em" color="displayColor">
    {children}
  </Heading>
)

function Sds({ f }) {
  return (
    <Card wide>
      <Meta>{f.meta}</Meta>
      <Title>{f.headline}</Title>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="18px">
        {[
          ['Problem', f.problem],
          ['What I built', f.built],
          ['The hard part', f.hardPart],
        ].map(([h, t]) => (
          <Box key={h}>
            <Heading as="h4" mb="4px" fontSize="11px" textTransform="uppercase" letterSpacing="0.16em" color="button1">
              {h}
            </Heading>
            <Text fontSize="14px" color="textSecondary">
              {t}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Chips items={f.chips} />
    </Card>
  )
}

function Plain({ f }) {
  return (
    <Card>
      <Meta>{f.meta}</Meta>
      <Box display="flex" alignItems="center" gap="12px">
        {f.iconUrl && <Image src={f.iconUrl} alt="" boxSize="48px" borderRadius="12px" />}
        <Title>{f.headline}</Title>
      </Box>
      <Text fontSize="15px" color="textSecondary">
        {f.summary}
      </Text>
      <Chips items={f.chips} />
      {f.cta && (
        <Button
          as="a"
          href={f.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          justifySelf="start"
          minH="44px"
          color="displayColor"
          borderColor="#2a2e36"
          fontFamily={MONO}
          fontSize="13px"
          _hover={{ bg: '#15171C', borderColor: '#3a3f4a' }}
        >
          {f.cta}
        </Button>
      )}
    </Card>
  )
}

export default function FeaturedProjects() {
  const featured = projectsData.map((p) => p.fields).filter((f) => f.featured)
  const sds = featured.find((f) => f.slug === 'sds_manager')
  const rest = featured.filter((f) => f.slug !== 'sds_manager')
  return (
    <Box as="section" id="work" w="full" scrollMarginTop="80px" pt={{ base: '56px', md: '96px' }}>
      <SectionHead eyebrow="Selected work">Problems, what I built, what changed</SectionHead>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
        <Sds f={sds} />
        {rest.map((f) => (
          <Plain key={f.slug} f={f} />
        ))}
      </SimpleGrid>
      <Text mt="14px" fontSize="14px" color="textSecondary">
        Earlier: Aadi BD cross-border marketplace, Moiur booking platform.{' '}
        <Link as={NextLink} href="/projects" color="button1" fontWeight="600">
          Archive →
        </Link>
      </Text>
    </Box>
  )
}
