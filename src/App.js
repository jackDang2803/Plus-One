import React, { useEffect, useState, useRef } from 'react';
import {
  ChakraProvider,
  Box,
  Center,
  Text,
  theme,
  Flex,
} from '@chakra-ui/react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import HoverButton from './components/HoverButton';
import IdeaInput from './components/IdeaInput';
import AvatarSecton from './components/AvatarSecton';
import ImageCanvas from './components/ImageCanvas';
import ImageAsButton from './components/ImageAsButton';

import sound from './assets/audio.svg';
import recording from './assets/audio-recording.svg';
import idea from './assets/idea.svg';
import past from './assets/past.svg';
import schedule from './assets/schedule.svg';
import session from './assets/session.svg';

export async function getToken() {
  const response = await fetch('http://localhost:8000');
  const { token } = await response.json();
  return token;
}

function App() {
  let socketRef = useRef(null);
  let recorder = null;
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState('home');
  const [stage, setStage] = useState(1);
  const [topic, setTopic] = useState(null);
  const [finalTranscripts, setFinalTranscripts] = useState([]);
  const [partialTranscripts, setPartialTranscripts] = useState([]);

  const startTranscription = async () => {
    if (socketRef.current || recorder) {
      if (socketRef) {
        socketRef.current.send(JSON.stringify({ terminate_session: true }));
        socketRef.current.close();
        socketRef.current = null;
      }
      if (recorder) {
        recorder.pauseRecording();
        recorder = null;
      }
    }
    const token = await getToken();

    // establish wss with AssemblyAI (AAI) at 16000 sample rate
    socketRef.current = await new W3CWebSocket(
      `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`
    );

    // handle incoming messages to display transcription in the render
    socketRef.current.onmessage = message => {
      const res = JSON.parse(message.data);
      res.message_type === 'FinalTranscript' &&
        res.text !== '' &&
        setFinalTranscripts(texts => [res.text, ...texts]);
      res.message_type === 'PartialTranscript' &&
        setPartialTranscripts(res.text);
    };

    socketRef.current.onerror = event => {
      console.log('socket error:', event);
      socketRef.current.close();
    };

    socketRef.current.onclose = event => {
      console.log('socket closed:', event);
      socketRef.current = null;
    };

    socketRef.current.onopen = () => {
      // once socket is open, begin recording
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          recorder = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm;codecs=pcm', // endpoint requires 16bit PCM audio
            recorderType: StereoAudioRecorder,
            timeSlice: 250, // set 250 ms intervals of data that sends to AAI
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, // real-time requires only one channel
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: blob => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64data = reader.result;
                // audio data must be sent as a base64 encoded string
                if (socketRef.current) {
                  socketRef.current.send(
                    JSON.stringify({
                      audio_data: base64data.split('base64,')[1],
                    })
                  );
                }
              };
              reader.readAsDataURL(blob);
            },
          });
          recorder.startRecording();
        })
        .catch(err => console.error(err));
    };
  };

  const stopTranscription = () => {
    if (socketRef.current) {
      console.log('Socket Closed');
      socketRef.current.send(JSON.stringify({ terminate_session: true }));
    }
    if (recorder) {
      recorder.pauseRecording();
      recorder = null;
    }
  };

  const handleChange = event => setTopic(event.target.value);

  useEffect(() => {
    if (isRecording) {
      startTranscription();
    } else {
      stopTranscription();
    }
  }, [isRecording]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount if ws wasn't closed already
      if (socketRef.current && socketRef.current.readyState !== 3) {
        socketRef.close();
      }
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        w="100vw"
        h="100vh"
        top={0}
        left={0}
      >
        {mode === 'session' && (
          <Flex
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            overflow={'hidden'}
          >
            <Text
              position={'fixed'}
              px="20px"
              py="5px"
              borderRadius={'8px'}
              color="white"
              top={5}
              left={5}
              fontWeight={'semi-bold'}
              fontSize="sm"
              bgColor={'#B0B0B0'}
            >
              {topic}
            </Text>
            <Box w="75%" h="100%" overflowY={"scroll"}>
              {finalTranscripts.map(text => {
                if (text.length > 25) {
                  return (
                    <Center w="100%" h="100vh">
                      <ImageCanvas prompt={text} />
                    </Center>
                  );
                } else {
                  return null;
                }
              })}
            </Box>
            <Flex
              flexDirection="column"
              w="25%"
              h="100%"
              bgColor={'#D9D9D9CC'}
              position="relative"
            >
              <AvatarSecton />
              {finalTranscripts.map(text => (
                <Text
                  color="#858383"
                  fontSize={'sm'}
                  py="3px"
                  px="10px"
                  textAlign="left"
                >
                  {text}
                </Text>
              ))}
              {partialTranscripts && (
                <Box h="40px" w="400px">
                  <Text
                    color="gray.400"
                    fontSize={'sm'}
                    textAlign="left"
                    py="3px"
                    px="10px"
                  >
                    {partialTranscripts}
                  </Text>
                </Box>
              )}
              <ImageAsButton
                onClick={() => setIsRecording(val => !val)}
                w="50px"
                src={isRecording ? recording : sound}
                position={'absolute'}
                bottom="10px"
                left="50%"
                transform="translate(-50%, -50%)"
              />
            </Flex>
          </Flex>
        )}
        {mode === 'home' && (
          <Center
            w="100%"
            h="100%"
            bgImage={
              'linear-gradient(to left, #d7e7ff, #e0dffd, #ebd7f5, #f7cfe7, #fec8d4)'
            }
          >
            {stage === 1 && (
              <Flex>
                <HoverButton
                  onClick={() => setStage(2)}
                  src={session}
                  label="Start Session"
                  m="20px"
                />
                <HoverButton src={schedule} label="Schedule" m="20px" />
                <HoverButton src={past} label="Past Sessions" m="20px" />
                <HoverButton src={idea} label="Idea Log" m="20px" />
              </Flex>
            )}
            {stage === 2 && (
              <IdeaInput
                onClick={() => setMode('session')}
                handleChange={handleChange}
              />
            )}
          </Center>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
