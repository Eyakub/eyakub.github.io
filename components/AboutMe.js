import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Code2, Sparkles, Coffee } from 'lucide-react'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'

const STATS = [
  { value: '6+', label: 'Years' },
  { value: '5', label: 'Companies' },
  { value: '∞', label: 'Bugs squashed' },
]

const HIGHLIGHTS = [
  {
    icon: Code2,
    title: 'Full-stack, end-to-end',
    body: 'Python · FastAPI · Django on the backend, React / Next.js on the front. Comfortable owning the whole arc.',
  },
  {
    icon: Sparkles,
    title: 'AI in the loop',
    body: 'Currently shipping LLM features at SDS Manager — Gemini-powered authoring, RAG over historical safety data.',
  },
  {
    icon: Coffee,
    title: 'Beyond code',
    body: "Gaming with friends, Netflix binges, and the occasional competitive-programming rabbit hole.",
  },
]

export default function AboutMe() {
  return (
    <Stack spacing={12} w="full" py={16}>
      <Stack spacing={3} textAlign="center">
        <Text
          color="button1"
          fontSize="sm"
          fontWeight="600"
          letterSpacing="0.25em"
          textTransform="uppercase"
        >
          About
        </Text>
        <Heading
          color="displayColor"
          fontFamily="Ubuntu"
          fontSize={{ base: '3xl', md: '4xl' }}
        >
          Hi, I&apos;m Eyakub.
        </Heading>
        <Text color="textSecondary" fontSize={{ base: 'sm', md: 'md' }}>
          A software engineer who cares more about outcomes than tooling.
        </Text>
      </Stack>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 10, lg: 14 }}
        alignItems="center"
        maxW="6xl"
        mx="auto"
        w="full"
        px={{ base: 4, md: 6 }}
      >
        {/* Portrait + stats */}
        <SlideUpWhenVisible>
          <Flex direction="column" align="center" gap={8}>
            <Box
              position="relative"
              w={{ base: '260px', md: '320px' }}
              h={{ base: '260px', md: '320px' }}
            >
              {/* Brand accent ring */}
              <Box
                position="absolute"
                inset="-10px"
                borderRadius="full"
                bg="conic-gradient(from 200deg, rgba(60,207,145,0.4), transparent 35%, rgba(60,207,145,0.2) 65%, transparent 90%)"
                filter="blur(14px)"
                opacity={0.65}
                aria-hidden
              />
              <Box
                position="absolute"
                inset="-2px"
                borderRadius="full"
                border="2px solid rgba(60,207,145,0.35)"
                aria-hidden
              />
              <Image
                position="relative"
                w="full"
                h="full"
                objectFit="cover"
                borderRadius="full"
                alt="Eyakub Sorkar"
                src="/eyakub_circle.png"
              />
            </Box>

            <HStack
              spacing={0}
              divider={<Box w="1px" h="40px" bg="#1c1f25" alignSelf="center" />}
              bg="#0e0f12"
              border="1px solid #1c1f25"
              rounded="lg"
              px={{ base: 3, md: 5 }}
              py={{ base: 3, md: 4 }}
            >
              {STATS.map((s) => (
                <Box key={s.label} px={{ base: 4, md: 6 }} textAlign="center">
                  <Text
                    color="displayColor"
                    fontFamily="Ubuntu"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="700"
                    lineHeight="1"
                  >
                    {s.value}
                  </Text>
                  <Text
                    color="textSecondary"
                    fontSize="xs"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    mt={1.5}
                    fontWeight="500"
                  >
                    {s.label}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Flex>
        </SlideUpWhenVisible>

        {/* Narrative + highlights */}
        <SlideUpWhenVisible>
          <Stack spacing={6}>
            <Text
              color="textPrimary"
              fontSize={{ base: 'md', md: 'lg' }}
              lineHeight="1.75"
            >
              I&apos;m a software engineer based in Dhaka, building products that
              serve real users — from cross-border marketplaces to AI-powered
              compliance tooling. Six years in, my focus has shifted from{' '}
              <Box as="span" color="displayColor" fontWeight="600">
                mastering one stack
              </Box>{' '}
              to{' '}
              <Box as="span" color="button1" fontWeight="600">
                shipping outcomes
              </Box>{' '}
              — whichever stack the problem demands.
            </Text>

            <Stack spacing={4}>
              {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
                <HStack
                  key={title}
                  spacing={4}
                  align="flex-start"
                  p={{ base: 4, md: 5 }}
                  bg="#0e0f12"
                  border="1px solid #1c1f25"
                  rounded="lg"
                  transition="border-color 0.2s ease"
                  _hover={{ borderColor: '#2a2e36' }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    w="40px"
                    h="40px"
                    minW="40px"
                    rounded="md"
                    bg="rgba(60,207,145,0.1)"
                    color="button1"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </Flex>
                  <Stack spacing={1}>
                    <Text
                      color="displayColor"
                      fontFamily="Ubuntu"
                      fontSize={{ base: 'sm', md: 'md' }}
                      fontWeight="700"
                    >
                      {title}
                    </Text>
                    <Text
                      color="textSecondary"
                      fontSize={{ base: 'sm', md: 'sm' }}
                      lineHeight="1.65"
                    >
                      {body}
                    </Text>
                  </Stack>
                </HStack>
              ))}
            </Stack>
          </Stack>
        </SlideUpWhenVisible>
      </SimpleGrid>
    </Stack>
  )
}
