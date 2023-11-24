import React, { useEffect, useState } from 'react';
import { Avatar, Box, Flex, Text, useToast } from '@chakra-ui/react';
import MessageDisplayHeader from './components/MessageDisplayHeader';
import { fetchMessage } from '../../../services/api';
import useFetch from '../../../utils/hooks/useFetch';
import { capitalize } from '../../../utils/helper';

const MessageDisplay = ({ receiver = {}, onSendMessage }) => {
    
    const [messages, setMessages] = useState([])

    const { data, error, load, fetchData } = useFetch();

    const toast = useToast();

    useEffect(() => {
      if(receiver){
        const { apiUrl, options } = fetchMessage(receiver.id, receiver.class);
        fetchData(apiUrl, options);
      }
    }, [receiver]);

    useEffect(() => {
      if(error){
        console.log('error', error);
        setMessages([]);
        toast({
          title: 'Failed to retrieve messages',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      }

      if(data){
        console.log('data', data.data);
        setMessages(data.data.map(message => message));
      }
    }, [data, error, load, toast])

  return (
    <>
      <MessageDisplayHeader />
      <Box 
          bg="gray.100" 
          p="3" 
          maxH="100%"
          minH="100%"
          overflowY="auto"
      >
        {messages.map((message, index) => (
          <Box 
              key={index} 
              p="3" 
              borderBottom="1px solid" 
              borderColor="gray.300"
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
