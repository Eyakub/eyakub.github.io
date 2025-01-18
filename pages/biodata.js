// pages/biodata.js
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  List,
  ListItem,
  Link,
  UnorderedList,
  Image as ChakraImage,
  useColorModeValue,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Head from "next/head";

// Initialize Swiper modules
SwiperCore.use([Pagination, Navigation]);

const Biodata = () => {
  const sectionTitleColor = useColorModeValue("black", "gray.700", "gray.200");
  const footerBg = useColorModeValue("white", "gray.800");
  const footerBorderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <Head>
        <title>Biodata - MD Eyakub Sorkar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxW="container.xl" py={10}>
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          overflow="hidden"
          maxW="900px"
          mx="auto"
        >
          {/* Header Section */}
          <Box bg="#a9bcd1" color="white" textAlign="center" py={8}>
            {/* Swiper Carousel */}
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              style={{ width: "50%", height: "", maxHeight: "600px" }}
            >
              <SwiperSlide>
                <ChakraImage
                  src="/image1.jpeg"
                  alt="Photo 1"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ChakraImage
                  src="/eyakub2.jpg"
                  alt="Photo 2"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </SwiperSlide>
              <SwiperSlide>
                <ChakraImage
                  src="/eyakub3.jpg"
                  alt="Photo 3"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </SwiperSlide>
            </Swiper>

            <Heading as="h1" size="2xl" mt={4}>
              MD Eyakub Sorkar
            </Heading>
            <Text fontSize="xl" fontWeight="300">
              Software Engineer
            </Text>
          </Box>

          {/* Main Body */}
          <Box p={8}>
            {/* About Section */}
            <Box mb={6}>
              <Heading
                as="h3"
                size="lg"
                mb={2}
                // textTransform="uppercase"
                color={sectionTitleColor}
              >
                About Me
              </Heading>
              <Text color={sectionTitleColor}>
                I am a warm and caring individual who values family and friendships.
                I enjoy traveling, learning new things, and staying active. I
                believe in mutual respect and understanding in a relationship.
              </Text>
            </Box>

            {/* Personal Information & Contact */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={6}>
              {/* Personal Details */}
              <Box>
                <Heading
                  as="h3"
                  size="lg"
                  mb={2}
                  // textTransform="uppercase"
                  color={sectionTitleColor}
                >
                  Personal Details
                </Heading>
                <List spacing={2} color={sectionTitleColor}>
                  <ListItem>
                    <strong>Date of Birth:</strong> 26th May 1995
                  </ListItem>
                  <ListItem>
                    <strong>Height:</strong> 5'6" (171 cm)
                  </ListItem>
                  <ListItem>
                    <strong>Marital Status:</strong> Single
                  </ListItem>
                  <ListItem>
                    <strong>Religion:</strong> Islam
                  </ListItem>
                  <ListItem>
                    <strong>Current City:</strong> Dhaka, Bangladesh (Raised and grew up)
                  </ListItem>
                </List>
              </Box>

              {/* Contact Details */}
              <Box>
                <Heading
                  as="h3"
                  size="lg"
                  mb={2}
                  // textTransform="uppercase"
                  color={sectionTitleColor}
                >
                  Contact Details
                </Heading>
                <List spacing={2} color={sectionTitleColor}>
                  <ListItem>
                    <strong>Mobile:</strong> +880 1937424217
                  </ListItem>
                  <ListItem>
                    <strong>Email:</strong>{" "}
                    <Link href="mailto:eyakubsorkar@gmail.com" color="teal.500">
                      eyakubsorkar@gmail.com
                    </Link>
                  </ListItem>
                  <ListItem>
                    <strong>Address:</strong> Bank Tower, Gas Road, Shanirakhra,
                    Dhaka-1226
                  </ListItem>
                  <ListItem>
                    <strong>WhatsApp:</strong> +880 1937424217
                  </ListItem>
                  <ListItem>
                    <strong>Instagram:</strong>{" "}
                    <Link
                      href="https://www.instagram.com/eyakub.me"
                      color="teal.500"
                      isExternal
                    >
                      eyakub.me &rarr;
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Grid>

            {/* Family Background Section */}
            <Box mb={6}>
              <Heading
                as="h3"
                size="lg"
                mb={2}
                // textTransform="uppercase"
                color={sectionTitleColor}
              >
                Family Background
              </Heading>
              <List spacing={2} color={sectionTitleColor}>
                <ListItem>
                  <strong>Father’s Name & Occupation:</strong> MD Yusuf Sarker,
                  Business
                </ListItem>
                <ListItem>
                  <strong>Mother’s Name & Occupation:</strong> Bilquis Akter,
                  Homemaker
                </ListItem>
                <ListItem>
                  <strong>Siblings (3):</strong>
                  <List spacing={1} mt={1}>
                    <ListItem>
                      Brother #1: Eyahya, Married, Teacher
                    </ListItem>
                    <ListItem>
                      Brother #2: Eyasir, Late, Student
                    </ListItem>
                    <ListItem>
                      Sister #1: Hafsa, Pursuing Bachelor's Degree
                    </ListItem>
                    <ListItem>
                      Sister #2: Nusaiba Tasnim, Student
                    </ListItem>
                  </List>
                </ListItem>
              </List>
            </Box>

            {/* Education Section */}
            <Box mb={6}>
              <Heading
                as="h3"
                size="lg"
                mb={2}
                // textTransform="uppercase"
                color={sectionTitleColor}
              >
                Education
              </Heading>
              <Heading as="h5" size="md" mb={1} color={sectionTitleColor}>
                Bachelor's in Computer Science
              </Heading>
              <Text color="gray.500">
                Daffodil International University | 2015 - 2019
              </Text>
            </Box>

            {/* Current Job Section */}
            <Box mb={6}>
              <Heading
                as="h3"
                size="lg"
                mb={2}
                // textTransform="uppercase"
                color={sectionTitleColor}
              >
                Current Job
              </Heading>
              <List spacing={2} color={sectionTitleColor}>
                <ListItem>
                  <strong>Position:</strong> Full Stack Engineer at Goama
                </ListItem>
                <ListItem>
                  <strong>Location:</strong> Gulshan 2, Dhaka
                </ListItem>
              </List>
            </Box>

            {/* Hobbies / Interests Section */}
            <Box mb={6}>
              <Heading
                as="h3"
                size="lg"
                mb={2}
                // textTransform="uppercase"
                color={sectionTitleColor}
              >
                Hobbies & Interests
              </Heading>
              <Text color={sectionTitleColor}>
                I enjoy traveling, music, gaming, and reading. These activities help me
                stay active and continuously learn new things.
              </Text>
            </Box>

          {/* Expectations from Bride Section */}
          <Box>
              <Heading
                as="h3"
                size="lg"
                mb={2}
                // textTransform="uppercase"
                color={sectionTitleColor}
              >
                Expectations from Bride
              </Heading>
              <List spacing={2} color={sectionTitleColor}>
                <ListItem>
                  <strong>Height:</strong> Minimum 5'2", prefered.
                </ListItem>
                <ListItem>
                  <strong>Character:</strong> Matured, well-mannered, Soft-spoken, Practicing Muslim, someone who wants to grow together, i'm looking for a friend. (Must have)
                </ListItem>
                <ListItem>
                  <strong>Appearance:</strong> Wearing a hijab is not mandatory, but maintaining a decent dress sense is required.
                </ListItem>
                <ListItem>
                  <strong>Education:</strong> Preferably holds a bachelor’s degree.
                </ListItem>
                <ListItem>
                  <strong>Additional:</strong>
                  <UnorderedList spacing={2} pl={4}>
                    <ListItem>
                      Values mutual respect, understanding, and open communication in a relationship.
                    </ListItem>
                    <ListItem>
                      Family-oriented and cherishes strong familial bonds.
                    </ListItem>
                    <ListItem>
                    I want a companion who appreciates maintaining an active lifestyle, both mentally and physically. A healthy and active lifestyle, whether through hobbies, physical activity, or education, contributes to a pleasant and harmonious family life, in my opinion.
                    </ListItem>
                  </UnorderedList>
                </ListItem>
              </List>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            bg={footerBg}
            borderTop="1px solid"
            borderColor={footerBorderColor}
            textAlign="center"
            py={4}
          >
            <Text fontSize="sm">&copy; 2025 MD Eyakub Sorkar. All rights reserved.</Text>
          </Box>
        </Box>

        
      </Container>
    </>
  );
};

export default Biodata;
