import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import MessageList from './MessageList/MessageList';
import MessageInput from './MessageInput/MessageInput';
import MessageHeader from './MessageHeader/MessageHeader';
import useFetch from '../../utils/hooks/useFetch';
import { sendMessage } from '../../services/api';


function Dashboard({ signedInUser }) {
    const users = JSON.parse(localStorage.getItem('users'));
    const [messageBody, setMessageBody] = useState(null);

    const { apiUrl, options } = sendMessage(messageBody);
    const { data, error, load } = useFetch(apiUrl, options);

    const onSendMessage = (message) => {
        console.log(message)
        setMessageBody(message);
    }

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
                    <MessageHeader users={users} signedInUser={signedInUser} />
                </Box>
                <Box flex="1">
                    <MessageList />
                </Box>
                <Box mt="3">
                    <MessageInput onSendMessage={onSendMessage} />
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;