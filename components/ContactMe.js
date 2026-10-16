import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { MONO } from './SectionHead'

const EMAIL = 'eyakubsorkar@gmail.com'

export default function ContactMe() {
  return (
    <Stack
      as="section"
      id="contact"
      w="full"
      scrollMarginTop="80px"
      spacing="16px"
      pt={{ base: '64px', md: '112px' }}
      pb="40px"
    >
      <Heading
        as="h2"
        maxW="18ch"
        color="displayColor"
        fontSize={{ base: '30px', md: '54px' }}
        fontWeight="800"
        lineHeight="1.02"
        letterSpacing="-0.035em"
        sx={{ textWrap: 'balance' }}
      >
        Building something with AI in it? Let&apos;s talk.
      </Heading>
      <Text maxW="56ch" color="textSecondary">
        Email is fastest. I&apos;m in Dhaka (UTC+6).
      </Text>
      <Stack direction="row" flexWrap="wrap" spacing={0} gap="10px" align="center">
        <Button
          as="a"
          href={`mailto:${EMAIL}`}
          minH="44px"
          px="20px"
          bg="button1"
          color="#0b0c0f"
          fontFamily={MONO}
          fontWeight="600"
          overflowWrap="anywhere"
          whiteSpace="normal"
          _hover={{ bg: '#34b67e' }}
        >
          {EMAIL}
        </Button>
        <Button
          as="a"
          href="https://linkedin.com/in/eyakub-sorkar"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          minH="44px"
          px="20px"
          color="displayColor"
          borderColor="#2a2e36"
          fontWeight="700"
          _hover={{ bg: '#0e0f12', borderColor: '#3a3f4a' }}
        >
          LinkedIn
        </Button>
      </Stack>
    </Stack>
  )
}
