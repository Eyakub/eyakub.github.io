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
import { RESUME_URL } from './SectionHead'

const LINKS = [
  ['Work', '/#work'],
  ['How I build', '/#build'],
  ['Learn', '/learn'],
  ['Experience', '/#experience'],
]

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
              {LINKS.map(([label, href]) => (
                <Button key={href} as={NextLink} href={href} onClick={onClose} fontSize="16px" variant="ghost">
                  {label}
                </Button>
              ))}
              <Button as="a" href={RESUME_URL} target="_blank" rel="noopener noreferrer" fontSize="16px" variant="outline">
                Résumé
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
            {LINKS.map(([label, href]) => (
              <Button key={href} as={NextLink} href={href} p="4" fontSize="16px" variant="ghost" _hover={{ bg: 'gray.700' }}>
                {label}
              </Button>
            ))}
            <Button
              as="a"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              ml={2}
              p="4"
              fontSize="16px"
              variant="outline"
              borderColor="#2a2e36"
              _hover={{ bg: 'gray.700' }}
            >
              Résumé
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
