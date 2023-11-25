import React, { useEffect, useState } from 'react';
import { Box, Input, Button, useToast } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import useFetch from '../../../utils/hooks/useFetch';
import { sendMessage } from '../../../services/api';

const MessageInput = ({ receiver = {}, onSendMessage }) => {

  const { data, error, load, fetchData } = useFetch()
  const [message, setMessage] = useState('');

  const toast = useToast();
  
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      handleSubmit(e);
    }
  }
  
  const handleSubmit = () => {
    if (message.trim() !== '') {
      const requestBody = {
        receiver_id: receiver.id,
        receiver_class: receiver.class,
        body: message
      }

      try{
        const { apiUrl, options } = sendMessage(requestBody);
        fetchData(apiUrl,options);
      } catch (error){
        console.error('Error sending message', error)
      }
    }
  };

  useEffect(() => {
    if(error){
      // toast({
      //   title: 'Failed to send message',
      //   status: 'error',
      //   position: 'top',
      //   duration: 5000,
      //   isClosable: true
      // });
    } 

    if(data){
      onSendMessage();
      setMessage('');
    }

  }, [data, error, load])

  return (
    <Box p="3" borderTop="1px solid" borderColor="gray.300" display="flex">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
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
