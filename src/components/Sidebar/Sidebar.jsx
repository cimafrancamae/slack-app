import { Box } from '@chakra-ui/react';
import ChannelList from './Channel/ChannelList';
import DirectMessageList from './DirectMessage/DirectMessageList';
const Sidebar = ({ channels }) => {

  return (
    <div className="sidebar-container">
      <Box
        w="250px"
        minHeight="calc(100vh - 100px)"
        bg="gray.200"
        p="4"
        borderRight="1px solid"
        borderColor="gray.300"
        boxShadow="md"
        overflowY="auto"
      >
        <ChannelList />
        <DirectMessageList />
      </Box>
    </div>
  );
};

export default Sidebar;
