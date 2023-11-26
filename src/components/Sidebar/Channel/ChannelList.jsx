import React, { useEffect, useState } from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { fetchMessage, headers, url } from '../../../services/api';
import useFetch from '../../../utils/hooks/useFetch';
import CreateChannelModal from '../../common/CreateChannelModal';

function Channel({ channels, retrieveMessages, users, handleItemClick, selectedItem }) {

  const receiverClass = 'Channel';

  const [apiUrl, setUrl] = useState(null);  
  const [options, setOptions] = useState({});
  const [receiver, setReceiver] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const { data, error, load, fetchData } = useFetch();

  const handleClick = (channel) => {

    handleItemClick(channel);

    const { apiUrl, options } = fetchMessage(channel.id, 'Channel');
    setUrl(apiUrl);
    setOptions(options);

    const messageReceiver = { ...channel, class: receiverClass}
    setReceiver(messageReceiver)
  }

  const handleCreateChannel = () => {
    console.log('click')
    setIsOpen(true);
  }

  const onClose = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    if(apiUrl){
      fetchData(apiUrl, options);
    }
  }, [apiUrl, options]);

  useEffect(() => {
    retrieveMessages(receiver);
  }, [receiver])

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