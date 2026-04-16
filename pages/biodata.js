import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const MaterialIcon = ({ icon, fill, ...props }) => (
  <Box
    as="span"
    className="material-symbols-outlined"
    sx={{
      fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
    }}
    {...props}
  >
    {icon}
  </Box>
);

const Biodata = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const fonts = {
    serif: "'Noto Serif', serif",
    sans: "'Manrope', sans-serif",
  };

  const colors = {
    primary: "#031631",
    onPrimary: "#ffffff",
    surface: "#fbf9fb",
    onSurface: "#1b1b1e",
    surfaceLow: "#f5f3f6",
    surfaceLowest: "#ffffff",
    onSurfaceVariant: "#44474d",
    tertiaryFixedDim: "#e9c176",
    tertiaryContainer: "#3a2800",
    outlineVariant: "rgba(197, 198, 206, 0.15)",
  };

  if (!mounted) return null;

  return (
    <Box bg={colors.surface} color={colors.onSurface} minH="100vh" w="full" maxW="100vw" overflowX="hidden" fontFamily={fonts.sans}>
      <Head>
        <title>Biodata - MD Eyakub Sorkar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>
      </Head>

      {/* Main Content */}
      <Box as="main" py={{ base: 8, lg: 20 }} px={{ base: 4, lg: 12 }} maxW="6xl" mx="auto" w="full">

        {/* Hero Section */}
        <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={12} alignItems="end" mb={24}>
          <GridItem colSpan={{ lg: 7 }} spacing={6}>
            <Box display="inline-block" px={4} py={1} bg={colors.tertiaryContainer} color={colors.tertiaryFixedDim} borderRadius="full" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="0.2em" mb={4}>
              Marriage Biodata
            </Box>
            <Heading fontFamily={fonts.serif} fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }} fontWeight="bold" color={colors.primary} letterSpacing="tight" lineHeight="1.1" mb={6}>
              MD Eyakub <br /> <Box as="span" fontStyle="italic" fontWeight="normal">Sorkar</Box>
            </Heading>
            <Text fontSize="xl" color={colors.onSurfaceVariant} fontWeight="light" maxW="xl" lineHeight="relaxed">
              Software Engineer based in Dhaka. A warm and caring individual balancing modern tech with traditional family values.
            </Text>
          </GridItem>

          <GridItem colSpan={{ lg: 5 }} position="relative" role="group" minW={0} minH={0}>
            <Box position="absolute" top="-1rem" left="-1rem" right="-1rem" bottom="-1rem" bg={colors.surfaceLow} borderRadius="xl" zIndex={0} transition="transform 0.5s" _groupHover={{ transform: "scale(1.05)" }} />

            {/* Real Carousel Integration */}
            <Box position="relative" zIndex={1} w="full" minW={0} minH={0} sx={{ aspectRatio: "4/5" }} borderRadius="xl" overflow="hidden" boxShadow="2xl">
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{ enabled: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                style={{ width: "100%", height: "100%" }}
              >
                {["/image3.webp", "/image4.webp", "/image5.webp", "/image1.jpeg", "/eyakub2.jpg", "/eyakub3.jpg"].map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <Image src={src} w="full" h="full" objectFit="cover" objectPosition="center top" alt={`MD Eyakub Sorkar ${idx + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </GridItem>
        </Grid>

        {/* Bento Grid Information */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>

          {/* Personal Vitals */}
          <GridItem colSpan={{ md: 2 }} bg={colors.surfaceLow} p={{ base: 6, md: 10 }} borderRadius="xl" overflow="hidden">
            <HStack mb={8} spacing={3}>
              <Box w={12} h="1px" bg={colors.tertiaryFixedDim} />
              <Heading fontFamily={fonts.serif} fontSize="sm" fontWeight="bold" color={colors.primary} textTransform="uppercase" letterSpacing="widest">
                Personal Essence
              </Heading>
            </HStack>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gapY={10} gapX={6}>
              <Box>
                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" tracking="tighter" color={colors.onSurfaceVariant} mb={1}>Date of Birth</Text>
                <Text fontWeight="bold" color={colors.primary}>26 May 1995</Text>
              </Box>
              <Box>
                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" tracking="tighter" color={colors.onSurfaceVariant} mb={1}>Stature</Text>
                <Text fontWeight="bold" color={colors.primary}>5' 6" (171 cm)</Text>
              </Box>
              <Box>
                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" tracking="tighter" color={colors.onSurfaceVariant} mb={1}>Marital Status</Text>
                <Text fontWeight="bold" color={colors.primary}>Single</Text>
              </Box>
              <Box>
                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" tracking="tighter" color={colors.onSurfaceVariant} mb={1}>Current City</Text>
                <Text fontWeight="bold" color={colors.primary}>Dhaka (Raised here)</Text>
              </Box>
            </Grid>
            <Box mt={12} pt={8} borderTop="1px solid" borderColor={colors.outlineVariant}>
              <Heading fontFamily={fonts.serif} as="h3" fontSize="xl" fontStyle="italic" mb={4} color={colors.primary}>
                "A warm, caring soul who treasures the sanctity of family and the thrill of discovery."
              </Heading>
              <Text color={colors.onSurfaceVariant} lineHeight="relaxed">
                I am a warm and caring individual who values family and friendships. I enjoy traveling, learning new things, and staying active. I believe in mutual respect and understanding in a relationship. I'm looking for a partner who is a friend first and someone to grow together with.
              </Text>
            </Box>
          </GridItem>

          {/* Professional Pedigree */}
          <GridItem bg={colors.primary} color={colors.onPrimary} p={{ base: 6, md: 10 }} borderRadius="xl" overflow="hidden" display="flex" flexDir="column" justify="space-between">
            <Box>
              <MaterialIcon icon="terminal" color={colors.tertiaryFixedDim} fontSize="4xl" mb={6} />
              <Heading fontFamily={fonts.serif} fontSize="2xl" fontWeight="bold" mb={2}>Career & Education</Heading>
              <Text color="#d6e3ff" opacity={0.7} fontSize="sm" mb={8}>Engineering Excellence</Text>
              <VStack align="stretch" spacing={6}>
                <Box>
                  <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color={colors.tertiaryFixedDim} mb={1}>Current Role</Text>
                  <Text fontWeight="semibold">Software Engineer</Text>
                  <Text fontSize="xs" opacity={0.6}>The Glass House, Gulshan 1</Text>
                </Box>
                <Box>
                  <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color={colors.tertiaryFixedDim} mb={1}>Academic Background</Text>
                  <Text fontWeight="semibold">B.Sc in Computer Science</Text>
                  <Text fontSize="xs" opacity={0.6}>Daffodil International University (2015-2019)</Text>
                </Box>
              </VStack>
            </Box>
          </GridItem>

          {/* Family Heritage */}
          <GridItem colSpan={{ md: 2 }} bg={colors.surfaceLowest} p={{ base: 6, md: 10 }} borderRadius="xl" boxShadow="xl" overflow="hidden">
            <HStack mb={8} spacing={3}>
              <Box w={8} h="1px" bg={colors.tertiaryFixedDim} />
              <Heading fontFamily={fonts.serif} fontSize="sm" fontWeight="bold" color={colors.primary} textTransform="uppercase" letterSpacing="widest">
                Family Heritage
              </Heading>
            </HStack>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={10}>
              <VStack align="stretch" spacing={8}>
                <HStack align="flex-start" spacing={4}>
                  <MaterialIcon icon="person" color={colors.primary} mt={1} />
                  <Box>
                    <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color={colors.onSurfaceVariant}>Father</Text>
                    <Text fontWeight="bold" color={colors.primary}>MD Yusuf Sarker</Text>
                    <Text fontSize="xs" color={colors.onSurfaceVariant}>Business</Text>
                  </Box>
                </HStack>
                <HStack align="flex-start" spacing={4}>
                  <MaterialIcon icon="favorite" color={colors.primary} mt={1} />
                  <Box>
                    <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" color={colors.onSurfaceVariant}>Mother</Text>
                    <Text fontWeight="bold" color={colors.primary}>Bilquis Akter</Text>
                    <Text fontSize="xs" color={colors.onSurfaceVariant}>Homemaker</Text>
                  </Box>
                </HStack>
              </VStack>
              <Box>
                <HStack mb={4} spacing={2}>
                  <MaterialIcon icon="groups" color={colors.primary} />
                  <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" color={colors.onSurfaceVariant}>Siblings (4)</Text>
                </HStack>
                <VStack align="stretch" spacing={3}>
                  <Box p={3} bg={colors.surfaceLow} borderRadius="lg" border="1px solid" borderColor={colors.outlineVariant}>
                    <Text fontSize="xs" fontWeight="bold" color={colors.primary}>Eyahya (Brother)</Text>
                    <Text fontSize="10px" color={colors.onSurfaceVariant} textTransform="uppercase" fontWeight="medium">Married, Teacher</Text>
                  </Box>
                  <Box p={3} bg={colors.surfaceLow} borderRadius="lg" border="1px solid" borderColor={colors.outlineVariant}>
                    <Text fontSize="xs" fontWeight="bold" color={colors.primary}>Eyasir (Brother)</Text>
                    <Text fontSize="10px" color={colors.onSurfaceVariant} textTransform="uppercase" fontWeight="medium">Late, Student</Text>
                  </Box>
                  <Box p={3} bg={colors.surfaceLow} borderRadius="lg" border="1px solid" borderColor={colors.outlineVariant}>
                    <Text fontSize="xs" fontWeight="bold" color={colors.primary}>Hafsa (Sister)</Text>
                    <Text fontSize="10px" color={colors.onSurfaceVariant} textTransform="uppercase" fontWeight="medium">Pursuing Bachelor's Degree</Text>
                  </Box>
                  <Box p={3} bg={colors.surfaceLow} borderRadius="lg" border="1px solid" borderColor={colors.outlineVariant}>
                    <Text fontSize="xs" fontWeight="bold" color={colors.primary}>Nusaiba Tasnim (Sister)</Text>
                    <Text fontSize="10px" color={colors.onSurfaceVariant} textTransform="uppercase" fontWeight="medium">Student</Text>
                  </Box>
                </VStack>
              </Box>
            </Grid>
          </GridItem>

          {/* Expectations */}
          <GridItem bg={colors.tertiaryContainer} color={colors.onPrimary} p={{ base: 6, md: 10 }} borderRadius="xl" borderLeft="8px solid" borderColor={colors.tertiaryFixedDim} overflow="hidden">
            <HStack mb={8} spacing={3}>
              <Box w={8} h="1px" bg={colors.tertiaryFixedDim} />
              <Heading fontFamily={fonts.serif} fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                The Ideal Union
              </Heading>
            </HStack>
            <VStack align="stretch" spacing={4}>
              <HStack align="flex-start" spacing={3}>
                <MaterialIcon icon="check_circle" fill color={colors.tertiaryFixedDim} fontSize="sm" mt={1} />
                <Text fontSize="sm" fontWeight="medium" lineHeight="short">Minimum 5'2" preferred. Preferably holds a bachelor’s degree.</Text>
              </HStack>
              <HStack align="flex-start" spacing={3}>
                <MaterialIcon icon="check_circle" fill color={colors.tertiaryFixedDim} fontSize="sm" mt={1} />
                <Text fontSize="sm" fontWeight="medium" lineHeight="short">Wearing a hijab is not mandatory, but maintaining a decent dress sense is required.</Text>
              </HStack>
              <HStack align="flex-start" spacing={3}>
                <MaterialIcon icon="check_circle" fill color={colors.tertiaryFixedDim} fontSize="sm" mt={1} />
                <Text fontSize="sm" fontWeight="medium" lineHeight="short">Practicing Muslim, soft-spoken, and well-mannered.</Text>
              </HStack>
              <HStack align="flex-start" spacing={3}>
                <MaterialIcon icon="check_circle" fill color={colors.tertiaryFixedDim} fontSize="sm" mt={1} />
                <Text fontSize="sm" fontWeight="medium" lineHeight="short">Family-oriented, values mutual respect, and looks to be friends first.</Text>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>

        {/* Contact Footer */}
        <Box mt={24} bg={colors.surfaceLow} borderRadius="3xl" p={{ base: 8, md: 12 }} overflow="hidden" position="relative">
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={12} position="relative" zIndex={10}>
            <Box>
              <Heading fontFamily={fonts.serif} fontSize="4xl" fontWeight="bold" color={colors.primary} mb={4} lineHeight="tight">
                Begin the <br /> Conversation
              </Heading>
              <Text color={colors.onSurfaceVariant} maxW="sm" lineHeight="relaxed">
                For inquiries regarding this profile or to arrange a meeting, please reach out via the provided verified channels.
              </Text>
            </Box>
            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={8}>
              <Box>
                <Text fontSize="10px" fontWeight="black" textTransform="uppercase" letterSpacing="0.2em" color={colors.onSurfaceVariant} mb={2}>Call or WhatsApp</Text>
                <Text fontSize="lg" fontWeight="bold" color={colors.primary}>+880 1937424217</Text>
              </Box>
              <Box>
                <Text fontSize="10px" fontWeight="black" textTransform="uppercase" letterSpacing="0.2em" color={colors.onSurfaceVariant} mb={2}>Email</Text>
                <Text fontSize="lg" fontWeight="bold" color={colors.primary} wordBreak="break-word">eyakubsorkar@gmail.com</Text>
              </Box>
              <Box>
                <Text fontSize="10px" fontWeight="black" textTransform="uppercase" letterSpacing="0.2em" color={colors.onSurfaceVariant} mb={2}>Instagram</Text>
                <Link href="https://instagram.com/eyakub.me" isExternal _hover={{ textDecoration: "none" }}>
                  <Text fontSize="lg" fontWeight="bold" color={colors.primary}>@eyakub.me</Text>
                </Link>
              </Box>
              <Box>
                <Text fontSize="10px" fontWeight="black" textTransform="uppercase" letterSpacing="0.2em" color={colors.onSurfaceVariant} mb={2}>Current Address</Text>
                <Text fontSize="md" fontWeight="bold" color={colors.primary} lineHeight="short">Bank Tower, Gas Road, Shanirakhra, Dhaka-1226</Text>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Box>
  );
};

export default Biodata;
