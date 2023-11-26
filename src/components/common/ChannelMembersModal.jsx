import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Input, List, ListItem, Text, Avatar, ModalCloseButton, Flex, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { capitalize, flattenArray } from '../../utils/helper';
import { SearchIcon } from '@chakra-ui/icons';
import { MdPersonAdd } from 'react-icons/md';
import AddChannelMemberModal from './AddChannelMemberModal';

const ChannelMembersModal = ({ channel, members, isOpen, onClose, users, onUserSelect, refreshChannel }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [addMember, setAddMember] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const filteredMembers = members.filter((member) => {
    return member.name.toLowerCase().includes(searchQuery.toLowerCase())
  });

  const handleAddMember = () => setAddMember(true);
  const onAddMemberClose = () => setAddMember(false);
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleSelectedUser = (user) => {
    const userName = user.email.split('@')[0]
    setSelectedUser(user.id);
    setSearchQuery(userName);
    onUserSelect(user);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
        h="auto" 
        maxH="80%" 
        bg="gray.300"
        border="1px solid"
        borderColor="gray.300"
      >
        <ModalHeader borderBottom="1px solid" borderColor="gray.400">
         # { channel.name }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" minH="50vh">
          <Text fontSize="sm" fontWeight="bold" paddingBottom={5}>Members</Text>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type='search'
              placeholder="Find members"
              value={searchQuery}
              onChange={handleSearch}
              mb={4}
              borderColor="gray.500"
              _hover={{ borderColor: "gray.500" }}
            />
          </InputGroup>
          <List h='100%' overflowY='auto'>
              <ListItem
                key="add_member"
                cursor="pointer" 
                _hover={{ bgColor: 'gray.100' }}
                p={1}
                paddingY={3}
                borderRadius={5}
                onClick={handleAddMember}
              >
                <Flex gap={2}>
                  <MdPersonAdd size={24} />
                  <Text fontWeight="bold">Add people</Text>
                </Flex>
              </ListItem>
              {addMember && (
                <AddChannelMemberModal 
                  users={users}
                  channel={channel}
                  members={members}
                  isOpen={isOpen}
                  onClose={onAddMemberClose} 
                  refreshChannel={refreshChannel}
                />
              )}
              {filteredMembers.map((member) => (
                <ListItem 
                  key={member.id} 
                  cursor="pointer" 
                  onClick={() => handleSelectedUser(member)}
                  _hover={{ bgColor: 'gray.100' }}
                  p={1}
                  paddingY={2}
                  borderRadius={5}
                >
                  <Flex gap={2}>
                    <Avatar name={member.name} size="xs" borderRadius="5" />
                    <Text fontWeight="bold">{ capitalize(member.name) }</Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChannelMembersModal;