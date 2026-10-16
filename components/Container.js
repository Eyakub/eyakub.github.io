import { Box, Flex, Stack, Text, chakra } from '@chakra-ui/react'
import Navbar from './Navbar'

const Container = ({ enableTransition, children }) => {
    return (
      <Box
        w="100%"
        maxW="calc(70rem + 44px)"
        mx="auto"
        px="22px"
        py={4}
        transition="0.4s"
      >
        <Navbar enableTransition={enableTransition} />
        <Flex as="main" justify="center" direction="column">
          {children}
        </Flex>
        {/* <Stack alignItems="center" mt={10} mb={5}>
          <Text fontSize="sm" textAlign="center">
            Designed and Developed by .
            <br />
            Built with{' '}
            <chakra.span color="button1" fontWeight="semibold">
              Next.js
            </chakra.span>{' '}
            &{' '}
            <chakra.span color="button1" fontWeight="semibold">
              Chakra UI
            </chakra.span>
            . Hosted on{' '}
            <chakra.span color="button1" fontWeight="semibold">
              Vercel
            </chakra.span>
            .
          </Text>
        </Stack> */}
      </Box>
    )
}

export default Container
