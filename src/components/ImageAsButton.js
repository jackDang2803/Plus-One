import React from 'react';
import { Image, Box } from '@chakra-ui/react';

export default function ImageAsButton({ src, w, ...props }) {
  return (
    <Box as="button" {...props}>
      <Image w={w} src={src} />
    </Box>
  );
}
