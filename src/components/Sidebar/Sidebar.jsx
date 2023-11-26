import { Box } from '@chakra-ui/react';
import ChannelList from './Channel/ChannelList';
import DirectMessageList from './DirectMessage/DirectMessageList';

const Sidebar = ({ channels, retrieveMessages, messageReceiver, users }) => {

  return (
    <div className="sidebar-container">
      <Box
        w="250px"
        minHeight="84vh"
        maxHeight="100%"
        bg="gray.200"
        p="4"
        borderRight="1px solid"
        borderColor="gray.300"
        boxShadow="md"
        overflowY="auto"
      >
        <ChannelList channels={channels} retrieveMessages={retrieveMessages} users={users} />
        <DirectMessageList receivers={messageReceiver} />
      </Box>
    </div>
  );
};

export default Sidebar;
