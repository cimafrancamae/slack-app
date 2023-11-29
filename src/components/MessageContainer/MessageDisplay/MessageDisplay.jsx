import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Flex, Text, useToast } from '@chakra-ui/react';
import MessageDisplayHeader from './components/MessageDisplayHeader';
import { fetchMessage } from '../../../services/api';
import useFetch from '../../../utils/hooks/useFetch';
import { capitalize } from '../../../utils/helper';
import chatBg from '../../../../public/chat bg.jpg';

const MessageDisplay = ({ messages, toScroll }) => {

  const userId = localStorage.getItem('id');
  const containerRef = useRef(null);

  console.log(toScroll);

  useEffect(() => {
    if(containerRef.current && !toScroll){
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages])
    
  return (
    <>
      <MessageDisplayHeader />
      <Box 
          bgImage={chatBg}
          bgSize='cover'
          p="3" 
          maxH="100%"
          minH="100%"
          overflowY="auto"
          ref={containerRef}
      >
        {messages.map((message, index) => {
          const isCurrentUser = userId === message.sender.id.toString();
          const msgStyles = {
            marginLeft: isCurrentUser ? 'auto' : '0',
            marginRight: isCurrentUser ? '0' : 'auto',
            alignText: isCurrentUser ? 'right' : 'left',
            justifyContent: isCurrentUser ? 'flex-end' : 'flext-start',
            borderRadius: '5px',
            padding: '10px',
            maxWidth: '100%', 
            minWidth: '100%', 
            wordWrap: 'break-word',
          };

          return (
            <Box 
                key={index} 
                p="3" 
            >
              <Flex gap='2' alignItems='flex-start' zIndex={1} style={msgStyles}>
              {!isCurrentUser && (
                  <Avatar 
                    name={message.sender.email.split('@')[0]} 
                    size='sm' 
                    borderRadius='5' 
                  />
                )}
                <div className='message-bubble'>
                  <Text 
                    fontWeight='bold' 
                    fontSize='sm'
                  >
                    {capitalize(message.sender.email.split('@')[0])}
                  </Text>
                  <Text fontSize='sm'>{message.body}</Text>
                </div>
                {isCurrentUser && (
                  <Avatar 
                    name={message.sender.email.split('@')[0]} 
                    size='sm' 
                    borderRadius='5' 
                  />
                )}
              </Flex>
            </Box>
        )})}
      </Box>
    </>
  );
};

export default MessageDisplay;
