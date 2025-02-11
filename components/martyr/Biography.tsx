'use client';

import { MartyrData } from "../../types";
import { ScrollText } from "lucide-react";
import { Box, Container, Flex, Grid, GridItem, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useLanguage } from "../../contexts/LanguageContext";

interface BiographyProps {
  data: MartyrData;
}

export default function Biography({ data }: BiographyProps) {
  const { language } = useLanguage();

  return (
    <Box as="section" py={16} bg="white">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <ScrollText size={24} color="blue.500" />
          <Heading as="h2" size="xl">Biography</Heading>
        </Flex>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
          <VStack spacing={4}>
            <Image
              src={data.portrait}
              alt={data.name[language]}
              objectFit="cover"
              h="400px"
              w="full"
              borderRadius="lg"
              boxShadow="lg"
            />
            <Box bg="gray.50" p={6} borderRadius="lg" w="full">
              <Heading as="h3" size="md" mb={4}>Quick Facts</Heading>
              <Grid templateColumns="auto 1fr" gap={2}>
                <Text fontWeight="medium">Born:</Text>
                <Text textAlign="right">{data.birthDate[language]}</Text>
                <Text fontWeight="medium">Birthplace:</Text>
                <Text textAlign="right">{data.birthPlace[language]}</Text>
                <Text fontWeight="medium">Died:</Text>
                <Text textAlign="right">{data.deathDate[language]}</Text>
              </Grid>
            </Box>
          </VStack>
          <VStack align="stretch" spacing={6}>
            <Text fontSize="xl" color="gray.600">{data.shortBio[language]}</Text>
            {data.biography[language].split('\n\n').map((paragraph, index) => (
              <Text key={index} color="gray.700" lineHeight="tall">
                {paragraph}
              </Text>
            ))}
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}