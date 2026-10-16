import { Box, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Anek_Latin } from 'next/font/google'
import { TOPICS } from '../data/learn'

const anek = Anek_Latin({ subsets: ['latin'], axes: ['wdth'], display: 'swap' })

const SLUGS = ['concurrency-vs-parallelism', 'processes-vs-threads', 'celery-redis', 'git-basics']
// Same light-theme line colors as styles/learn.css.
const LINE_COLORS = { backend: '#1A5FC4', async: '#CC6E00', devops: '#0B7A4B', git: '#7347B5', concurrency: '#0E7C86' }

export default function LearnBand() {
  const films = Object.keys(TOPICS).length
  return (
    <Box
      as="section"
      className={anek.className}
      mt={{ base: '56px', md: '96px' }}
      p={{ base: '28px 20px', md: '48px' }}
      display="grid"
      gap="18px"
      bg="#F2F4F8"
      color="#131B2C"
      borderRadius="24px"
    >
      <Box display="inline-flex" alignItems="center" gap="10px" fontSize="18px" fontWeight="700" sx={{ fontStretch: '87.5%' }}>
        <svg width="34" height="18" viewBox="0 0 34 18" aria-hidden="true">
          <path d="M4 9h26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="7" cy="9" r="5" fill="#fff" stroke="currentColor" strokeWidth="2.6" />
          <circle cx="27" cy="9" r="5" fill="#fff" stroke="currentColor" strokeWidth="2.6" />
        </svg>
        <span>Stop by Stop</span>
      </Box>
      <Heading
        as="h2"
        maxW="20ch"
        fontSize={{ base: '32px', md: '56px' }}
        fontWeight="700"
        lineHeight="0.98"
        letterSpacing="-0.01em"
        sx={{ fontStretch: '75%' }}
      >
        I teach backend systems as short interactive films.
      </Heading>
      <Text maxW="60ch" color="#435069">
        Press play and watch a request move through a real system. Written for interview prep, in English and বাংলা.
      </Text>
      <Box
        as="ul"
        display="grid"
        gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }}
        gap="10px"
        listStyleType="none"
        m={0}
        p={0}
      >
        {SLUGS.map((slug) => {
          const t = TOPICS[slug]
          return (
            <Box as="li" key={slug}>
              <Box
                as={NextLink}
                href={`/learn/${slug}`}
                display="grid"
                gap="6px"
                h="full"
                p="14px"
                bg="#fff"
                border="1px solid #D6DCE6"
                borderRadius="14px"
                _hover={{ borderColor: '#131B2C' }}
              >
                <Box as="b" display="flex" alignItems="center" gap="8px" fontSize="17px" fontWeight="700" sx={{ fontStretch: '87.5%' }}>
                  <Box as="i" boxSize="10px" borderRadius="50%" flex="none" bg={LINE_COLORS[t.line] || '#1A5FC4'} />
                  {t.title.en}
                </Box>
                <Text fontSize="15px" lineHeight="1.35" color="#435069">
                  {t.summary.en}
                </Text>
              </Box>
            </Box>
          )
        })}
      </Box>
      <Box
        as={NextLink}
        href="/learn"
        justifySelf="start"
        display="inline-flex"
        alignItems="center"
        minH="44px"
        px="18px"
        borderRadius="999px"
        bg="#131B2C"
        color="#F2F4F8"
        fontWeight="600"
      >
        Open all {films} films →
      </Box>
    </Box>
  )
}
