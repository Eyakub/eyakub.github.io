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
    <Box as="section" id="biography" py={16} bg="white">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <ScrollText size={24} color="blue.500" />
          <Heading as="h2" size="xl" color="gray.800">Biography</Heading>
        </Flex>
        <Grid templateColumns={{ base: '1fr', lg: '400px 1fr' }} gap={{ base: 8, lg: 12 }} alignItems="start">
          <VStack spacing={6} position={{ base: "static", lg: "sticky" }} top={{ base: "auto", lg: 8 }}>
            <Box position="relative">
              <Image
                src={data.portrait}
                alt={data.name[language]}
                objectFit="cover"
                h={{ base: "350px", lg: "450px" }}
                w="full"
                borderRadius="xl"
                boxShadow="2xl"
                border="4px solid"
                borderColor="red.100"
              />
              {/* Memorial Badge */}
              <Box
                position="absolute"
                top={4}
                right={4}
                bg="red.500"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="bold"
                letterSpacing="wide"
              >
                শহীদ
              </Box>
            </Box>
            
            <Box 
              bg="linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)" 
              p={{ base: 6, lg: 8 }} 
              borderRadius="xl" 
              w="full"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="lg"
            >
              <Heading as="h3" size="lg" mb={6} color="gray.800" textAlign="center">
                Quick Facts
              </Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={1}>
                    Born
                  </Text>
                  <Text fontSize="lg" color="gray.800" fontWeight="medium">
                    {data.birthDate[language]}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={1}>
                    Birthplace
                  </Text>
                  <Text fontSize="lg" color="gray.800" fontWeight="medium">
                    {data.birthPlace[language]}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={1}>
                    Martyrdom
                  </Text>
                  <Text fontSize="lg" color="red.600" fontWeight="medium">
                    {data.deathDate[language]}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={1}>
                    Bangladesh Shaheed Gazette No
                  </Text>
                  <Text fontSize="lg" color="gray.800" fontWeight="medium">
                    {data.gazette_no[language]}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={1}>
                    MIS ID
                  </Text>
                  <Text fontSize="lg" color="gray.800" fontWeight="medium">
                    {data.mis_id[language]}
                  </Text>
                </Box>
              </VStack>
            </Box>
          </VStack>
          
          <VStack align="stretch" spacing={{ base: 6, lg: 8 }}>
            <Box>
              <Text 
                fontSize={{ base: "xl", lg: "2xl" }} 
                color="gray.700" 
                lineHeight="tall"
                fontWeight="medium"
                mb={6}
                textAlign="center"
                bg="gray.50"
                p={{ base: 4, lg: 6 }}
                borderRadius="lg"
                borderLeft="4px solid"
                borderLeftColor="red.500"
              >
                {data.shortBio[language]}
              </Text>
            </Box>
            
            <Box>
              <Heading as="h3" size="lg" mb={6} color="gray.800">
                Life Story
              </Heading>
              <VStack spacing={{ base: 4, lg: 6 }} align="stretch">
                {data.biography[language].split('\n\n').map((paragraph, index) => (
                  <Text 
                    key={index} 
                    color="gray.700" 
                    lineHeight="tall"
                    fontSize={{ base: "md", lg: "lg" }}
                    textAlign="justify"
                  >
                    {paragraph}
                  </Text>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}