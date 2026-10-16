import { Heading, Text } from '@chakra-ui/react'

export const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
export const RESUME_URL =
  'https://drive.google.com/file/d/1KPUkyNtMhGjGncjVA_U99YA6QZMr7WlN/view?usp=sharing'

export default function SectionHead({ eyebrow, children }) {
  return (
    <>
      <Text
        mb="10px"
        color="button1"
        fontSize="12px"
        fontWeight="700"
        letterSpacing="0.2em"
        textTransform="uppercase"
      >
        {eyebrow}
      </Text>
      <Heading
        as="h2"
        mb="28px"
        maxW="26ch"
        color="displayColor"
        fontFamily="Ubuntu, Inter, sans-serif"
        fontSize={{ base: '26px', md: '38px' }}
        fontWeight="500"
        lineHeight="1.15"
        letterSpacing="-0.01em"
        sx={{ textWrap: 'balance' }}
      >
        {children}
      </Heading>
    </>
  )
}
