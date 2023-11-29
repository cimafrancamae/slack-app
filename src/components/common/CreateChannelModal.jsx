import { SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, FormLabel, Input, InputGroup, InputLeftElement, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, TagCloseButton, TagLabel, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { capitalize, flattenArray } from '../../utils/helper';
import useFetch from '../../utils/hooks/useFetch';
import { createChannel } from '../../services/api';

function CreateChannelModal({ isOpen, onClose, users, retrieveMessages, retrieveChannels, handleItemClick }) {

    const [channelName, setChanneName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const { data, fetchData } = useFetch();

    const toast = useToast();

    let filteredUsers = users;

    if(users){
        const flattenedUsers = flattenArray(users.data);
        filteredUsers = flattenedUsers.filter((user) => {
            user.name = user.email.split('@')[0];       
            return user.name.toLowerCase().includes(searchQuery.toLowerCase())
        });
    }

    const handleRemoveUser = (user) => {
        setSelectedUsers(selectedUsers.filter((item) => item !== user));
    }

    const handleSelectUser = (user) => {
        if(searchQuery.trim() !== ''){
            setSelectedUsers([...selectedUsers, user])
            setSearchQuery('');
        }
    }

    const handleSubmit = () => {
        const requestBody = {
            name: channelName,
            user_ids: selectedUsers.map(user => user.id)
        };
        const { apiUrl, options } = createChannel(requestBody);
        fetchData(apiUrl, options);
    }

    useEffect(() => {
        if(data && data.errors){
            console.error('Failed to create a channel', data.errors);
            const error = data.errors[0];
            toast({
                title: `Failed to create a channel. ${error}.`,
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            })
        }
        if(data && data.data){
            toast({
                title: 'New channel was created',
                status: 'success',
                position: 'top',
                duration: 5000,
                isClosable: true
            })
            const channelData = {id: data.data.id, name: data.data.name, class: 'Channel'};

            retrieveChannels(channelData);
            retrieveMessages(channelData);
            handleItemClick(channelData);
            onClose();
        }
    }, [data, retrieveMessages, retrieveChannels, handleItemClick, onClose, toast])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="gray.300" w="100%" >
                <ModalHeader>
                    Create a channel
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                        <InputLeftElement>#</InputLeftElement>
                        <Input
                            placeholder='e.g. group-two'
                            value={channelName}
                            onChange={(e) => setChanneName(e.target.value)}
                        />
                    </InputGroup>
                    <Text fontSize="xs" paddingY={2}>Channels are where conversations happen around a topic. Use a name that is easy to find and understand.</Text>
                    <FormLabel>Members</FormLabel>
                    <InputGroup>
                        <InputLeftElement>
                            <SearchIcon color="gray.400"/>
                        </InputLeftElement>
                        <Input 
                            type='search'
                            placeholder='Search users...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            mb={4}
                        />
                    </InputGroup>
                    <Flex flexWrap="wrap">
                        {selectedUsers.map(user => (
                            <Tag
                                key={user.id}
                                borderRadius="5"
                                variant="solid"
                                colorScheme="yellow"
                                mr={2}
                                mb={2}
                            >
                                <TagLabel>{user.name}</TagLabel>
                                <TagCloseButton onClick={() => handleRemoveUser(user)} />
                            </Tag>
                        ))}
                    </Flex>
                    <Box
                        overflow="auto"
                        h="auto"
                        maxH="30vh"
                    >
                        {(searchQuery !== '') && (
                            <List>
                                {filteredUsers ? filteredUsers.map((user) => (
                                    <ListItem
                                        key={user.id}
                                        cursor="pointer"
                                        onClick={() => handleSelectUser(user)}
                                        _hover={{ bgColor: "gray.100" }}
                                        borderRadius={5}
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                        p={2}
                                    >
                                        <Avatar name={user.name} size="xs" borderRadius="5" />
                                        <Text fontSize="sm">{capitalize(user.name)}</Text>
                                    </ListItem>
                                )) : <Text fontSize="xs">No users found</Text>}
                            </List>
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreateChannelModal;