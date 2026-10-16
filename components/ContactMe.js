import { useRef, useState } from 'react'
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { MONO } from './SectionHead'

const EMAIL = 'eyakubsorkar@gmail.com'

export default function ContactMe() {
  const [copied, setCopied] = useState(false)
  const mailRef = useRef(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.getSelection().selectAllChildren(mailRef.current)
    }
  }

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
        Working on backend or AI systems? Let&apos;s talk.
      </Heading>
      <Text maxW="56ch" color="textSecondary">
        Email is fastest. I&apos;m in Dhaka (UTC+6).
      </Text>
      <Stack direction="row" flexWrap="wrap" spacing={0} gap="10px" align="center">
        <Box
          ref={mailRef}
          px="14px"
          py="10px"
          border="1px solid #2a2e36"
          borderRadius="8px"
          color="displayColor"
          fontFamily={MONO}
          fontSize="15px"
          fontWeight="500"
          overflowWrap="anywhere"
          sx={{ userSelect: 'all' }}
        >
          {EMAIL}
        </Box>
        <Button
          onClick={copy}
          minH="44px"
          px="20px"
          bg="button1"
          color="#0b0c0f"
          fontWeight="700"
          _hover={{ bg: '#34b67e' }}
          aria-live="polite"
        >
          {copied ? 'Copied' : 'Copy email'}
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
