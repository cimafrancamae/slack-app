import { Box } from '@chakra-ui/react';
import Channel from '../Channel/Channel';
import DirectMessage from '../DirectMessage/DirectMessage';
const Sidebar = () => {

  return (
    <div className="sidebar-container">
      <Box
        w="250px"
        minHeight="calc(100vh - 80px)"
        bg="gray.200"
        p="4"
        borderRight="1px solid"
        borderColor="gray.300"
        boxShadow="md"
        overflowY="auto"
      >
        <Channel />
        <DirectMessage />
      </Box>
    </div>
  );
};

export default Sidebar;
