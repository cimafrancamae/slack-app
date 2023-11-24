import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import MessageList from './MessageDisplay/MessageDisplay';
import MessageInput from './MessageInput/MessageInput';
import MessageHeader from './MessageHeader/MessageHeader';
import useFetch from '../../utils/hooks/useFetch';
import { fetchMessage, sendMessage } from '../../services/api';
import { Toast, useToast } from '@chakra-ui/react';
import MessageDisplay from './MessageDisplay/MessageDisplay';


function MessageContainer({ users, messageReceiver = {} }) {

    const [messages, setMessages] = useState([])

    const { data, error, load, fetchData } = useFetch();

    const toast = useToast();

    useEffect(() => {
      handleSendMessage();
    }, [messageReceiver]);

    useEffect(() => {
      if(error){
        console.log('error', error);
        setMessages([]);
        // toast({
        //   title: 'Failed to retrieve messages',
        //   status: 'error',
        //   position: 'top',
        //   duration: 5000,
        //   isClosable: true
        // })
      }

      if(data){
        console.log('data', data.data);
        setMessages(data.data.map(message => message));
      }
    }, [data, error, load, toast])

    const handleSendMessage = () => {
        if(messageReceiver){
          const { apiUrl, options } = fetchMessage(messageReceiver.id, messageReceiver.class);
          fetchData(apiUrl, options);
        }
    }

    return (
        <>
            <Box 
                flex="1" 
                display="flex" 
                flexDirection="column"
                bg="gray.50"
                boxShadow="md"
                maxH='84vh'
            >
                <Box>
                    <MessageHeader users={users} receiver={messageReceiver} />
                </Box>
                <Box flex="1"  overflowY="auto" alignItems="flex-end">
                    <MessageDisplay messages={messages} />
                </Box>
                <Box mt="3">
                    <MessageInput 
                        receiver={messageReceiver} 
                        onSendMessage={handleSendMessage} 
                    />
                </Box>
            </Box>
        </>
    );
}

export default MessageContainer;