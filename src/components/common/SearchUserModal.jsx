import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Input, List, ListItem, Text } from '@chakra-ui/react';
import { flattenArray } from '../../utils/helper';

const SearchUserModal = ({ isOpen, onClose, users, onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const flattenedUsers = flattenArray(users.data);
  const filteredUsers = flattenedUsers.filter((user) => {
    user.name = user.email.split('@')[0];
    
    return user.name.toLowerCase().includes(searchQuery.toLowerCase())
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent h="auto" maxH="80%">
        <ModalHeader>
          Search Users
          <Input
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb={4}
          />
        </ModalHeader>
        <ModalBody overflowY="auto">
          <List>
            {filteredUsers.map((user) => (
              <ListItem key={user.id} cursor="pointer" onClick={() => onUserSelect(user)}>
                <Text>{user.name}</Text>
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchUserModal;