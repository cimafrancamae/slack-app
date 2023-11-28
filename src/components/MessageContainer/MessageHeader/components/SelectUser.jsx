import { useState } from 'react';
import { Box, Text, Input, List, ListItem, Avatar, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { flattenArray } from '../../../../utils/helper';

function SelectUser({ users, retrieveMessages }) {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    let filteredUsers = users;

    if(users){
        filteredUsers = users.filter((user) => {
            user.name = user.email.split('@')[0];       
            return user.name.toLowerCase().includes(searchQuery.toLowerCase())
        });
    }

    const handleSearch = (e) => {
        setSelectedUser(null);
        setSearchQuery(e.target.value);
    }

    const handleSelectedUser = (user) => {
        const userName = user.email.split('@')[0]
        setSelectedUser(user.id);
        setSearchQuery(userName);
        retrieveMessages({id: user.id, name: user.name, class: 'User'});
      }

    return (
        <Box 
                bg="gray.200" 
                boxShadow="xs"
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
                        type='search'
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </InputGroup>
                <Box 
                    overflowY="auto" 
                    h="auto"
                    maxH="200px"
                >
                    {(searchQuery !== '' && !selectedUser) && (
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
                                <Avatar name={user.name} size="xs" borderRadius="5" />
                                <Text fontSize="sm">{user.name}</Text>
                            </ListItem>
                            )) : <Text fontSize="xs">No users found</Text>}
                        </List>
                    )}
                </Box>
            </Box>
    );
}

export default SelectUser;