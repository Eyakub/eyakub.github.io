import {
  Box,
  Center,
  Divider,
  Link,
  ScaleFade,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react'
import {
  FaBootstrap,
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaJs,
  FaLaravel,
  FaPepperHot,
  FaPython,
  FaReact,
  FaSass,
  FaDocker,
  FaAws,
  FaVuejs
} from 'react-icons/fa'
import { SiDjango, SiKubernetes, SiScrapy } from 'react-icons/si'
import { SiChakraui, SiNextdotjs } from 'react-icons/si'
import useMediaQuery from '../hook/useMediaQuery'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Cards({ imageURL, title, slug, desc, tag = [] }) {
  const getTag = (tag) => {
    let values = []
    if (tag == 'React') {
      values[0] = 'blue'
      values[1] = FaReact
    } else if (tag == 'Python') {
      values[0] = 'orange'
      values[1] = FaPython
    } else if (tag == 'Javascript') {
      values[0] = 'yellow'
      values[1] = FaJs
    } else if (tag == 'Sass') {
      values[0] = 'pink'
      values[1] = FaSass
    } else if (tag == 'Flask') {
      values[0] = 'green'
      values[1] = FaPepperHot
    } else if (tag == 'Laravel') {
      values[0] = 'red'
      values[1] = FaLaravel
    } else if (tag == 'Bootstrap') {
      values[0] = 'purple'
      values[1] = FaBootstrap
    } else if (tag == 'SQL') {
      values[0] = 'blue'
      values[1] = FaDatabase
    } else if (tag == 'Next.js') {
      values[0] = 'gray'
      values[1] = SiNextdotjs
    } else if (tag == 'Chakra UI') {
      values[0] = 'teal'
      values[1] = SiChakraui
    } else if (tag == 'Docker') {
      values[0] = 'blue'
      values[1] = FaDocker
    } else if (tag == 'Kubernetes') {
      values[0] = 'blue'
      values[1] = SiKubernetes
    } else if (tag == 'Django') {
      values[0] = 'blue'
      values[1] = SiDjango
    } else if (tag == 'AWS') {
      values[0] = 'blue'
      values[1] = FaAws
    } else if (tag == 'VueJS') {
      values[0] = 'blue'
      values[1] = FaVuejs
    } else {
      values[0] = 'gray'
      values[1] = FaCode
    }
    return values
  }

  const isLargerThan800 = useMediaQuery(800)
  const router = useRouter()

  const Tags = (
    <Box display="flex" flexWrap="wrap" mt={2} mx={-1}>
      {tag.map((item) => (
        <Box key={item} p={1}>
          <Tag
            colorScheme={getTag(item)[0]}
            size={isLargerThan800 ? 'md' : 'sm'}
          >
            <TagLeftIcon as={getTag(item)[1]} />
            <TagLabel>{item}</TagLabel>
          </Tag>
        </Box>
      ))}
    </Box>
  )

  const handleClick = () => {
    router.push(`/`)
    // router.push(`/projects/${slug}`)
  }

  return (
    <Stack
      minH="320px"
      maxH={{ base: "none", md: "500px" }}
      bg="secondary"
      border="1px"
      borderColor={{ base: '#333', md: 'borderColor' }}
      borderRadius="10px"
    >
      {/* <Link href={`/projects/${slug}`}> */}
      <Link href={`/`}>
        <ScaleFade transition={{ duration: 1 }} in={true}>
          <Center w="auto">
            <Image
              width={800}
              height={400}
              minH="270px"
              borderRadius="10px 10px 0px 0px"
              transition="0.3s"
              objectFit="cover"
              style={{
                borderRadius: '10px 10px 0px 0px',
                objectFit: 'cover',
              }}
              alt={title}
              src={imageURL}
            />
          </Center>
          <Stack px={4} py={2}>
            <Stack alignItems="center" justifyContent="space-between" isInline>
              <Text color="displayColor" fontFamily="Ubuntu" fontSize="2xl">
                {title}
              </Text>
              <Stack
                alignItems="center"
                justifyContent="flex-end"
                isInline
                spacing={4}
              >
                <Link
                  color="white"
                  href={`/`}
                  onClick={handleClick}
                >
                  <FaExternalLinkAlt aria-label="project link" size={20} />
                </Link>
              </Stack>
            </Stack>
            {Tags}
            <Divider />
            <Text
              color="textSecondary"
              fontSize={['sm', 'md']}
            >
              {desc}
            </Text>
          </Stack>
        </ScaleFade>
      </Link>
    </Stack>
  )
}
