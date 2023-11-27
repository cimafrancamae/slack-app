import React, { useEffect, useState } from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { fetchMessage, headers, url } from '../../../services/api';
import useFetch from '../../../utils/hooks/useFetch';
import CreateChannelModal from '../../common/CreateChannelModal';

function Channel({ channels, retrieveMessages, handleItemClick, selectedItem }) {

  const receiverClass = 'Channel';

  // For selecting an item in the channel list
  const handleClick = (channel) => {

    handleItemClick(channel);

    const messageReceiver = { ...channel, class: receiverClass}
    retrieveMessages(messageReceiver);
  }

  return (
      <List spacing={3}>
        {channels.map((channel) => (
          <ListItem 
            key={channel.id} 
            cursor='pointer' 
            _hover={{ bgColor: 'gray.100' }}
            borderRadius={5}
            onClick={() => handleClick(channel)}
            bg={selectedItem && selectedItem.id === channel.id ? 'gray.100' : 'transparent'}
          >
            <Text paddingX='4'># {channel.name}</Text>
          </ListItem>
        ))}
      </List>
  );
}

export default Channel;