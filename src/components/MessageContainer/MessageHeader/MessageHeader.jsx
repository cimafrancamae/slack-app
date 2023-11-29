import { useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import SelectUser from '../../common/SelectUser';
import { capitalize, getChannelMembers, getUserInfo } from '../../../utils/helper';
import SearchUserModal from '../../common/ChannelMembersModal';
import ChannelMembersModal from '../../common/ChannelMembersModal';

function MessageHeader({ users, dmUsers, receiver = {}, channelDetail, retrieveMessages }) {

    const [title, setTitle] = useState('');
    const [channelMembers, setChannelMembers] = useState([]);
    const [isChannel, setIsChannel] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);

    const onMembersClick = () => setIsOpen(true);

    const retrieveChannelMembers = (newMembers) => {
        setChannelMembers((prevState) => [
            ...prevState,
            ...newMembers
        ])
    };

    useEffect(() => {
        const members = getChannelMembers(channelDetail, users);
        if(members){
            setChannelMembers(members);
        }
        setIsChannel(true);
    }, [channelDetail])

    useEffect(() => {
        setIsChannel(false);
        const sendTo = 
            receiver ? 
                receiver.class === 'Channel' ? 
                    '# ' + receiver.name : 
                        capitalize(receiver.name) : 
                            'New Message';
        setTitle(sendTo);
    }, [receiver])
 
    return (
        <>
            <Box 
                bg="gray.200" 
                paddingX="4"
                paddingY="2"
                borderBottom="1px solid"
                borderColor="gray.300"
            >
                <Flex 
                    justifyContent="space-between" 
                    alignItems="center" 
                    minH="40px"
                >
                    <Box>
                        <Flex gap={2} alignItems='center'>
                            {(receiver && receiver.class === 'User') && (
                                <Avatar name={receiver.name} borderRadius={5} size='xs' />
                            )}
                            <Text fontSize="md" fontWeight="bold">
                                { title }
                            </Text>
                        </Flex>
                    </Box>
                    {isChannel && (
                        <>
                            <Tooltip 
                                hasArrow 
                                label='View or Add Members' 
                                bg='gray.700' 
                                color='white' 
                                placement='left'
                            >
                                <AvatarGroup 
                                    cursor="pointer" 
                                    onClick={onMembersClick} 
                                    size='xs' 
                                    gap={2} 
                                    max={3}
                                >
                                    {channelMembers.map((member, index) => (
                                        <Avatar key={index} name={member.name} borderRadius="7" />
                                    ))}
                                </AvatarGroup>
                            </Tooltip>
                            {isOpen && (
                                <ChannelMembersModal 
                                    channel={channelDetail}
                                    members={channelMembers}
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    users={users}
                                    retrieveMessages={retrieveMessages}
                                    retrieveChannelMembers={retrieveChannelMembers}
                                />
                            )}
                        </>
                    )}
                </Flex>
            </Box>
            {!receiver && (
                <SelectUser users={dmUsers} retrieveMessages={retrieveMessages} />
            )}
        </>
    );
}

export default MessageHeader;