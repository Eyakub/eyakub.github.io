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
    <Box as="section" id="martyrdom" py={16} bg="gray.900" color="white">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <Cross size={24} />
          <Heading as="h2" size="xl">Martyrdom</Heading>
        </Flex>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={12}>
          {/* Left Side - Location & Cause */}
          <VStack align="stretch" spacing={8}>
            <Box>
              <Heading as="h3" size="lg" color="white" mb={4} fontWeight="medium">
                Location
              </Heading>
              <Text color="gray.300" fontSize="lg" lineHeight="tall">
                {data.deathDetails.location[language]}
              </Text>
            </Box>
            
            <Box>
              <Heading as="h3" size="lg" color="white" mb={4} fontWeight="medium">
                Cause
              </Heading>
              <Text color="gray.300" fontSize="lg" lineHeight="tall">
                {data.deathDetails.cause[language]}
              </Text>
            </Box>
          </VStack>
          
          {/* Right Side - Details */}
          <Box>
            <Heading as="h3" size="lg" color="white" mb={6} fontWeight="medium">
              Details
            </Heading>
            <Text color="gray.300" lineHeight="tall" fontSize="lg">
              {data.deathDetails.description[language]}
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}