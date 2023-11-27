import { useEffect, useState } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Avatar,
  Text,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { capitalize, flattenArray } from '../../utils/helper';
import useFetch from '../../utils/hooks/useFetch';
import { addChannelMember } from '../../services/api';

const AddChannelMemberModal = ({ users, channel, members, isOpen, onClose, retrieveChannelData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const { data, error, load, fetchData } = useFetch();

    const toast = useToast();

    let filteredUsers = users;

    if(users){
        const flattenedUsers = flattenArray(users.data);
        filteredUsers = flattenedUsers.filter((user) => {
            user.name = user.email.split('@')[0];       
            return user.name.toLowerCase().includes(searchQuery.toLowerCase())
        });
    }

    const handleAddMember = (user) => {
        if (searchQuery.trim() !== '') {
            if(user){
                setSelectedUsers([...selectedUsers, user]);
            }
            setSearchQuery('');
        }
    };

    const handleRemoveUser = (user) => {
        setSelectedUsers(selectedUsers.filter((item) => item !== user));
    };

    const handleSubmit = () => {
        selectedUsers.forEach(user => {
            const requestBody = {
                id: channel.id,
                member_id: user.id
            };

            const { apiUrl, options } = addChannelMember(requestBody);
            fetchData(apiUrl, options);
        });
        console.log(channel.id)
        retrieveChannelData(channel.id);
    }

    useEffect(() => {
        if(error){
            console.error('Error adding members', error);
            toast({
                title: 'Failed to add members',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });
        }
        if(data){
            toast({
                title: 'Members added to channel',
                status: 'success',
                position: 'top',
                duration: 5000,
                isClosable: true
            });
            setSelectedUsers([]);
        }
    }, [data, error, load])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='gray.400'>
            <ModalHeader>
                Add members
                <Text fontSize='sm'># { channel.name }</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <InputGroup>
                    <InputLeftElement>
                        <SearchIcon color="gray.500" />
                    </InputLeftElement>
                    <Input
                        type='search'
                        placeholder="Search users"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        mb={4}
                    />
                </InputGroup>
                <Flex flexWrap="wrap">
                    {selectedUsers.map((user) => (
                        <Tag 
                            key={user.id} 
                            borderRadius="5" 
                            variant="solid" 
                            colorScheme="yellow" 
                            mr={2} 
                            mb={2}
                        >
                            <TagLabel>{ user.name }</TagLabel>
                            <TagCloseButton onClick={() => handleRemoveUser(user)} />
                        </Tag>
                    ))}
                </Flex>
                <Box 
                        overflowY="auto" 
                        h="auto"
                        maxH="200px"
                    >
                        {(searchQuery !== '') && (
                            <List>
                                {filteredUsers ? filteredUsers.map((user) => (
                                    <ListItem 
                                        key={user.id} 
                                        cursor={members.includes(user) ? 'default' : 'pointer'}
                                        onClick={!members.includes(user) ? () => handleAddMember(user) : null}
                                        display="flex"
                                        alignItems="center"
                                        _hover={!members.includes(user) ? { bgColor: 'gray.100' } : null}
                                        opacity={members.includes(user) ? 0.5 : 1}
                                        gap="10px"
                                        padding="2"
                                        borderRadius={5}
                                    >
                                        <Avatar name={user.name} size="xs" borderRadius="5" />
                                        <Text fontSize="sm">{capitalize(user.name)}</Text>
                                        {members.includes(user) && (
                                            <Text fontSize='sm' color='gray.500'>Already in this channel</Text>
                                        )}
                                    </ListItem>
                                )) : <Text fontSize="xs">No users found</Text>}
                            </List>
                        )}
                    </Box>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                    Add
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    );
};

export default AddChannelMemberModal;
