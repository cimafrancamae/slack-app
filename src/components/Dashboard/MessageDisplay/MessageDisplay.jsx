import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import MessageDisplayHeader from './components/MessageDisplayHeader';

const MessageDisplay = ({ messages }) => {
    const messageList = messages ? messages : [];
  return (
    <Box 
        bg="gray.100" 
        p="3" 
        h="100%"
        overflowY="auto"
    >
      <MessageDisplayHeader />
      {messageList.map((message, index) => (
        <Box 
            key={index} 
            p="3" 
            borderBottom="1px solid" 
            borderColor="gray.300">
          <Text>{message}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default MessageDisplay;
