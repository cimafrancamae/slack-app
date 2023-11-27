import { useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import SelectUser from './components/SelectUser';
import { capitalize, getChannelMembers, getUserInfo } from '../../../utils/helper';
import SearchUserModal from '../../common/ChannelMembersModal';
import ChannelMembersModal from '../../common/ChannelMembersModal';

function MessageHeader({ users, receiver = {}, channelDetail, retrieveChannelData, retrieveMessages }) {

    const [title, setTitle] = useState('');
    const [channelMembers, setChannelMembers] = useState([]);
    const [isChannel, setIsChannel] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);

    const onMembersClick = () => setIsOpen(true);

    useEffect(() => {
        const members = getChannelMembers(channelDetail, users);
        setChannelMembers(members);
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
                    <Text fontSize="md" fontWeight="bold">
                        { title }
                    </Text>
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
                                    retrieveChannelData={retrieveChannelData}
                                    retrieveMessages={retrieveMessages}
                                />
                            )}
                        </>
                    )}
                </Flex>
            </Box>
            {!receiver && (
                <SelectUser users={users} />
            )}
        </>
    );
}

export default MessageHeader;