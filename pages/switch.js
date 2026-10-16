import { Box, Flex, Heading, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Container from '../components/Container'
import { MONO } from '../components/SectionHead'
import { THEMES } from '../components/themes'
import site from '../data/site.json'

function Badge({ live }) {
  return (
    <Flex align="center" gap="6px" fontFamily={MONO} fontSize="12px" color={live ? 'button1' : 'textSecondary'}>
      <Box boxSize="7px" rounded="full" bg={live ? 'button1' : '#6b6e75'} />
      {live ? 'Live on /' : 'Ready'}
    </Flex>
  )
}

export default function Switch() {
  return (
    <>
      <Head>
        <title>Themes · Eyakub Sorkar</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Container>
        <Stack my={{ base: '10vh', md: '12vh' }} spacing={10}>
          <Stack spacing={3}>
            <Text color="button1" fontSize="12px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase">
              Unlisted
            </Text>
            <Heading color="displayColor" fontSize={{ base: '4xl', md: '5xl' }} letterSpacing="-1px" lineHeight="1">
              Portfolio themes
            </Heading>
            <Text color="textSecondary" maxW="62ch" lineHeight="1.65">
              Every homepage template this site can render. The one marked live is what visitors see on /. To change it,
              run <Box as="code" fontFamily={MONO} fontSize="0.9em" color="displayColor">Switch homepage theme</Box> from
              the repo&apos;s Actions tab, or set <Box as="code" fontFamily={MONO} fontSize="0.9em" color="displayColor">home</Box>{' '}
              in <Box as="code" fontFamily={MONO} fontSize="0.9em" color="displayColor">data/site.json</Box> and deploy.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 7 }}>
            {THEMES.map((t) => (
              <Flex key={t.id} as="article" direction="column" bg="#0e0f12" border="1px solid #1c1f25" rounded="lg" overflow="hidden">
                {/* the iframe renders at 4x the card width, then scales down, so it shows the desktop layout */}
                <Box position="relative" w="full" pt="62.5%" overflow="hidden" bg="#070809" borderBottom="1px solid #1c1f25">
                  <Box
                    as="iframe"
                    src={`/preview/${t.id}`}
                    title={`${t.name} theme preview`}
                    loading="lazy"
                    tabIndex={-1}
                    aria-hidden="true"
                    position="absolute"
                    top={0}
                    left={0}
                    w="400%"
                    h="400%"
                    border={0}
                    pointerEvents="none"
                    transform="scale(0.25)"
                    transformOrigin="0 0"
                  />
                </Box>
                <Stack p={{ base: 5, md: 6 }} spacing={3} flex="1">
                  <Flex justify="space-between" align="center" gap={3}>
                    <Heading as="h2" color="displayColor" fontSize="xl" fontWeight="700">
                      {t.name}
                    </Heading>
                    <Badge live={t.id === site.home} />
                  </Flex>
                  <Text color="textSecondary" fontSize="sm" lineHeight="1.65">
                    {t.blurb}
                  </Text>
                  <Flex mt="auto" pt={2} justify="space-between" align="center" fontFamily={MONO} fontSize="13px">
                    <Text color="#6b6e75">id: {t.id}</Text>
                    <Link href={`/preview/${t.id}`} isExternal color="button1" fontWeight="600">
                      Open full preview ↗
                    </Link>
                  </Flex>
                </Stack>
              </Flex>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}
