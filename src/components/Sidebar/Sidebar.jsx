import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon, Text } from '@chakra-ui/react';
import ChannelList from './Channel/ChannelList';
import DirectMessageList from './DirectMessage/DirectMessageList';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import CreateChannelModal from '../common/CreateChannelModal';

const Sidebar = ({ channels, messages, retrieveMessages, messageReceiver, users }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [defaultIndexes, setDefaultIndexes] = useState([0,1]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  }

  const handleCreateChannel = () => {
    console.log('click')
    setIsOpen(true);
  }

  const handleNewMessage = () => {
    setSelectedItem(null);
    retrieveMessages(null);
  }

  const onClose = () => {
    setIsOpen(false);
  }

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
        <Accordion 
          defaultIndex={defaultIndexes} 
          allowToggle
        >
          <AccordionItem>
            <h2>
              <Flex align="center" justify="space-between">
                <AccordionButton>
                  <Text fontWeight="bold">Channels</Text>
                  <AccordionIcon />
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
                retrieveMessages={retrieveMessages} 
                users={users} 
                handleItemClick={handleItemClick}
                selectedItem={selectedItem}
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <Flex align="center" justify="space-between">
                <AccordionButton>
                  <Text fontWeight="bold">Direct Messages</Text>
                  <AccordionIcon />
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
                messages={messages}
                retrieveMessages={retrieveMessages}
                handleItemClick={handleItemClick} 
                selectedItem={selectedItem}
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
            />
          )}
    </div>
  );
};

export default Sidebar;
