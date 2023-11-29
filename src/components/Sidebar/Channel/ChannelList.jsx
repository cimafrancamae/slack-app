import { List, ListItem, Text } from '@chakra-ui/react';

function Channel({ channels, handleItemClick, selectedItem }) {

  const receiverClass = 'Channel';

  // For selecting an item in the channel list
  const handleClick = (channel) => {
    const messageReceiver = { ...channel, class: receiverClass}
    handleItemClick(messageReceiver);
  }

  return (
      <List spacing={3}>
        {channels.map((channel) => (
          <ListItem 
            key={channel.id} 
            cursor='pointer' 
            _hover={{ bgColor: 'gray.100' }}
            fontSize='sm'
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