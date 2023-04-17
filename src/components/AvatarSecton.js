import React from 'react';
import { Avatar, AvatarBadge, Box, Flex } from '@chakra-ui/react';
import amelia from '../assets/amelia.png';
import blaine from '../assets/blaine.png';
import quoc from '../assets/quoc.png';

export default function AvatarSecton() {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      p="20px"
      bgColor={'#D9D9D9'}
      minH="170px"
    >
      <Flex w="100%" justify={'space-between'} p="20px">
        <Avatar
          border="3px solid #B74F6F"
          size="lg"
          name="Amelia Gan"
          src={amelia}
        >
          <AvatarBadge boxSize=".7em" bg="green.500" />
        </Avatar>
        <Avatar
          border="3px solid #34E5FF"
          size="lg"
          name="Quoc Dang"
          src={quoc}
        >
          <AvatarBadge boxSize=".7em" bg="green.500" />
        </Avatar>
        <Avatar
          border="3px solid #ADBDFF"
          size="lg"
          name="Blaine Western"
          src={blaine}
        >
          <AvatarBadge boxSize=".7em" bg="green.500" />
        </Avatar>
      </Flex>
      <Box w="100%" h="8px" borderRadius={'10px'} bgColor={'#B74F6F'}></Box>
    </Flex>
  );
}
