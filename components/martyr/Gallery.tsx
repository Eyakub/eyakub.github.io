'use client';

import { MartyrData } from "../../types";
import { Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from "@chakra-ui/react";

interface GalleryProps {
  data: MartyrData;
}

export default function Gallery({ data }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { language } = useLanguage();
  const lang = language as "en" | "bn";

  return (
    <Box as="section" id="gallery" py={16} bg="white">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <ImageIcon size={24} color="blue.500" />
          <Heading as="h2" size="xl" color="gray.800">Image Gallery</Heading>
        </Flex>
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 6, lg: 8 }}>
          {data.gallery.map((image, index) => (
            <Box
              key={index}
              position="relative"
              cursor="pointer"
              onClick={() => setSelectedImage(index)}
              transition="all 0.3s ease"
              _hover={{ 
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
              borderRadius="xl"
              overflow="hidden"
              bg="white"
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.200"
            >
              <Image
                src={image.url}
                alt={image.alt[lang]}
                h={{ base: "200px", md: "240px", lg: "280px" }}
                w="full"
                objectFit="cover"
                transition="transform 0.3s ease"
                _groupHover={{ transform: 'scale(1.1)' }}
              />
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
                opacity={0}
                transition="opacity 0.3s ease"
                _hover={{ opacity: 1 }}
                display="flex"
                alignItems="flex-end"
                p={{ base: 4, lg: 6 }}
              >
                <VStack align="flex-start" spacing={2} w="full">
                  <Text 
                    color="white" 
                    fontSize={{ base: "md", lg: "lg" }} 
                    fontWeight="semibold"
                    lineHeight="short"
                  >
                    {image.caption[lang]}
                  </Text>
                  <Box
                    bg="rgba(255, 255, 255, 0.2)"
                    px={{ base: 2, lg: 3 }}
                    py={1}
                    borderRadius="full"
                    fontSize={{ base: "xs", lg: "sm" }}
                    color="white"
                    fontWeight="medium"
                  >
                    Click to view
                  </Box>
                </VStack>
              </Box>
            </Box>
          ))}
        </Grid>

        <Modal
          isOpen={selectedImage !== null}
          onClose={() => setSelectedImage(null)}
          size="4xl"
          isCentered
        >
          <ModalOverlay />
          <ModalContent bg="transparent" boxShadow="none">
            <ModalCloseButton color="white" />
            <ModalBody p={4}>
              {selectedImage !== null && (
                <Box>
                  <Image
                    src={data.gallery[selectedImage].url}
                    alt={data.gallery[selectedImage].alt[language]}
                    maxH="80vh"
                    w="full"
                    objectFit="contain"
                  />
                  <Text color="white" textAlign="center" mt={4}>
                    {data.gallery[selectedImage].caption[language]}
                  </Text>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}