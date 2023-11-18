import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box p="3" borderTop="1px solid" borderColor="gray.300" display="flex">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        flex="1"
        marginRight="2"
        h="4rem"
      />
      <Button
        colorScheme="blue"
        aria-label="Send Message"
        onClick={handleSubmit}
        h="4rem" 
        w="4rem" 
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MdSend size={24} />
      </Button>
    </Box>
  );
};

export default MessageInput;
