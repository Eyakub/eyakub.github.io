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
    <Box as="section" py={16} bg="gray.50">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={12}>
          <Clock size={24} color="blue.500" />
          <Heading as="h2" size="xl" color="gray.800">Life Timeline</Heading>
        </Flex>
        <Box position="relative">
          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            h="full"
            w="2px"
            bg="gray.200"
          />
          <VStack spacing={12}>
            {data.timeline.map((event, index) => (
              <Flex
                key={index}
                w="full"
                justify="center"
                direction={index % 2 === 0 ? 'row' : 'row-reverse'}
              >
                <Box w="50%" pr={index % 2 === 0 ? 8 : 0} pl={index % 2 === 0 ? 0 : 8}>
                  {index % 2 === 0 ? (
                    <VStack align="flex-end" spacing={2}>
                      <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                        {event.date[language]}
                      </Text>
                      <Heading as="h3" size="md" color="gray.800">{event.title[language]}</Heading>
                      <Text color="gray.600" textAlign="right">{event.description[language]}</Text>
                    </VStack>
                  ) : null}
                </Box>
                <Circle size={4} bg="blue.500" border="4px" borderColor="white" zIndex={1} />
                <Box w="50%" pl={index % 2 === 0 ? 8 : 0} pr={index % 2 === 0 ? 0 : 8}>
                  {index % 2 === 1 ? (
                    <VStack align="flex-start" spacing={2}>
                      <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                        {event.date[language]}
                      </Text>
                      <Heading as="h3" size="md" color="gray.800">{event.title[language]}</Heading>
                      <Text color="gray.600">{event.description[language]}</Text>
                    </VStack>
                  ) : null}
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}