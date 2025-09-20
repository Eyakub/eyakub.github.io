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
    <Box as="section" id="references" py={16} bg="gray.50">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <Link size={24} color="blue.500" />
          <Heading as="h2" size="xl" color="gray.800">Media Coverage & References</Heading>
        </Flex>
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 6, lg: 8 }}>
          {data.references.map((reference, index) => (
            <LinkBox
              key={index}
              as="article"
              bg="white"
              p={0}
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.3s ease"
              _hover={{ 
                transform: 'translateY(-8px)', 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                borderColor: 'blue.200'
              }}
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
            >
              <Flex gap={0} h="full" direction="column">
                {reference.thumbnail && (
                  <Box position="relative" overflow="hidden">
                    <Image
                      src={reference.thumbnail}
                      alt={reference.title[language]}
                      objectFit="cover"
                      h={{ base: "140px", md: "160px", lg: "180px" }}
                      w="full"
                      transition="transform 0.3s ease"
                      _groupHover={{ transform: 'scale(1.05)' }}
                    />
                    <Box
                      position="absolute"
                      top={4}
                      right={4}
                      bg="rgba(255, 255, 255, 0.9)"
                      backdropFilter="blur(10px)"
                      borderRadius="full"
                      p={2}
                    >
                      <Icon as={getIcon(reference.type)} color={getTypeColor(reference.type)} boxSize={5} />
                    </Box>
                  </Box>
                )}
                
                <Box p={{ base: 4, lg: 6 }} flex={1} display="flex" flexDirection="column">
                  <Flex align="center" gap={2} mb={{ base: 3, lg: 4 }}>
                    <Badge 
                      colorScheme={reference.type === 'facebook' ? 'facebook' : reference.type === 'youtube' ? 'red' : 'purple'}
                      variant="subtle"
                      fontSize="3xs"
                      px={1}
                      py={0.5}
                      borderRadius="full"
                      opacity={0.8}
                      minH="auto"
                      h="auto"
                      lineHeight="1"
                      transform="scale(0.85)"
                      transformOrigin="left center"
                    >
                      {reference.type.toUpperCase()}
                    </Badge>
                    <Text fontSize={{ base: "xs", lg: "sm" }} color="gray.500">
                      {reference.date[language]}
                    </Text>
                  </Flex>
                  
                  <Box flex={1}>
                    <LinkOverlay href={reference.url} isExternal>
                      <Heading as="h3" size={{ base: "sm", lg: "md" }} mb={{ base: 2, lg: 3 }} lineHeight="short" color="gray.800">
                        {reference.title[language]}
                      </Heading>
                    </LinkOverlay>
                    {reference.description && (
                      <Text color="gray.600" noOfLines={{ base: 2, lg: 3 }} mb={{ base: 3, lg: 4 }} lineHeight="tall" fontSize={{ base: "xs", lg: "sm" }}>
                        {reference.description[language]}
                      </Text>
                    )}
                  </Box>
                  
                  <Flex justify="space-between" align="center" fontSize={{ base: "xs", lg: "sm" }} color="gray.500" pt={{ base: 3, lg: 4 }} borderTop="1px solid" borderColor="gray.100">
                    <Text fontWeight="medium" fontSize={{ base: "xs", lg: "sm" }}>{reference.source[language]}</Text>
                    <Box
                      bg="blue.50"
                      color="blue.600"
                      px={{ base: 2, lg: 3 }}
                      py={1}
                      borderRadius="full"
                      fontSize={{ base: "2xs", lg: "xs" }}
                      fontWeight="semibold"
                    >
                      Read More
                    </Box>
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