import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import MessageList from './MessageDisplay/MessageDisplay';
import MessageInput from './MessageInput/MessageInput';
import MessageHeader from './MessageHeader/MessageHeader';
import useFetch from '../../utils/hooks/useFetch';
import { fetchMessage, sendMessage } from '../../services/api';
import { Toast, useToast } from '@chakra-ui/react';
import MessageDisplay from './MessageDisplay/MessageDisplay';


function MessageContainer({ messages, users, dmUsers, messageReceiver = {}, channelDetail, retrieveMessages, toScroll }) {

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
                      dmUsers={dmUsers}
                      receiver={messageReceiver} 
                      channelDetail={channelDetail}
                    //   channelMembers={channelMembers}
                      retrieveMessages={retrieveMessages}
                    />
                </Box>
                <Box flex="1"  overflowY="auto" alignItems="flex-end">
                    <MessageDisplay messages={messages} toScroll={toScroll} />
                </Box>
                    <MessageInput 
                        receiver={messageReceiver} 
                        retrieveMessages={retrieveMessages} 
                    />
            </Box>
        </>
    );
}

export default MessageContainer;