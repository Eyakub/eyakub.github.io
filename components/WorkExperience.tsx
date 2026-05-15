import React, { useState } from 'react';
import workExperienceData from '../data/workexperience.json';
import {
  Stack,
  Heading,
  Text,
  Box,
  HStack,
  Image,
  Button,
  List,
  ListItem,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible';

interface WorkExperienceItem {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
  logoUrl?: string;
}

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseMonth(value: string): Date | null {
  if (!value || value.toLowerCase() === 'present') return null;
  const parts = value.trim().split(/\s+/);
  if (parts.length < 2) return null;
  const key = parts[0].slice(0, 3).toLowerCase();
  const month = MONTHS[key];
  const year = parseInt(parts[1], 10);
  if (month === undefined || Number.isNaN(year)) return null;
  return new Date(year, month, 1);
}

function tenure(start: string, end?: string): string {
  const s = parseMonth(start);
  const e = end && end.toLowerCase() !== 'present' ? parseMonth(end) : new Date();
  if (!s || !e) return '';
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1;
  if (months <= 0) return '';
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (yrs && mos) return `${yrs} yr ${mos} mo`;
  if (yrs) return `${yrs} yr${yrs > 1 ? 's' : ''}`;
  return `${mos} mo`;
}

const TECH_COLORS: Record<string, string> = {
  python: 'orange', fastapi: 'green', django: 'green', flask: 'green',
  'gemini ai': 'purple',
  react: 'blue', 'next.js': 'gray', vue: 'green', 'vue.js': 'green',
  'node.js': 'green', javascript: 'yellow', typescript: 'blue',
  html: 'orange', css: 'blue', 'tailwind css': 'cyan',
  aws: 'orange', docker: 'blue', kubernetes: 'blue', git: 'red',
  webpack: 'cyan', wordpress: 'blue', php: 'purple',
};

const colorForTech = (t: string) => TECH_COLORS[t.toLowerCase()] || 'gray';

const RESPONSIBILITIES_PREVIEW = 3;

const WorkExperience: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded((s) => ({ ...s, [i]: !s[i] }));

  return (
    <Stack spacing={10} w="full" py={16}>
      <Stack spacing={3} textAlign="center">
        <Text
          color="button1"
          fontSize="sm"
          fontWeight="600"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          Career
        </Text>
        <Heading
          color="displayColor"
          fontFamily="Ubuntu"
          fontSize={{ base: '3xl', md: '4xl' }}
        >
          Work Experience
        </Heading>
        <Text color="textSecondary" fontSize={{ base: 'sm', md: 'md' }}>
          5+ years building backend systems and full-stack applications.
        </Text>
      </Stack>

      <Box
        position="relative"
        pl={{ base: 8, md: 12 }}
        ml={{ base: 0, md: 4 }}
        _before={{
          content: '""',
          position: 'absolute',
          left: { base: '14px', md: '18px' },
          top: '4px',
          bottom: '4px',
          width: '2px',
          bg: 'linear-gradient(to bottom, #3CCF91, #1e2029 92%)',
          opacity: 0.7,
        }}
      >
        <Stack spacing={{ base: 8, md: 10 }}>
          {workExperienceData.map((exp: WorkExperienceItem, index: number) => {
            const isCurrent = !exp.endDate || exp.endDate.toLowerCase() === 'present';
            const dur = tenure(exp.startDate, exp.endDate);
            const isExpanded = !!expanded[index];
            const visible = isExpanded
              ? exp.responsibilities
              : exp.responsibilities.slice(0, RESPONSIBILITIES_PREVIEW);
            const overflow = exp.responsibilities.length - RESPONSIBILITIES_PREVIEW;

            return (
              <SlideUpWhenVisible threshold={0.1} key={index}>
                <Box position="relative">
                  {/* Timeline node */}
                  <Box
                    position="absolute"
                    left={{ base: '-26px', md: '-34px' }}
                    top="14px"
                    w={{ base: '14px', md: '18px' }}
                    h={{ base: '14px', md: '18px' }}
                    bg={isCurrent ? 'button1' : '#1f2227'}
                    border="2px solid"
                    borderColor={isCurrent ? 'button1' : '#3a3f4a'}
                    borderRadius="full"
                    boxShadow={isCurrent ? '0 0 0 6px rgba(60,207,145,0.18)' : 'none'}
                    zIndex={1}
                    aria-hidden="true"
                  />

                  <Box
                    bg="#0e0f12"
                    border="1px solid"
                    borderColor={isCurrent ? 'rgba(60,207,145,0.35)' : '#1c1f25'}
                    rounded="lg"
                    p={{ base: 5, md: 6 }}
                    color="gray.200"
                    transition="border-color 0.2s ease, transform 0.2s ease"
                    _hover={{
                      borderColor: isCurrent ? 'button1' : '#2a2e36',
                    }}
                  >
                    {/* Header row */}
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={{ base: 'flex-start', sm: 'center' }}
                      justify="space-between"
                      spacing={4}
                      mb={3}
                    >
                      <HStack spacing={4} align="center">
                        {exp.logoUrl && (
                          <Image
                            src={exp.logoUrl}
                            alt={`${exp.company} logo`}
                            boxSize={{ base: '40px', md: '48px' }}
                            borderRadius="md"
                            objectFit="contain"
                            bg="rgba(255,255,255,0.04)"
                            p="6px"
                          />
                        )}
                        <Stack spacing={0.5}>
                          <Text
                            color="displayColor"
                            fontFamily="Ubuntu"
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="700"
                            lineHeight="1.2"
                          >
                            {exp.company}
                          </Text>
                          <Text
                            color="textSecondary"
                            fontSize={{ base: 'sm', md: 'md' }}
                            fontWeight="500"
                          >
                            {exp.title}
                          </Text>
                        </Stack>
                      </HStack>

                      {isCurrent && (
                        <HStack
                          spacing={1.5}
                          bg="rgba(60,207,145,0.12)"
                          color="button1"
                          px={2.5}
                          py={1}
                          rounded="full"
                          fontSize="xs"
                          fontWeight="600"
                          flexShrink={0}
                        >
                          <Box
                            w="6px"
                            h="6px"
                            bg="button1"
                            rounded="full"
                            boxShadow="0 0 8px #3CCF91"
                          />
                          <Text>Currently</Text>
                        </HStack>
                      )}
                    </Stack>

                    {/* Meta row */}
                    <HStack
                      spacing={2}
                      mb={4}
                      color="textSecondary"
                      fontSize="xs"
                      flexWrap="wrap"
                    >
                      <Text fontWeight="500">
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </Text>
                      {dur && (
                        <>
                          <Text opacity={0.5}>·</Text>
                          <Text bg="#1c1f25" px={2} py={0.5} rounded="full" color="gray.300">
                            {dur}
                          </Text>
                        </>
                      )}
                      <Text opacity={0.5}>·</Text>
                      <Text>{exp.location}</Text>
                    </HStack>

                    {/* Responsibilities */}
                    <List spacing={2} mb={4} pl={4} styleType="disc">
                      {visible.map((r, i) => (
                        <ListItem
                          key={i}
                          fontSize={{ base: 'sm', md: 'sm' }}
                          color="gray.300"
                          lineHeight="1.65"
                          sx={{ '::marker': { color: '#3CCF91' } }}
                        >
                          {r}
                        </ListItem>
                      ))}
                    </List>

                    {overflow > 0 && (
                      <Button
                        size="xs"
                        variant="ghost"
                        color="button1"
                        onClick={() => toggle(index)}
                        mb={4}
                        _hover={{ bg: 'rgba(60,207,145,0.08)' }}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? 'Show less' : `Show ${overflow} more`}
                      </Button>
                    )}

                    {/* Tech tags */}
                    {exp.technologies?.length > 0 && (
                      <Wrap spacing={2} pt={3} borderTop="1px solid #1c1f25">
                        {exp.technologies.map((tech) => (
                          <WrapItem key={tech}>
                            <Tag
                              size="sm"
                              variant="subtle"
                              colorScheme={colorForTech(tech)}
                              fontSize="xs"
                              fontWeight="500"
                              opacity={0.92}
                            >
                              {tech}
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                    )}
                  </Box>
                </Box>
              </SlideUpWhenVisible>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
};

export default WorkExperience;
