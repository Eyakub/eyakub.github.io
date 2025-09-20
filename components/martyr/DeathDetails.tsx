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
          <VStack align="stretch" spacing={8}>
            <Box
              bg="rgba(255, 255, 255, 0.1)"
              p={8}
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
            >
              <Flex align="center" gap={3} mb={4}>
                <Box
                  w={3}
                  h={3}
                  bg="red.400"
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(248, 113, 113, 0.5)"
                />
                <Heading as="h3" size="lg" color="white">Location</Heading>
              </Flex>
              <Text color="gray.200" fontSize="lg" lineHeight="tall">
                {data.deathDetails.location[language]}
              </Text>
            </Box>
            
            <Box
              bg="rgba(255, 255, 255, 0.1)"
              p={8}
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
            >
              <Flex align="center" gap={3} mb={4}>
                <Box
                  w={3}
                  h={3}
                  bg="red.400"
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(248, 113, 113, 0.5)"
                />
                <Heading as="h3" size="lg" color="white">Cause</Heading>
              </Flex>
              <Text color="gray.200" fontSize="lg" lineHeight="tall">
                {data.deathDetails.cause[language]}
              </Text>
            </Box>
          </VStack>
          
          <Box
            bg="rgba(255, 255, 255, 0.1)"
            p={8}
            borderRadius="xl"
            border="1px solid rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
          >
            <Flex align="center" gap={3} mb={6}>
              <Box
                w={3}
                h={3}
                bg="red.400"
                borderRadius="full"
                boxShadow="0 0 10px rgba(248, 113, 113, 0.5)"
              />
              <Heading as="h3" size="lg" color="white">Full Account</Heading>
            </Flex>
            <Text color="gray.200" lineHeight="tall" fontSize="lg">
              {data.deathDetails.description[language]}
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}