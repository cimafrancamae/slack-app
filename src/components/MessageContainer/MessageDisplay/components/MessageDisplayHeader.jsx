import { ChatIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { capitalize } from '../../../../utils/helper';

function MessageDisplayHeader({ receiver }) {

    const messageReceiver = receiver ? receiver.name : '';

    return (
        <Box>
            <Box 
                gap={5}
                paddingBottom={5} 
                textAlign='center'
            >
                {receiver ? (
                    <Flex 
                        textAlign='left' 
                        gap={2} 
                        alignItems='flex-end' 
                        justifyContent='flex-start' 
                        borderBottom='1px solid'
                        borderColor='gray.200' 
                        p={10}
                    >
                        <Avatar name={messageReceiver} borderRadius={5} size='md' />
                        <Text fontSize='sm'>This is the beginning of your conversation with {capitalize(messageReceiver)}.</Text>
                    
                    </Flex>
                ) : (
                    <Flex 
                        flexDirection='column' 
                        justifyContent="center" 
                        alignItems='center'
                        paddingTop={20} 
                        gap={1}
                    >
                        <ChatIcon />
                        <Text fontSize='xs'>It's lonely out here! Start a conversation with someone.</Text>
                    </Flex>
                )}
            </Box>
        </Box>
    );
}

export default MessageDisplayHeader;