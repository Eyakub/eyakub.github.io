import Biography from "../components/martyr/Biography";
import Timeline from "../components/martyr/Timeline";
import DeathDetails from "../components/martyr/DeathDetails";
import Gallery from "../components/martyr/Gallery";
import References from "../components/martyr/References";
import LanguageSwitch from "../components/martyr/LanguageSwitch";
import { LanguageProvider } from "../contexts/LanguageContext";
import { martyrData } from "../data/martyr";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <Box as="main" minH="100vh">
      <LanguageSwitch />
      <Box bg="gray.900" py={24} color="white" textAlign="center">
        <Container maxW="container.xl">
          <Heading as="h1" size="2xl" mb={4}>{martyrData.name.en}</Heading>
          <Text fontSize="xl" opacity={0.9}>
            {martyrData.birthDate.en} - {martyrData.deathDate.en}
          </Text>
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