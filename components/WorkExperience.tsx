import { Box, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'
import workExperienceData from '../data/workexperience.json'
import SectionHead, { MONO } from './SectionHead'

interface WorkExperienceItem {
  company: string
  title: string
  startDate: string
  endDate?: string
  summary: string
  technologies: string[]
}

const short = (d: string) =>
  d.toLowerCase() === 'present' ? 'now' : d.replace(/^([A-Za-z]{3})[A-Za-z]*/, '$1')

export default function WorkExperience({
  workExperience = workExperienceData as WorkExperienceItem[],
}: {
  workExperience?: WorkExperienceItem[]
}) {
  return (
    <Box as="section" id="experience" w="full" scrollMarginTop="80px" pt={{ base: '56px', md: '96px' }}>
      <SectionHead eyebrow="Experience">Six years, five teams</SectionHead>
      <Box as="ul" listStyleType="none" m={0} p={0} borderTop="1px solid #1c1f25">
        {workExperience.map((job, i) => (
          <Box
            as="li"
            key={job.company}
            display="grid"
            gridTemplateColumns={{ base: '1fr', sm: '180px minmax(0, 1fr)' }}
            gap={{ base: '4px', sm: '20px' }}
            py="20px"
            borderBottom="1px solid #1c1f25"
          >
            <Text
              as="time"
              pt="3px"
              fontFamily={MONO}
              fontSize="13px"
              color={i === 0 ? 'button1' : 'textSecondary'}
            >
              {short(job.startDate)} – {short(job.endDate || 'present')}
            </Text>
            <Box>
              <Heading as="h3" fontSize="17px" color="displayColor">
                {job.company} ·{' '}
                <Box as="span" color="textSecondary" fontWeight="500">
                  {job.title}
                </Box>
              </Heading>
              <Text mt="4px" mb="10px" fontSize="14px" color="textSecondary">
                {job.summary}
              </Text>
              <Wrap spacing="6px">
                {job.technologies.map((t) => (
                  <WrapItem key={t}>
                    <Box fontSize="12px" px="9px" py="3px" borderRadius="999px" bg="#15171C" border="1px solid #1c1f25" color="#C9CBD0">
                      {t}
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
