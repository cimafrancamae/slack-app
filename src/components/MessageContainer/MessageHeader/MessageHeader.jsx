import { useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import SelectUser from './components/SelectUser';
import { capitalize, getUserInfo } from '../../../utils/helper';
import SearchUserModal from '../../common/ChannelMembersModal';
import ChannelMembersModal from '../../common/ChannelMembersModal';

function MessageHeader({ users, receiver = {}, channelDetail, refreshChannel }) {

    const [title, setTitle] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [channelMembers, setChannelMembers] = useState([]);
    const [isChannel, setIsChannel] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onUserSelect = (user) => {
        setSelectedUser(user)
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const onMembersClick = () => {
        setIsOpen(true);
    }

    const getChannelMembers = (channelDetail) => {
        if(channelDetail && channelDetail.channel_members){
            const members = channelDetail.channel_members.map(member => member.user_id);
            const membersInfo = members.map(member => {
                const userInfo = getUserInfo(member, users);
                return userInfo[0];
            });
            return membersInfo;
        } 
        return [];
    }

    useEffect(() => {
        const members = getChannelMembers(channelDetail);
        setChannelMembers(members);
        setIsChannel(true);
    }, [channelDetail])

    useEffect(() => {
        const sendTo = receiver ? receiver.name : 'New Message';
        setTitle(sendTo);
    }, [receiver])

    useEffect(() => {
        if(selectedUser){
            const receiver = selectedUser;
            const receiver_class = "User";
            // messages.push({ receiver, receiver_class });
            // localStorage.setItem('messages', JSON.stringify(messages));
        }
    },[selectedUser])
 
    return (
        <>
            <Box 
                bg="gray.200" 
                paddingX="4"
                paddingY="2"
                borderBottom="1px solid"
                borderColor="gray.300"
                
            >
                <Flex justifyContent="space-between" alignItems="center" minH="40px">
                    <Text fontSize="md" fontWeight="bold">
                        {(isChannel && title !== 'New Message') ? '# ' + title : capitalize(title)}
                    </Text>
                    {isChannel && (
                        <>
                            <Tooltip hasArrow label='View or Add Members' bg='gray.700' color='white' placement='left'>
                                <AvatarGroup cursor="pointer" onClick={onMembersClick} size='xs' gap={2} max={3}>
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
                                    onUserSelect={onUserSelect}
                                    refreshChannel={refreshChannel}
                                />
                            )}
                        </>
                    )}
                </Flex>
            </Box>
            {(receiver && receiver.class !== 'Channel' || title === 'New Message') && (
                <SelectUser users={users} onUserSelect={onUserSelect} />
            )}
        </>
    );
}

export default MessageHeader;