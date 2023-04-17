import React from 'react';
import { Image, Center, Tooltip } from '@chakra-ui/react';

export default function HoverButton({ onClick, src, label, m }) {
  return (
    <Tooltip
      label={label}
      fontSize="md"
      hasArrow
      bg="#3185FC"
      color="white"
      closeDelay={100}
    >
      <Center
        borderRadius="8px"
        w="100px"
        h="100px"
        m={m}
        cursor="pointer"
        bgColor={'rgba(183, 171, 171, 0.28)'}
        onClick={onClick}
        _hover={{ backgroundColor: '#3185FC' }}
      >
        <Image src={src} w="50px" />
      </Center>
    </Tooltip>
  );
}
