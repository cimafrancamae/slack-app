import React, { useEffect, useState } from 'react';
import { Box, Input, Button, useToast, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import useFetch from '../../../utils/hooks/useFetch';
import { sendMessage } from '../../../services/api';

const MessageInput = ({ receiver = {}, retrieveMessages }) => {

  const { data, error, load, fetchData } = useFetch()
  const [message, setMessage] = useState('');

  const toast = useToast();
  
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleSubmit = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      if (message.trim() !== '') {
        const requestBody = {
          receiver_id: receiver.id,
          receiver_class: receiver.class,
          body: message
        }
        const { apiUrl, options } = sendMessage(requestBody);
        fetchData(apiUrl,options);
      }
    }
  };

  useEffect(() => {
    if(error){
      toast({
        title: 'Failed to send message',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true
      });
    } 
    if(data){
      retrieveMessages(receiver);
      setMessage('');
    }

  }, [data, error, load])

  return (
    <Box display="flex">
      <InputGroup >
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          flex="1"
          h="4rem"
          borderColor="gray.300"
        />
        <InputRightElement color='gray.500' padding={1} h="4rem">
          <MdSend size={50}  />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default MessageInput;
