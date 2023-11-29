import React, { useState } from 'react';
import { List, ListItem, Flex, Icon, Text, Progress, Avatar } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import SearchUserModal from '../../common/ChannelMembersModal';
import { capitalize, moveSelectedItemToTop } from '../../../utils/helper';

function DirectMessage({ directMessages, handleItemClick, selectedItem, dmLoading }) {

  // const arrangedDMs = moveSelectedItemToTop(directMessages, selectedItem);

    const handleSelectedUser = (user) => {
      handleItemClick(user)
    }

    return (
      <>
      {dmLoading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
        <List spacing={3}>
          {directMessages.map((dm) => (
            <ListItem 
              key={dm.id}
              cursor="pointer"
              _hover={{ bgColor: 'gray.100' }}
              fontSize="sm"
              borderRadius={5}
              onClick={() => handleSelectedUser(dm)}
              bg={selectedItem && selectedItem.id === dm.id ? 'gray.100' : 'transparent'}
            >
              <Flex paddingX="4" gap={2}>
                <Avatar name={dm.name} borderRadius={5} size='xs' />
                <Text >{capitalize(dm.name)}</Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      </>
    );
}

export default DirectMessage;