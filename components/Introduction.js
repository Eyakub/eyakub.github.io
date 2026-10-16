import { Box, Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { ArrowRight } from 'lucide-react'
import { RESUME_URL } from './SectionHead'

const focusRing = { boxShadow: '0 0 0 3px rgba(60,207,145,0.4)' }

export default function Introduction() {
  return (
    <Stack as="section" w="full" spacing="20px" pt={{ base: '44px', md: '88px' }} pb="36px">
      <Stack spacing="18px">
        <Heading
          as="h1"
          color="displayColor"
          fontSize={{ base: '46px', sm: '64px', md: '96px', lg: '112px' }}
          fontWeight="800"
          lineHeight="0.92"
          letterSpacing="-0.045em"
        >
          Eyakub Sorkar
        </Heading>
        <Text
          maxW="34ch"
          color="textSecondary"
          fontSize={{ base: '20px', md: '30px' }}
          lineHeight="1.3"
          letterSpacing="-0.02em"
          sx={{ textWrap: 'balance' }}
        >
          <Box as="strong" color="displayColor" fontWeight="600">
            Full-stack engineer shipping AI features.
          </Box>{' '}
          I build with a team of coding agents and review every line they write.
        </Text>
        <Text maxW="60ch" color="textSecondary">
          6+ years across Python, FastAPI, Django, PostgreSQL and Next.js. Now at{' '}
          <Link href="https://sdsmanager.com/" isExternal color="button1" fontWeight="600">
            SDS Manager
          </Link>
          , building AI compliance tooling in ExactSDS and the AI agents behind Hub One&apos;s Stride.
        </Text>
      </Stack>

      <Stack direction="row" flexWrap="wrap" spacing={0} gap="10px" align="center">
        <Button
          as="a"
          href="#work"
          minH="44px"
          px="20px"
          bg="button1"
          color="#0b0c0f"
          fontWeight="700"
          rightIcon={<ArrowRight size={16} />}
          _hover={{ bg: '#34b67e' }}
          _focusVisible={focusRing}
        >
          See case studies
        </Button>
        <Button
          as="a"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          minH="44px"
          px="20px"
          color="displayColor"
          borderColor="#2a2e36"
          fontWeight="700"
          _hover={{ bg: '#0e0f12', borderColor: '#3a3f4a' }}
          _focusVisible={focusRing}
        >
          Résumé
        </Button>
        {[
          ['GitHub', 'https://github.com/Eyakub'],
          ['LinkedIn', 'https://linkedin.com/in/eyakub-sorkar'],
        ].map(([label, href]) => (
          <Button
            key={label}
            as="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            minH="44px"
            px="10px"
            color="#C9CBD0"
            fontWeight="700"
            _hover={{ bg: 'rgba(255,255,255,0.05)' }}
            _focusVisible={focusRing}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Stack>
  )
}
