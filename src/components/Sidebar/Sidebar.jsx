import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon, Text } from '@chakra-ui/react';
import ChannelList from './Channel/ChannelList';
import DirectMessageList from './DirectMessage/DirectMessageList';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import CreateChannelModal from '../common/CreateChannelModal';

const Sidebar = ({ channels, directMessages, retrieveMessages, retrieveChannels, users, dmLoading, switchConvo, selectedItem, refreshChannels }) => {

  // const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const defaultIndexes = [0,1];

  // Returns the selected item in sidebar
  const handleItemClick = (item) => {
    retrieveMessages(item)
    switchConvo(item);
  };

  // For create channel modal
  const handleCreateChannel = () => {
    handleNewMessage();
    setIsOpen(true);
  };

  // For new direct message or channel
  const handleNewMessage = () => {
    retrieveMessages(null);
  }

  // For closing create channel modal
  const onClose = () => setIsOpen(false);

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
        borderBottomLeftRadius='5px'
      >
        <Accordion 
          defaultIndex={defaultIndexes} 
          allowMultiple
        >
          <AccordionItem>
            <h2>
              <Flex align="center" justify="space-between">
                <AccordionButton onClick={refreshChannels}>
                  <AccordionIcon />
                  <Text fontWeight="bold">Channels</Text>
                </AccordionButton>
                <Icon 
                  as={MdAdd} 
                  ml="2" 
                  cursor="pointer" 
                  color="blue.500" 
                  onClick={handleCreateChannel}
                  />
              </Flex>
            </h2>
            <AccordionPanel pb={4}>
              <ChannelList 
                channels={channels} 
                handleItemClick={handleItemClick}
                selectedItem={selectedItem}
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <Flex align="center" justify="space-between">
                <AccordionButton>
                  <AccordionIcon />
                  <Text fontWeight="bold">Direct Messages</Text>
                </AccordionButton>
                <Icon 
                  as={MdAdd} 
                  ml="2" 
                  cursor="pointer" 
                  color="blue.500" 
                  onClick={handleNewMessage}
                  />
              </Flex>
            </h2>
            <AccordionPanel pb={4}>
              <DirectMessageList 
                directMessages={directMessages}
                handleItemClick={handleItemClick} 
                selectedItem={selectedItem}
                dmLoading={dmLoading}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      {isOpen && (
            <CreateChannelModal 
              isOpen={isOpen} 
              onClose={onClose} 
              users={users}
              retrieveMessages={retrieveMessages}
              retrieveChannels={retrieveChannels}
              handleItemClick={handleItemClick}
            />
          )}
    </div>
  );
};

export default Sidebar;
