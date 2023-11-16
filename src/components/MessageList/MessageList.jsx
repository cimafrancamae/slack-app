import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const MessageList = ({ messages }) => {
    const messageList = messages ? messages : [];
  return (
    <Box 
        bg="gray.100" 
        p="3" 
        h="100%"
        overflowY="auto"
    >
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

export default MessageList;
