import Biography from "../components/martyr/Biography";
import Timeline from "../components/martyr/Timeline";
import DeathDetails from "../components/martyr/DeathDetails";
import Gallery from "../components/martyr/Gallery";
import References from "../components/martyr/References";
import LanguageSwitch from "../components/martyr/LanguageSwitch";
import { LanguageProvider } from "../contexts/LanguageContext";
import { martyrData } from "../data/martyr";
import { Box, Container, Heading, Text, Flex, Button, VStack } from "@chakra-ui/react";
import { useLanguage } from "../contexts/LanguageContext";
import Head from 'next/head';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function Home() {
  return (
    <LanguageProvider>
      <Head>
        <title>Shohid Eyasir Sarker - Biography</title>
      </Head>
      <Box as="main" minH="100vh">
      <LanguageSwitch />
      <Box 
        bg="linear-gradient(135deg, #1a202c 0%, #2d3748 100%)" 
        py={32} 
        color="white" 
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JhaW4pIi8+PC9zdmc+')"
        />
        
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <Box mb={8}>
            <Text 
              fontSize="lg" 
              color="red.300" 
              fontWeight="semibold" 
              letterSpacing="wide"
              mb={4}
            >
              শহীদ / MARTYR
            </Text>
            <Heading 
              as="h1" 
              size="4xl" 
              mb={6}
              fontWeight="bold"
              lineHeight="shorter"
              bgGradient="linear(to-r, white, red.200)"
              bgClip="text"
            >
              {martyrData.name.en}
            </Heading>
            <Text 
              fontSize="2xl" 
              color="gray.300" 
              mb={8}
              fontWeight="light"
            >
              {martyrData.birthDate.en} - {martyrData.deathDate.en}
            </Text>
            <Text 
              fontSize="lg" 
              color="gray.400" 
              maxW="2xl" 
              mx="auto"
              lineHeight="tall"
            >
              {martyrData.shortBio.en}
            </Text>
          </Box>
          
          {/* Memorial Quote */}
          <Box 
            bg="rgba(255, 255, 255, 0.1)" 
            p={8} 
            borderRadius="xl" 
            maxW="4xl" 
            mx="auto"
            border="1px solid rgba(255, 255, 255, 0.2)"
          >
            <Text 
              fontSize="xl" 
              fontStyle="italic" 
              color="white"
              lineHeight="tall"
            >
              "True heroes never fade—they live on in the hearts of those they fought for."
            </Text>
          </Box>
          
          {/* Scroll Down Indicator */}
          <VStack spacing={4} mt={12}>
            <Text color="gray.400" fontSize="sm" fontWeight="medium">
              Scroll to explore
            </Text>
            <ChevronDownIcon 
              color="gray.400" 
              boxSize={8} 
              animation="bounce 2s infinite"
            />
          </VStack>
        </Container>
      </Box>
      
      <Biography data={martyrData} />
      <Timeline data={martyrData} />
      <DeathDetails data={martyrData} />
      <Gallery data={martyrData} />
      <References data={martyrData} />
    </Box>
    </LanguageProvider>  );
}