import { Stack } from '@chakra-ui/react'
import Introduction from './Introduction'
import ProofStrip from './ProofStrip'
import HowIBuild from './HowIBuild'
import FeaturedProjects from './FeaturedProjects'
import WorkExperience from './WorkExperience'
import ContactMe from './ContactMe'
import HomeFooter from './HomeFooter'

export default function ClassicHome() {
  return (
    <Stack as="main" alignItems="flex-start" mt={{ base: 4, md: 8 }} spacing={0} w="full">
      <Introduction />
      <ProofStrip />
      <HowIBuild />
      <FeaturedProjects />
      <WorkExperience />
      <ContactMe />
      <HomeFooter />
    </Stack>
  )
}
