import { Box, Text } from '@chakra-ui/react';
import SelectUser from './SelectUser';

function MessageHeader({ users }) {
    
    const channel = localStorage.getItem('channel') || null;
    const directMessage = localStorage.getItem('direct-message') || null;

    const title = channel ? channel : directMessage ? directMessage : 'New Message';
    
    return (
        <>
            <Box 
                bg="gray.200" 
                boxShadow="md"
                paddingX="4"
                paddingY="2"
                borderBottom="1px solid"
                borderColor="gray.300"
            >
                <Text fontSize="md" fontWeight="bold">
                    {title}
                </Text>
            </Box>
            <SelectUser users={users} />
        </>
    );
}

export default MessageHeader;