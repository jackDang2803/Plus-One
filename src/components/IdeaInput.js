import React from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';

export default function IdeaInput({ onClick, handleChange }) {
  return (
    <Flex w="30vw">
      <Input
        placeholder="What are we discussing today?"
        borderColor="#3185FC"
        bg="white"
        borderRadius="10px 0 0 10px "
        onChange={handleChange}
      />
      <Button
        onClick={onClick}
        bg="#3185FC"
        color="white"
        _hover={{ filter: 'brightness(120%)' }}
        borderRadius="0 10px 10px 0"
      >
        Submit
      </Button>
    </Flex>
  );
}
