import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Flex, Text, useToast } from '@chakra-ui/react';
import MessageDisplayHeader from './components/MessageDisplayHeader';
import { fetchMessage } from '../../../services/api';
import useFetch from '../../../utils/hooks/useFetch';
import { capitalize } from '../../../utils/helper';
import chatBg from '../../../../public/chat bg.jpg';

const MessageDisplay = ({ messages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if(containerRef.current){
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages])
    
  return (
    <>
      <MessageDisplayHeader />
      <Box 
          bgImage={`linear-gradient(rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0.5)), url(${chatBg})`}
          bgSize='cover'
          p="3" 
          maxH="100%"
          minH="100%"
          overflowY="auto"
          ref={containerRef}
      >
        {messages.map((message, index) => (
          <Box 
              key={index} 
              p="3" 
              _hover={{ bgColor: 'gray.100' }}
          >
            <Flex gap='2' alignItems='flex-start'>
              <Avatar name={message.sender.email.split('@')[0]} size='sm' borderRadius='5' />
              <div>
                <Text fontWeight='bold' fontSize='sm'>{capitalize(message.sender.email.split('@')[0])}</Text>
                <Text fontSize='sm'>{message.body}</Text>
              </div>
            </Flex>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MessageDisplay;
