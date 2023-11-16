import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

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
    <Box p="3" borderTop="1px solid" borderColor="gray.300">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
      />
      <Button colorScheme="blue" ml="3" onClick={handleSubmit}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
