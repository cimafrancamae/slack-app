import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import MessageList from './MessageDisplay/MessageDisplay';
import MessageInput from './MessageInput/MessageInput';
import MessageHeader from './MessageHeader/MessageHeader';
import useFetch from '../../utils/hooks/useFetch';
import { sendMessage } from '../../services/api';
import { Toast } from '@chakra-ui/react';


function Dashboard({ signedInUser, messageReceiver }) {
    const users = JSON.parse(localStorage.getItem('users'));
    const messages = JSON.parse(localStorage.getItem('messages'));

    const [message, setMessage] = useState('');
    const [requestBody, setRequestBody] = useState({});

    const { apiUrl, options } = sendMessage(requestBody);
    const { data, error, load } = useFetch(apiUrl, options);

    const onSendMessage = (message) => {
        console.log(message)
        setMessage(message);
    }

    useEffect(() => {
        if(messages){
            const body = {
                "receiver_id": messages.receiver.id,
                "receiver_class": messages.receiver_class,
                "body": message,
            }

            setRequestBody(body);
        }
    },[requestBody]);

    useEffect(() => {
        if(error){
            console.error('Error', error.message);
            Toast({
                title: 'Failed to send message',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });
        }
    }, [error])

    return (
        <>
            <Box 
                flex="1" 
                display="flex" 
                flexDirection="column"
                bg="gray.50"
                boxShadow="md"
            >
                <Box>
                    <MessageHeader users={users} receiver={messageReceiver} />
                </Box>
                <Box flex="1">
                    <MessageList />
                </Box>
                <Box mt="3">
                    <MessageInput 
                        receiver={messageReceiver} 
                        onSendMessage={onSendMessage} 
                    />
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;