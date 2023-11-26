import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import MessageList from './MessageDisplay/MessageDisplay';
import MessageInput from './MessageInput/MessageInput';
import MessageHeader from './MessageHeader/MessageHeader';
import useFetch from '../../utils/hooks/useFetch';
import { fetchMessage, sendMessage } from '../../services/api';
import { Toast, useToast } from '@chakra-ui/react';
import MessageDisplay from './MessageDisplay/MessageDisplay';


function MessageContainer({ messages, users, messageReceiver = {}, channelDetail, refreshChannel, handleSendMessage, retrieveMessages }) {

    useEffect(() => {
      retrieveMessages(messageReceiver);
      handleSendMessage();
    }, [messageReceiver]);

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
                    <MessageHeader 
                      users={users} 
                      receiver={messageReceiver} 
                      channelDetail={channelDetail}
                      refreshChannel={refreshChannel}
                    />
                </Box>
                <Box flex="1"  overflowY="auto" alignItems="flex-end">
                    <MessageDisplay messages={messages} />
                </Box>
                    <MessageInput 
                        receiver={messageReceiver} 
                        onSendMessage={handleSendMessage} 
                    />
            </Box>
        </>
    );
}

export default MessageContainer;