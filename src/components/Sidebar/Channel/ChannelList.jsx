import React, { useEffect, useState } from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { fetchMessage, headers, url } from '../../../services/api';
import useFetch from '../../../utils/hooks/useFetch';

function Channel({ channels, retrieveMessages }) {

  const receiverClass = 'Channel';

  const [apiUrl, setUrl] = useState(null);  
  const [options, setOptions] = useState({});
  const [receiver, setReceiver] = useState(null);
  
  const { data, error, load, fetchData } = useFetch();

  const handleClick = (channel) => {
    const { apiUrl, options } = fetchMessage(channel.id, 'Channel');
    setUrl(apiUrl);
    setOptions(options);

    const messageReceiver = { ...channel, class: receiverClass}
    setReceiver(messageReceiver)
  }

  useEffect(() => {
    if(apiUrl){
      fetchData(apiUrl, options);
    }
  }, [apiUrl, options]);

  useEffect(() => {
    retrieveMessages(data, error, load, receiver);
  }, [data, error, load, receiver])

  return (
      <List spacing={3}>
        <ListItem fontWeight="bold" fontSize="lg">
          <Flex align="center" justify="space-between">
            Channels
            <Icon as={MdAdd} ml="2" cursor="pointer" color="blue.500" />
          </Flex>
        </ListItem>
        {channels.map((channel) => (
          <ListItem 
            key={channel.id} 
            cursor='pointer' 
            _hover={{ bgColor: 'gray.100' }}
            onClick={() => handleClick(channel)}
          >
            <Text paddingX='4'># {channel.name}</Text>
          </ListItem>
        ))}
      </List>
  );
}

export default Channel;