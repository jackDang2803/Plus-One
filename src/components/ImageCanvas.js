import React, { useEffect, useRef, useState } from 'react';
import { Center, Image, Flex, Spinner, Box, Button } from '@chakra-ui/react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function ImageCanvas({ imageURL, prompt }) {
  const promptRef = useRef(prompt)
  const canvasRef = useRef();
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [mode, setMode] = useState(1);

  async function getImageFromPrompt(p) {
    setLoading(true);
    const response = await fetch('http://localhost:8000/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Here we could easily pass more values to the body. 
      body: JSON.stringify({ prompt: p }),
    });
    //TODO handle error
    const { data } = await response.json();
    console.log(data);
    setImageData(data[0]);
    setLoading(false);
  }

  useEffect(() => {
    getImageFromPrompt(promptRef.current);
  }, []);

  useEffect(() => {
    prompt && imageData && console.log({ imageData, prompt });
  }, [prompt, imageData]);

  return (
    <Box>
      <Center w="500px" h="500px" position="relative" cursor={'crosshair'}>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Box w="100%" h="100%" position="absolute">
            <Box w="100%" h="100%" position="absolute" zIndex={21}>
              <ReactSketchCanvas
                canvasColor={'transparent'}
                ref={canvasRef}
                strokeWidth={5}
                strokeColor={mode === 1 ? '#FF5733' : '#50C878'}
              />
            </Box>
            <Box w="100%" h="100%" position="absolute" zIndex={14}>
              <Image src={imageData && imageData.url} w="100%" h="100%" />
            </Box>
          </Box>
        )}
      </Center>
      <Flex w="100%" justifyContent={'space-between'}>
        <Button
          isDisabled={loading}
          w="50%"
          size={'sm'}
          onClick={() => setMode(1)}
          bgColor="#FF5733"
          color="white"
          borderRadius={'0 0 0 8px'}
        >
          Infill Areas
        </Button>
        <Button
          isDisabled={loading}
          w="50%"
          size={'sm'}
          onClick={() => setMode(2)}
          bgColor="#50C878"
          color="white"
          borderRadius={'0 0 8px 0'}
        >
          Enhance Areas
        </Button>
      </Flex>
    </Box>
  );
}
