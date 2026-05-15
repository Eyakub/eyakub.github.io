import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  SlideFade,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { ArrowRight, FileText, MapPin } from 'lucide-react'

const SOCIALS = [
  { Icon: FaGithub, href: 'https://github.com/eyakub', label: 'GitHub' },
  { Icon: FaLinkedin, href: 'https://linkedin.com/in/eyakub-sorkar', label: 'LinkedIn' },
  { Icon: FaEnvelope, href: 'mailto:eyakubsorkar@gmail.com', label: 'Email' },
]

const RESUME_URL =
  'https://drive.google.com/file/d/1KPUkyNtMhGjGncjVA_U99YA6QZMr7WlN/view?usp=sharing'

export default function Introduction() {
  const isLargerThan800 = useBreakpointValue({ base: false, md: true })

  return (
    <Stack
      align="flex-start"
      justify="flex-start"
      w="100%"
      spacing={{ base: 8, md: 10 }}
    >
      {/* Status pill */}
      <SlideFade direction="top" transition={{ enter: { duration: 0.4, delay: 0.55 } }} in={true}>
        <HStack
          spacing={2}
          bg="rgba(60,207,145,0.1)"
          color="button1"
          px={3}
          py={1.5}
          rounded="full"
          fontSize="xs"
          fontWeight="600"
          border="1px solid rgba(60,207,145,0.25)"
        >
          <Box position="relative" w="8px" h="8px">
            <Box position="absolute" inset={0} bg="button1" rounded="full" boxShadow="0 0 8px #3CCF91" />
            <Box
              position="absolute"
              inset="-2px"
              bg="button1"
              rounded="full"
              opacity={0.35}
              sx={{
                animation: 'introPing 2s cubic-bezier(0,0,0.2,1) infinite',
                '@keyframes introPing': {
                  '0%': { transform: 'scale(1)', opacity: 0.6 },
                  '75%, 100%': { transform: 'scale(2.4)', opacity: 0 },
                },
              }}
            />
          </Box>
          <Text>Available for new opportunities</Text>
          <Text opacity={0.5}>·</Text>
          <Box as={MapPin} boxSize="12px" />
          <Text>Dhaka, Bangladesh</Text>
        </HStack>
      </SlideFade>

      {/* Name + greeting */}
      <SlideFade direction="top" transition={{ enter: { duration: 0.4, delay: 0.7 } }} in={true}>
        <Stack spacing={2}>
          <Text color="button1" fontSize="display2" fontWeight="500">
            Hey there, I&apos;m
          </Text>
          <Heading
            color="displayColor"
            fontSize="display"
            lineHeight="0.95"
            letterSpacing={{ sm: '-1.2px', md: '-1.8px' }}
          >
            Eyakub Sorkar.
          </Heading>
        </Stack>
      </SlideFade>

      {/* Role headline */}
      <SlideFade direction="top" transition={{ enter: { duration: 0.4, delay: 0.8 } }} in={true}>
        <Heading
          as="p"
          color="textSecondary"
          fontSize="display2"
          fontWeight="500"
          letterSpacing="-1.6px"
          whiteSpace="pre-wrap"
        >
          <Box as="span" color="displayColor">Software Engineer</Box>{' '}
          with 6+ years of experience building scalable systems
          {isLargerThan800
            ? ' and \nshipping AI-augmented, full-stack products.'
            : ' and shipping AI-augmented, full-stack products.'}
        </Heading>
      </SlideFade>

      {/* Supporting paragraph */}
      <SlideFade direction="top" transition={{ enter: { duration: 0.4, delay: 0.9 } }} in={true}>
        <Text color="textSecondary" fontSize="display3" lineHeight="1.7" maxW="58ch">
          Strong foundation in Computer Science, committed to continuous learning — currently shipping AI features at{' '}
          <Link
            href="https://sdsmanager.com/"
            isExternal
            color="button1"
            fontWeight="600"
            _hover={{ color: '#34b67e', textDecoration: 'none' }}
          >
            SDS Manager
          </Link>
          .
        </Text>
      </SlideFade>

      {/* CTAs + socials */}
      <SlideFade direction="top" transition={{ enter: { duration: 0.4, delay: 1.0 } }} in={true}>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          spacing={{ base: 3, sm: 4 }}
          align={{ base: 'stretch', sm: 'center' }}
        >
          <Button
            as="a"
            href="#projects"
            bg="button1"
            color="#0b0c0f"
            fontWeight="700"
            size={{ base: 'md', md: 'lg' }}
            rightIcon={<ArrowRight size={16} />}
            transition="all 0.2s ease"
            _hover={{ bg: '#34b67e', transform: 'translateY(-1px)' }}
            _focus={{ boxShadow: '0 0 0 3px rgba(60,207,145,0.4)' }}
          >
            View my work
          </Button>
          <Button
            as={Link}
            href={RESUME_URL}
            isExternal
            variant="outline"
            color="displayColor"
            borderColor="#2a2e36"
            fontWeight="600"
            size={{ base: 'md', md: 'lg' }}
            leftIcon={<FileText size={16} />}
            _hover={{ bg: '#0e0f12', borderColor: '#3a3f4a', textDecoration: 'none' }}
          >
            Resume
          </Button>

          <HStack
            spacing={1}
            pl={{ base: 0, sm: 2 }}
            ml={{ base: 0, sm: 2 }}
            borderLeft={{ base: 'none', sm: '1px solid #1c1f25' }}
          >
            {SOCIALS.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                isExternal
                aria-label={label}
                color="textSecondary"
                p={2.5}
                rounded="md"
                transition="all 0.2s ease"
                _hover={{ color: 'button1', bg: 'rgba(60,207,145,0.08)' }}
                _focus={{ boxShadow: '0 0 0 2px rgba(60,207,145,0.5)' }}
              >
                <Icon size={18} />
              </Link>
            ))}
          </HStack>
        </Stack>
      </SlideFade>
    </Stack>
  )
}
