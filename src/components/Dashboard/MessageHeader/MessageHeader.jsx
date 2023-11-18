import { Box, Flex, Text, Input, List, ListItem, Avatar, InputLeftElement, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { flattenArray } from '../../../utils/helper';

function MessageHeader({ users }) {

    let filteredUsers = users;

    const channel = localStorage.getItem('channel') || null;
    const directMessage = localStorage.getItem('direct-message') || null;

    const title = channel ? channel : directMessage ? directMessage : 'New Message';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    if(users){
        const flattenedUsers = flattenArray(users.data);
        filteredUsers = flattenedUsers.filter((user) => {
            user.name = user.email.split('@')[0];       
            return user.name.toLowerCase().includes(searchQuery.toLowerCase())
        });
    }


    const handleSelectedUser = (user) => {
        const userName = user.email.split('@')[0]
        setSelectedUser(user.id);
        setSearchQuery(userName);
      }
    
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
            <Box 
                bg="gray.200" 
                boxShadow="md"
                paddingX="4"
                paddingY="2"
                borderBottom="1px solid"
                borderColor="gray.300"
            >
                <InputGroup size="xs" borderColor="gray.300">
                    <InputLeftAddon 
                        pointerEvents="none" 
                        color="gray.500"
                        children="To: " 
                    />
                    <Input
                        type='text'
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
                <Box 
                    overflowY="auto" 
                    h="auto"
                    maxH="200px"
                >
                    {!selectedUser && (
                        <List>
                            {filteredUsers ? filteredUsers.map((user) => (
                            <ListItem 
                                key={user.id} 
                                cursor="pointer" 
                                onClick={()=>handleSelectedUser(user)}
                                display="flex"
                                alignItems="center"
                                _hover={{ bgColor: 'gray.100' }}
                                gap="10px"
                                paddingY="2"
                            >
                                <Avatar name={user.name} size="xs" />
                                <Text fontSize="sm">{user.name}</Text>
                            </ListItem>
                            )) : <Text fontSize="xs">No users found</Text>}
                        </List>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default MessageHeader;