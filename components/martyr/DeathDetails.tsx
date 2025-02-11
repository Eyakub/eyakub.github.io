'use client';

import { MartyrData } from "../../types";
import { Cross } from "lucide-react";
import { Box, Container, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useLanguage } from "../../contexts/LanguageContext";

interface DeathDetailsProps {
  data: MartyrData;
}

export default function DeathDetails({ data }: DeathDetailsProps) {
  const { language } = useLanguage();

  return (
    <Box as="section" py={16} bg="gray.900" color="white">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <Cross size={24} />
          <Heading as="h2" size="xl">Martyrdom</Heading>
        </Flex>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading as="h3" size="md" mb={2}>Location</Heading>
              <Text color="gray.300">{data.deathDetails.location[language]}</Text>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={2}>Cause</Heading>
              <Text color="gray.300">{data.deathDetails.cause[language]}</Text>
            </Box>
          </VStack>
          <Box>
            <Heading as="h3" size="md" mb={4}>Details</Heading>
            <Text color="gray.300" lineHeight="tall">
              {data.deathDetails.description[language]}
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}