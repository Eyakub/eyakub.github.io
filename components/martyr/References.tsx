'use client';

import { MartyrData, Reference } from "../../types";
import { Link, Newspaper } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Image,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FaFacebook, FaYoutube, FaNewspaper } from "react-icons/fa";

interface ReferencesProps {
  data: MartyrData;
}

const getIcon = (type: Reference['type']) => {
  switch (type) {
    case 'facebook':
      return FaFacebook;
    case 'youtube':
      return FaYoutube;
    case 'news':
      return FaNewspaper;
    default:
      return Newspaper;
  }
};

const getTypeColor = (type: Reference['type']) => {
  switch (type) {
    case 'facebook':
      return 'facebook.500';
    case 'youtube':
      return 'red.500';
    case 'news':
      return 'purple.500';
    default:
      return 'blue.500';
  }
};

export default function References({ data }: ReferencesProps) {
  const { language } = useLanguage();

  return (
    <Box as="section" py={16} bg="gray.50">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <Link size={24} color="blue.500" />
          <Heading as="h2" size="xl" color="gray.800">Media Coverage & References</Heading>
        </Flex>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {data.references.map((reference, index) => (
            <LinkBox
              key={index}
              as="article"
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
            >
              <Flex gap={4} h="full" direction="column">
                {reference.thumbnail && (
                  <Image
                    src={reference.thumbnail}
                    alt={reference.title[language]}
                    borderRadius="md"
                    objectFit="cover"
                    h="160px"
                    w="full"
                  />
                )}
                <Flex align="center" gap={2}>
                  <Icon as={getIcon(reference.type)} color={getTypeColor(reference.type)} boxSize={5} />
                  <Badge colorScheme={reference.type === 'facebook' ? 'facebook' : reference.type === 'youtube' ? 'red' : 'purple'}>
                    {reference.type.toUpperCase()}
                  </Badge>
                </Flex>
                <Box flex={1}>
                  <LinkOverlay href={reference.url} isExternal>
                    <Heading as="h3" size="md" mb={2}>
                      {reference.title[language]}
                    </Heading>
                  </LinkOverlay>
                  {reference.description && (
                    <Text color="gray.600" noOfLines={2} mb={2}>
                      {reference.description[language]}
                    </Text>
                  )}
                  <Flex justify="space-between" align="center" fontSize="sm" color="gray.500">
                    <Text>{reference.source[language]}</Text>
                    <Text>{reference.date[language]}</Text>
                  </Flex>
                </Box>
              </Flex>
            </LinkBox>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}