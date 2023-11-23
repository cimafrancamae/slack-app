import React, { useState } from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import SearchUserModal from '../../common/SearchUserModal';

function DirectMessage({ receivers }) {
    const directMessages = [];
    const users = JSON.parse(localStorage.getItem('users'));

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const newDirectMsg = () => {
      setIsOpen(true);
    }

    const handleSelectedUser = (user) => {
      setSelectedUser(user);
      setIsOpen(false);
    }

    return (
      <>
        <List spacing={3} mt={10}>
          <ListItem fontWeight="bold" fontSize="lg">
            <Flex align="center" justify="space-between">
              Direct messages
              <Icon 
                as={MdAdd} 
                ml="2" 
                cursor="pointer" 
                color="blue.500" 
                onClick={newDirectMsg}
              />
            </Flex>
          </ListItem>
          {directMessages.map((message) => (
            <ListItem key={message.id}>
              <Text>{message.name}</Text>
            </ListItem>
          ))}
        </List>
      </>
    );
}

export default DirectMessage;