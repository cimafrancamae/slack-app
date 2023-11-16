import React from 'react';
import { List, ListItem, Flex, Icon, Text } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

function DirectMessage(props) {
    const directMessages = [];

    return (
        <List spacing={3} mt={10}>
          <ListItem fontWeight="bold" fontSize="lg">
            <Flex align="center" justify="space-between">
              Direct messages
              <Icon as={MdAdd} ml="2" cursor="pointer" color="blue.500" />
            </Flex>
          </ListItem>
          {directMessages.map((message) => (
            <ListItem key={message.id}>
              <Text>{message.name}</Text>
            </ListItem>
          ))}
        </List>
    );
}

export default DirectMessage;