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
  useBreakpointValue,
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
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Cards({ imageURL, liveUrl, title, slug, desc, tag = [] }) {
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

  const [mounted, setMounted] = useState(false)
  const isLargerThan800 = useBreakpointValue({ base: false, md: true })
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const Tags = (
    <Box display="flex" flexWrap="wrap" mt={2} mx={-1}>
      {tag.map((item) => (
        <Box key={item} p={1}>
          <Tag
            colorScheme={getTag(item)[0]}
            size={mounted && isLargerThan800 ? 'md' : 'sm'}
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
      <Stack>
        <ScaleFade transition={{ duration: 1 }} in={true}>
          <Center w="auto">
            <Image
              width={800}
              height={400}
              style={{
                minHeight: '270px',
                borderRadius: '10px 10px 0px 0px',
                objectFit: 'cover',
                transition: '0.3s',
              }}
              alt={title}
              src={imageURL}
            />
          </Center>
          <Stack px={4} py={2}>
            <Stack alignItems="center" justifyContent="space-between" direction="row">
              <Text color="displayColor" fontFamily="Ubuntu" fontSize="2xl">
                {title}
              </Text>
              <Stack
                alignItems="center"
                justifyContent="flex-end"
                direction="row"
                spacing={4}
              >
                {liveUrl && liveUrl.trim() !== '' && (
                  <Link
                    color="white"
                    href={liveUrl}
                    target='_blank'
                    // onClick={handleClick}
                  >
                    <FaExternalLinkAlt aria-label="project link" size={20} />
                  </Link>
                )}
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
      </Stack>
    </Stack>
  )
}
