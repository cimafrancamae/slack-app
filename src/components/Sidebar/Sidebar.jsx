// Sidebar.jsx
import { Box, List, ListItem, Text } from '@chakra-ui/react';

const Sidebar = () => {
  // Mock data for channels
  const channels = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Random' },
    // Add more channels as needed
  ];

  return (
    <Box
      w="250px"
      bg="gray.200"
      p="4"
      borderRight="1px solid"
      borderColor="gray.300"
      boxShadow="md"
    >
      <List spacing={3}>
        <ListItem fontWeight="bold" fontSize="lg">
          Channels
        </ListItem>
        {channels.map((channel) => (
          <ListItem key={channel.id}>
            <Text>{channel.name}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
