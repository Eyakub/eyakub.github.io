import {
  Link,
  Text,
  Stack,
  Heading,
  Box,
  Button,
  SlideFade,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FaEnvelope, FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import introductionData from '../data/introduction.json'

export default function Introduction() {
  const [mounted, setMounted] = useState(false)
  const isLargerThan800 = useBreakpointValue({ base: false, md: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Stack
      alignItems="flex-start"
      justifyContent="flex-start"
      w="100%"
      spacing={{ base: 8, md: 10 }}
    >
      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 0.7 } }}
        in={true}
      >
        <Box pos="relative">
          <Image
            pos="absolute"
            zIndex={0}
            top={{ base: '0', md: '-15' }}
            left={{ base: '-4', md: '-10' }}
            w={{ base: '70px', md: '150px' }}
            alt=""
            filter="invert(0.1)"
            src="https://svgsilh.com/svg/26432.svg"
          ></Image>
          <Text
            pos="relative"
            zIndex={1}
            color="button1"
            fontSize="display2"
            fontWeight="medium"
          >
            Hey there!, I'm-
          </Text>
        </Box>
        <Heading
          pos="relative"
          zIndex={1}
          color="displayColor"
          fontSize="display"
          lineHeight={'95%'}
          letterSpacing={{ sm: '-1.2px', md: '-1.8px' }}
        >
          Eyakub Sorkar.
        </Heading>
      </SlideFade>

      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 0.8 } }}
        in={true}
      >
        <Heading
          color="textSecondary"
          fontSize="display2"
          fontWeight="medium"
          letterSpacing="-1.6px"
          whiteSpace="pre-wrap"
        >
          <Box as="span" color="displayColor">
            Software Engineer
          </Box>{' '}
          with a strong foundation in Computer Science
          {mounted && isLargerThan800
            ? ' and \na commitment to continuous learning and problem-solving.'
            : ' and a commitment to continuous learning and problem-solving.'}
        </Heading>
      </SlideFade>

      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 0.9 } }}
        in={true}
      >
        <Box color="textSecondary" fontSize="display3">
          <Text as="span">
            {introductionData[0]?.fields?.emoji} {introductionData[0]?.fields?.description}
          </Text>
          <Stack direction="row" spacing={1} mt={1}>
            <Box>{introductionData[1]?.fields?.emoji}</Box>
            <Box>
              {introductionData[1]?.fields?.description}{' '}
              {introductionData[1]?.fields?.companyUrl ? (
                <Link
                  href={introductionData[1]?.fields?.companyUrl}
                  isExternal
                  rel="noreferrer"
                >
                  {introductionData[1]?.fields?.company}
                </Link>
              ) : (
                <Box as="span" color="button1">
                  {introductionData[1]?.fields?.company}
                </Box>
              )}
            </Box>
          </Stack>
        </Box>
      </SlideFade>
      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 1.0 } }}
        in={true}
      >
        <Stack direction="row" spacing={4}>
          <Link href="https://github.com/eyakub" isExternal>
            <Button
              pos="static"
              color="white"
              bg="#171717"  // Change this to black to match the third image
              _hover={{ bg: 'gray.700' }}
              leftIcon={<FaGithub color="#3CCF91" />}
              size={mounted && isLargerThan800 ? 'md' : 'sm'}
            >
              Github
            </Button>
          </Link>

          <Link href="https://linkedin.com/in/eyakub-sorkar" isExternal>
            <Button
              pos="static"
              color="white"
              bg="#171717"  // Change this to black to match the third image
              _hover={{ bg: 'gray.700' }}
              leftIcon={<FaLinkedin color="#3CCF91" />}
              size={mounted && isLargerThan800 ? 'md' : 'sm'}
            >
              LinkedIn
            </Button>
          </Link>

          <Link href="mailto:eyakubsorkar@gmail.com" isExternal>
            <Button
              pos="static"
              color="white"
              bg="#171717"  // Change this to black to match the third image
              _hover={{ bg: 'gray.700' }}
              transition="0.3s"
              leftIcon={<FaEnvelope fill="#3CCF91" />}
              size={mounted && isLargerThan800 ? 'md' : 'sm'}
            >
              Email
            </Button>
          </Link>

          <Link
            href="https://drive.google.com/file/d/1KPUkyNtMhGjGncjVA_U99YA6QZMr7WlN/view?usp=sharing"
            isExternal
          >
            <Button
              pos="static"
              color="white"
              leftIcon={<FaFileAlt fill="#3CCF91" />}
              size={mounted && isLargerThan800 ? 'md' : 'sm'}
              _hover={{ bg: 'gray.700' }}
              bg="#171717"
            >
              Resume
            </Button>
          </Link>
        </Stack>

      </SlideFade>
    </Stack>
  )
}
