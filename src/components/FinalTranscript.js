import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import ImageCanvas from './ImageCanvas';

export default function FinalTranscript({ text }) {
  return (
    <>
      <Box h="40px" w="400px">
        <Text>{text}</Text>
      </Box>
      {text.length > 21 && <ImageCanvas prompt={text} />}
    </>
  );
}
