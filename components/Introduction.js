import { Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
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
          maxW="44ch"
          color="#C9CBD0"
          fontSize={{ base: '19px', md: '25px' }}
          lineHeight="1.4"
          letterSpacing="-0.015em"
          sx={{ textWrap: 'pretty' }}
        >
          I&apos;m a full-stack engineer focused on the parts of a business that can&apos;t break: orders, payments,
          deliveries, compliance. From chemical-safety law to courier networks, I build the systems underneath and the
          screens people use every day.
        </Text>
        <Text maxW="60ch" color="textSecondary">
          6+ years across Python, FastAPI, Django, PostgreSQL and Next.js. Now at{' '}
          <Link href="https://sdsmanager.com/" isExternal color="button1" fontWeight="600">
            SDS Manager
          </Link>
          , building ExactSDS for safety data sheets and Stride, an agent-assisted task board that&apos;s still in development.
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
