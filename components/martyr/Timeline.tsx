'use client';

import { MartyrData } from "../../types";
import { Clock } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Box, Container, Flex, Heading, Text, VStack, HStack, Circle, Divider } from "@chakra-ui/react";

interface TimelineProps {
  data: MartyrData;
}

export default function Timeline({ data }: TimelineProps) {
  const { language } = useLanguage();

  return (
    <Box as="section" id="timeline" py={16} bg="gray.50">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={12}>
          <Clock size={24} color="blue.500" />
          <Heading as="h2" size="xl" color="gray.800">Life Timeline</Heading>
        </Flex>
        <Box position="relative">
          {/* Desktop Timeline Line */}
          <Box
            position="absolute"
            left={{ base: "20px", md: "50%" }}
            transform={{ base: "none", md: "translateX(-50%)" }}
            h="full"
            w={{ base: "2px", md: "2px" }}
            bg="linear-gradient(to bottom, #3182ce, #e53e3e)"
            display={{ base: "block", md: "block" }}
          />
          
          <VStack spacing={{ base: 4, md: 8 }}>
            {data.timeline.map((event, index) => (
              <Box key={index} w="full">
                {/* Desktop Layout */}
                <Flex
                  w="full"
                  justify="center"
                  direction={{ base: "column", md: index % 2 === 0 ? 'row' : 'row-reverse' }}
                  display={{ base: "none", md: "flex" }}
                >
                  <Box w="50%" pr={index % 2 === 0 ? 8 : 0} pl={index % 2 === 0 ? 0 : 8}>
                    {index % 2 === 0 ? (
                      <Box
                        bg="white"
                        p={6}
                        borderRadius="xl"
                        boxShadow="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        position="relative"
                        _before={{
                          content: '""',
                          position: "absolute",
                          right: "-12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 0,
                          height: 0,
                          borderTop: "12px solid transparent",
                          borderBottom: "12px solid transparent",
                          borderLeft: "12px solid white"
                        }}
                      >
                        <VStack align="flex-end" spacing={3}>
                          <Text fontSize="xl" fontWeight="bold" color="blue.500">
                            {event.date[language]}
                          </Text>
                          <Heading as="h3" size="md" color="gray.800">{event.title[language]}</Heading>
                          <Text color="gray.600" textAlign="right" lineHeight="tall">
                            {event.description[language]}
                          </Text>
                        </VStack>
                      </Box>
                    ) : null}
                  </Box>
                  
                  <Box position="relative" zIndex={2}>
                    <Circle 
                      size={6} 
                      bg="blue.500" 
                      border="4px" 
                      borderColor="white" 
                      boxShadow="lg"
                    />
                  </Box>
                  
                  <Box w="50%" pl={index % 2 === 0 ? 8 : 0} pr={index % 2 === 0 ? 0 : 8}>
                    {index % 2 === 1 ? (
                      <Box
                        bg="white"
                        p={6}
                        borderRadius="xl"
                        boxShadow="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        position="relative"
                        _before={{
                          content: '""',
                          position: "absolute",
                          left: "-12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 0,
                          height: 0,
                          borderTop: "12px solid transparent",
                          borderBottom: "12px solid transparent",
                          borderRight: "12px solid white"
                        }}
                      >
                        <VStack align="flex-start" spacing={3}>
                          <Text fontSize="xl" fontWeight="bold" color="blue.500">
                            {event.date[language]}
                          </Text>
                          <Heading as="h3" size="md" color="gray.800">{event.title[language]}</Heading>
                          <Text color="gray.600" lineHeight="tall">
                            {event.description[language]}
                          </Text>
                        </VStack>
                      </Box>
                    ) : null}
                  </Box>
                </Flex>
                
                {/* Mobile Layout */}
                <Flex
                  w="full"
                  direction="row"
                  display={{ base: "flex", md: "none" }}
                  align="flex-start"
                  gap={3}
                >
                  <Box position="relative">
                    <Circle 
                      size={5} 
                      bg="blue.500" 
                      border="3px" 
                      borderColor="white" 
                      boxShadow="md"
                    />
                  </Box>
                  
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="md"
                    border="1px solid"
                    borderColor="gray.200"
                    flex={1}
                  >
                    <VStack align="flex-start" spacing={2}>
                      <Text fontSize="sm" fontWeight="bold" color="blue.500">
                        {event.date[language]}
                      </Text>
                      <Heading as="h3" size="sm" color="gray.800">{event.title[language]}</Heading>
                      <Text color="gray.600" lineHeight="tall" fontSize="sm">
                        {event.description[language]}
                      </Text>
                    </VStack>
                  </Box>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}