import React from 'react';
import { Box } from '@chakra-ui/layout';
import MessageList from './MessageList/MessageList';
import MessageInput from './MessageInput/MessageInput';
import MessageHeader from './MessageHeader/MessageHeader';

function Dashboard() {
    const users = JSON.parse(localStorage.getItem('users'));

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
                    <MessageHeader users={users} />
                </Box>
                <Box flex="1">
                    <MessageList />
                </Box>
                <Box mt="3">
                    <MessageInput />
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;