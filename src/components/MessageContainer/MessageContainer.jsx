import { Box } from '@chakra-ui/layout';
import MessageInput from './MessageInput/MessageInput';
import MessageHeader from './MessageHeader/MessageHeader';
import MessageDisplay from './MessageDisplay/MessageDisplay';
import chatBg from '../../../public/chat-bg.jpg';

function MessageContainer({ messages, users, dmUsers, messageReceiver = {}, channelDetail, retrieveMessages, toScroll }) {

    return (
        <>
            <Box 
                bgImage={chatBg}
                bgSize='cover'
                flex="1" 
                display="flex" 
                flexDirection="column"
                boxShadow="md"
                maxH='84vh'
                borderBottomRightRadius='5px'
            >
                <Box>
                    <MessageHeader 
                      users={users} 
                      dmUsers={dmUsers}
                      receiver={messageReceiver} 
                      channelDetail={channelDetail}
                      retrieveMessages={retrieveMessages}
                    />
                </Box>
                <Box flex="1"  overflowY="auto" alignItems="flex-end">
                    <MessageDisplay messages={messages} receiver={messageReceiver} toScroll={toScroll} />
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