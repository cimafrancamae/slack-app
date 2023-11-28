import React, { useState } from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import SearchUserModal from '../../common/ChannelMembersModal';
import { capitalize } from '../../../utils/helper';

function DirectMessage({ directMessages, retrieveMessages, handleItemClick, selectedItem }) {

    const handleSelectedUser = (user) => {
      handleItemClick(user)
      retrieveMessages(user);
    }

    return (
      <>
        <List spacing={3}>
          {directMessages.map((dm) => (
            <ListItem 
              key={dm.id}
              cursor="pointer"
              _hover={{ bgColor: 'gray.100' }}
              borderRadius={5}
              onClick={() => handleSelectedUser(dm)}
              bg={selectedItem && selectedItem.id === dm.id ? 'gray.100' : 'transparent'}
            >
              <Text paddingX="4">{capitalize(dm.name)}</Text>
            </ListItem>
          ))}
        </List>
      </>
    );
}

export default DirectMessage;