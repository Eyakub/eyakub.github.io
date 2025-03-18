// components/WorkExperience.tsx
import React, { useState } from 'react';
import workExperienceData from '../data/workexperience.json';
import {
  Stack,
  Heading,
  Text,
  Box,
  SimpleGrid,
  Tag,
  Image,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible';

interface WorkExperienceItem {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
  logoUrl?: string;
}

const WorkExperience: React.FC = () => {
  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});

  const toggleShowMore = (index: number) => {
    setShowMore({ ...showMore, [index]: !showMore[index] });
  };

  return (
    <Stack spacing={8} w="full" py={16}>
      <Heading
        color="displayColor"
        fontFamily="Ubuntu"
        fontSize={{ base: '2xl', md: '3xl' }}
        textAlign="center"
        mb={8}
      >
        Work Experience
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8} px={4}>
        {workExperienceData.map((experience: WorkExperienceItem, index: number) => (
          <SlideUpWhenVisible threshold={0.1} key={index}>
            <Box
              bg="gray.900"
              rounded="md"
              shadow="md"
              p={6}
              color="gray.200"
              mt={index % 2 !== 0 ? '80px' : '0'}
            >
              <Stack direction="row" alignItems="flex-start" mb={4}>
                {experience.logoUrl && (
                  <Image
                    src={experience.logoUrl}
                    alt={`${experience.company} Logo`}
                    boxSize="40px"
                    mr={4}
                    borderRadius="md"
                  />
                )}
                <Stack spacing={1}>
                  <Heading fontSize="lg" fontFamily="Ubuntu">
                    {experience.title}
                  </Heading>
                  <Text>{experience.company}</Text>
                </Stack>
              </Stack>
              <Text fontSize="sm" mb={2}>
                {experience.startDate} - {experience.endDate || 'Present'}
              </Text>
              <Text fontSize="sm" mb={4}>
                {experience.location}
              </Text>
              <List spacing={2} mb={4} ml={4} styleType={'disc'}>
                {experience.responsibilities.map((responsibility, idx) => (
                  <ListItem key={idx} fontSize="sm">
                    {responsibility}
                  </ListItem>
                ))}
              </List>
              {/* <Stack direction="row" flexWrap="wrap" mt={4}>
                {experience.technologies.map((tech, idx) => (
                  <Tag
                    key={idx}
                    variant="subtle"
                    colorScheme="blue"
                    mr={2}
                    mb={2}
                    fontSize="sm"
                  >
                    {tech}
                  </Tag>
                ))}
              </Stack> */}
            </Box>
          </SlideUpWhenVisible>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default WorkExperience;