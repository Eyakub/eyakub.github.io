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
} from "@chakra-ui/react";

interface GalleryProps {
  data: MartyrData;
}

export default function Gallery({ data }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { language } = useLanguage();

  return (
    <Box as="section" py={16} bg="white">
      <Container maxW="container.xl">
        <Flex align="center" gap={2} mb={8}>
          <ImageIcon size={24} color="blue.500" />
          <Heading as="h2" size="xl">Image Gallery</Heading>
        </Flex>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          {data.gallery.map((image, index) => (
            <Box
              key={index}
              position="relative"
              cursor="pointer"
              onClick={() => setSelectedImage(index)}
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
            >
              <Image
                src={image.url}
                alt={image.alt[language]}
                h="256px"
                w="full"
                objectFit="cover"
                borderRadius="lg"
              />
              <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.400"
                opacity={0}
                transition="opacity 0.3s"
                _hover={{ opacity: 1 }}
                borderRadius="lg"
                display="flex"
                alignItems="flex-end"
              >
                <Text color="white" p={4}>{image.caption[language]}</Text>
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