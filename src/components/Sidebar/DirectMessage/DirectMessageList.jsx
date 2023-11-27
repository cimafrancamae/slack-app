import React, { useState } from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import SearchUserModal from '../../common/ChannelMembersModal';

function DirectMessage({ messages, retrieveMessages, handleItemClick, selectedItem }) {

  console.log(messages);

    const handleSelectedUser = (message) => {
      retrieveMessages(message);
    }

    return (
      <>
        <List spacing={3} mt={10}>
          {messages.map((message) => (
            <ListItem 
              key={message.id}
              onClick={() => handleSelectedUser(message)}
              bg={selectedItem && selectedItem.id === message.id ? 'gray.100' : 'transparent'}
            >
              <Text>{message.name}</Text>
            </ListItem>
          ))}
        </List>
      </>
    );
}

export default DirectMessage;