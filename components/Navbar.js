import React, { useRef } from 'react'
import {
  Button,
  Flex,
  Box,
  Slide,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Icon,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import { AiOutlineMenu } from 'react-icons/ai'

export default function Navbar({ enableTransition }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const Bracket = styled.span`
    color: #8f9094;
    font-weight: 600;
  `
  const NavbarDrawer = () => (
    <>
      <Drawer
        initialFocusRef={firstField}
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent bgColor="secondary">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Bracket>&#123;</Bracket>E<Bracket>&#125;</Bracket>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Button as={NextLink} href="/" fontSize="16px" variant="ghost">
                Home
              </Button>
              <Button as={NextLink} href="/projects" fontSize="16px" variant="ghost">
                Projects
              </Button>
              <Button as={NextLink} href="/blog" fontSize="16px" variant="ghost">
                Blog
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )

  return (
    <Box pos="sticky" zIndex={99}>
      <Slide
        direction="top"
        transition={
          enableTransition
            ? { enter: { duration: 0.5, delay: 0.01 } }
            : { enter: { duration: 0, delay: 0 } }
        }
        in={true}
      >
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          direction="row"
          w={{ base: '100%', lg: '75rem' }}
          mx="auto"
          px="22px"
          py="3"
          bg="black"
          borderBottom="0.5px solid #1e2029"
        >
          <NextLink href="/" style={{ textDecoration: 'none' }}>
            <Box
              as="span"
              color="displayColor"
              fontSize="32px"
              fontWeight="bold"
              cursor="pointer"
            >
              <Bracket>&#123;</Bracket>E<Bracket>&#125;</Bracket>
            </Box>
          </NextLink>
          <Box mr={7} color="displayColor" display={{ base: 'none', md: 'block' }}>
            <Button as={NextLink} href="/" p="4" fontSize="16px" variant="ghost" _hover={{ bg: 'gray.700' }}>
              Home
            </Button>
            <Button as={NextLink} href="/projects" p="4" fontSize="16px" variant="ghost" _hover={{ bg: 'gray.700' }}>
              Projects
            </Button>
            <Button as={NextLink} href="/blog" p="4" fontSize="16px" variant="ghost" _hover={{ bg: 'gray.700' }}>
              Blog
            </Button>
          </Box>
          <Icon
            as={AiOutlineMenu}
            w={7}
            h={7}
            onClick={onOpen}
            cursor="pointer"
            display={{ base: 'block', md: 'none' }}
          />
        </Flex>
      </Slide>
      <NavbarDrawer />
    </Box>
  );
}
