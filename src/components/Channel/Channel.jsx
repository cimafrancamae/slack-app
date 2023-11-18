import React from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

function Channel(props) {

  const channels = [
    { id: 1, name: '# general' },
    { id: 2, name: '# random' },
  ];
    return (
        <List spacing={3}>
          <ListItem fontWeight="bold" fontSize="lg">
            <Flex align="center" justify="space-between">
              Channels
              <Icon as={MdAdd} ml="2" cursor="pointer" color="blue.500" />
            </Flex>
          </ListItem>
          {channels.map((channel) => (
            <ListItem key={channel.id}>
              <Text>{channel.name}</Text>
            </ListItem>
          ))}
        </List>
    );
}

export default Channel;