import {
  SimpleGrid,
  Text,
  Stack,
  Heading,
  Image,
  Flex,
  Box,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react'

import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'

export default function AboutMe() {

  const MoreInfo = ({ text, content }) => {
    return (
      <>
        {' '}
        <Popover isLazy placement="right" trigger="hover">
          <PopoverTrigger>
            <chakra.span
              color="button1"
              cursor="help"
            >
              {text}
            </chakra.span>
          </PopoverTrigger>
          <PopoverContent color="white" bg="secondary" borderColor="button1">
            <PopoverArrow bg="button1" />
            <PopoverBody color="textPrimary" fontSize="sm">
              {content}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {' '}
      </>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
      <SlideUpWhenVisible>
        <Stack spacing={4}>
          <Heading fontFamily="Ubuntu" fontSize="2xl" color="white">
            ⚡ About Me
          </Heading>
          <Text
            color="textSecondary"
            fontSize={{ base: '14px', md: '16px' }}
            whiteSpace="pre-line"
          >
            Hey! I'm MD Eyakub Sorkar, a Backend Developer specializing in Python, Django, and Django REST Framework (DRF), FastAPI, with over 5 years of experience building scalable and efficient systems for web applications serving millions of users globally.
            <br /><br />
            I excel at creating custom web solutions, tackling complex technical challenges, and ensuring smooth, reliable server-side performance. My work spans across {' '}
            where I’ve had the privilege to contribute to solutions that serve millions.
            <br /><br />
            I'm passionate about leveraging modern technologies to solve real-world problems efficiently and effectively. Currently, I’m focused on{' '}
            <MoreInfo
              content="Building Web Applications using Python, Django, and Django REST Framework (DRF), FastAPI, besides trying to learn new things like Machine Learning and AI."
              text="Web Aplication & Machine Learning"
            />
            and sharpening my problem-solving skills through{' '}
            <MoreInfo
              content="Competitive Programming has enhanced my ability to solve algorithmic problems."
              text="Problem Solving"
            />.
            <br /><br />
            When I'm not coding, I enjoy playing games with friends, catching up on Netflix shows, or hangout
          </Text>
        </Stack>
      </SlideUpWhenVisible>
      <SlideUpWhenVisible>
        <Flex align="center" justify="center">
          <Box
            pos="relative"
            maxW={{ base: '300px', lg: '350px' }}
            maxH={{ base: '300px', lg: '350px' }}
          >
            <Image
              pos="absolute"
              zIndex={3}
              top="0px"
              right={{ base: '-32px', lg: '-64px' }}
              w={{ base: '100px', lg: '150px' }}
              alt=""
              filter="invert(0.1)"
              src="https://svgsilh.com/svg/26432.svg"
            />
            <Image
              w={{ base: '300px', lg: '350px' }}
              h={{ base: '300px', lg: '350px' }}
              objectFit="cover"
              borderRadius="50%"
              alt="Eyakub Sorkar"
              src="/eyakub_circle.png"
            />
          </Box>
        </Flex>
      </SlideUpWhenVisible>
    </SimpleGrid>
  )
}