import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/layout';
import { fetchAllUsers, fetchChannel, fetchMessage, fetchUserChannels } from '../../services/api';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { capitalize, getChannelMembers, getDMUsers, getLastTenUsers } from '../../utils/helper';
import useFetch from '../../utils/hooks/useFetch';
import { fetchDataForLastTenUsers } from '../../services/api';
import MessageContainer from '../../components/MessageContainer/MessageContainer';

function HomePage() {
    const uid = localStorage.getItem('uid').split('@')[0];
    const signedInUser = capitalize(uid);

    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageReceiver, setMessageReceiver] = useState(null);
    const [channel, setChannel] = useState(null);
    const [messages, setMessages] = useState([]);

    const { apiUrl: userUrl, options: userOptions } = fetchAllUsers();
    const { apiUrl: userChannelUrl, options: userChannelOptions } = fetchUserChannels();

    const { data: userData, error: userError, load: userLoading, fetchData: fetchUsers } = useFetch();
    const { data: userChannelData, error: userChannelError, load: userChannelLoading, fetchData: fetchChannels } = useFetch();
    const { data: channelData, error: channelError, load: channelLoading, fetchData: fetchChannelDetail } = useFetch();
    const { data: messagesData, error: messagesError, load: messagesLoading, fetchData: fetchMessages } = useFetch();

    const toast = useToast();

    let channelList = [
      { id: 1, name: 'general' },
      { id: 2, name: 'random' },
    ];

    // Define channels to display on sidebar
    if (userChannelData && Array.isArray(userChannelData.data)) {
      channelList = channelList.concat(userChannelData.data.map(channel => ({ id: channel.id, name: channel.name })));
    }
    
    // Check for channel updates such as new members
    const retrieveChannelData = (id) => {
      const { apiUrl, options } = fetchChannel(id);
      fetchChannelDetail(apiUrl, options);
    }

    // Retrieve messages from specific users or channels
    const retrieveMessages = (receiver) => {
      setMessages([]);
      setMessageReceiver(receiver);
      if(receiver){
        if(receiver.class === 'Channel'){
          retrieveChannelData(receiver.id)
        }
        const { apiUrl, options } = fetchMessage(receiver.id, receiver.class);
        fetchMessages(apiUrl, options);
      } 
    }

    // For initial load of all users and channels
    useEffect(() => {
      fetchUsers(userUrl, userOptions);
      fetchChannels(userChannelUrl, userChannelOptions);
    }, [userUrl, userChannelUrl]);

    // For fetch all users response
    useEffect(() => {
      if (userError) {
        console.error('User Error:', userError);
        toast({
          title: 'Failed to load users',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        });
      }
      if (userData) {
        setLoading(userLoading);
        localStorage.setItem('users', JSON.stringify(userData));
      }
    }, [userData, userError, userLoading, toast]);

    // For fetch all channels response
    useEffect(() => {
      if (userChannelError) {
        console.error('Channel Error:', userChannelError);
        toast({
          title: 'Failed to load channels',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        });
      }
      if (userChannelData) {
        getDMUsers(userChannelData);
        setLoading(userChannelLoading);
        localStorage.setItem('channels', JSON.stringify(userChannelData));
      }
    }, [userChannelData, userChannelError, userChannelLoading, toast]);

    // For fetch specific channel details response
    useEffect(() => {
      if(channelError){
        console.error('Error fetching channel detail', channelError)
      }
      if(channelData){
        const data = channelData.data
        setChannel(data);
        setLoading(channelLoading)
      }
      if(channelLoading){
        setLoading(channelLoading);
      }
    }, [channelData, channelError, channelLoading]);

    // For fetch messages response
    useEffect(() => {
      if(messagesError){
        console.log('error', messagesError);
        setMessages([]);
        toast({
          title: 'Failed to retrieve messages',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
      }
      if(messagesData){
        setMessages(messagesData.data.map(message => message));
        setLoading(messagesLoading);
      } else {
        setMessages([]);
      }
      if(messagesLoading){
        setLoading(messagesLoading);
      }
    }, [messagesData, messagesError, messagesLoading, toast]);

    return (
        <div className='home-container'>
          <div className="progress-container">
            {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
          </div>
            <Header signedInUser={signedInUser} />
            <Flex  maxH='50%'>
                <Sidebar 
                  channels={channelList} 
                  messages={messages}
                  retrieveMessages={retrieveMessages} 
                  users={userData}
                />
                <MessageContainer 
                  messageReceiver={messageReceiver} 
                  messages={messages}
                  users={userData}
                  channelDetail={channel}
                  retrieveChannelData={retrieveChannelData}
                  retrieveMessages={retrieveMessages}
                />
            </Flex>
        </div>
    );
}

export default HomePage;