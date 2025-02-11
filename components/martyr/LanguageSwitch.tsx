'use client';

import { Button, Flex } from "@chakra-ui/react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      position="fixed"
      top={4}
      right={4}
      size="md"
      colorScheme="blue"
      onClick={toggleLanguage}
      zIndex={1000}
    >
      {language === 'en' ? 'বাংলা' : 'English'}
    </Button>
  );
}