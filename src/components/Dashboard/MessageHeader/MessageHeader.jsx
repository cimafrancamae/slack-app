import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import SelectUser from './components/SelectUser';

function MessageHeader({ users }) {
    
    // const channel = localStorage.getItem('channel') || null;
    const messages = localStorage.getItem('messages') || [];

    const title = messages ? messages : 'New Message';

    const [selectedUser, setSelectedUser] = useState(null);

    const onSelectUser = (user) => {
        setSelectedUser(user)
    }

    useEffect(() => {
        console.log(selectedUser)
        if(selectedUser){
            const receiver = selectedUser;
            const receiver_class = "User";
            messages.push({ receiver, receiver_class });
            localStorage.setItem('messages', JSON.stringify(messages));
        }
    },[selectedUser])
 
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
            <SelectUser users={users} onSelectUser={onSelectUser} />
        </>
    );
}

export default MessageHeader;