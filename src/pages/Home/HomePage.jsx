import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/layout';
import { fetchAllUsers, fetchChannel, fetchMessage, fetchUserChannels } from '../../services/api';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { capitalize, getLastTenUsers } from '../../utils/helper';
import useFetch from '../../utils/hooks/useFetch';
import { fetchDataForLastTenUsers } from '../../services/api';
import MessageContainer from '../../components/MessageContainer/MessageContainer';

function HomePage() {
    const uid = localStorage.getItem('uid').split('@')[0];
    const signedInUser = capitalize(uid);

    const [loading, setLoading] = useState(false);
    const [messageReceiver, setMessageReceiver] = useState(null);
    const [channel, setChannel] = useState(null);

    const { apiUrl: userUrl, options: userOptions } = fetchAllUsers();
    const { apiUrl: userChannelUrl, options: userChannelOptions } = fetchUserChannels();

    const { data: userData, error: userError, load: userLoading, fetchData: fetchUsers } = useFetch();
    const { data: userChannelData, error: userChannelError, load: userChannelLoading, fetchData: fetchChannels } = useFetch();
    const { data: channelData, error: channelError, load: channelLoading, fetchData: fetchChannelDetail } = useFetch();


    let channelList = [
      { id: 1, name: 'general' },
      { id: 2, name: 'random' },
    ];

    if (userChannelData && Array.isArray(userChannelData.data)) {
      channelList = channelList.concat(userChannelData.data.map(channel => ({ id: channel.id, name: channel.name })));
    }
    
    const toast = useToast();

    const refreshChannel = (id) => {
      const { apiUrl, options } = fetchChannel(id);
      fetchChannelDetail(apiUrl, options);
    }

    const retrieveMessages = (receiver) => {
      if(receiver){
        if(receiver.class === 'Channel'){
          refreshChannel(receiver.id)
        }
        setMessageReceiver(receiver);
      }
    }

    useEffect(() => {
      if(channelError){
        console.error('Error fetching channel detail', channelError)
      }

      if(channelData){
        setChannel(channelData.data);
        setLoading(channelLoading)
      }

      if(channelLoading){
        setLoading(channelLoading);
      }
    }, [channelData, channelError, channelLoading])

    useEffect(() => {
      fetchUsers(userUrl, userOptions);
      fetchChannels(userChannelUrl, userChannelOptions);
    }, [userUrl, userChannelUrl])

    // useEffect(() => {
    //     const lastTenUsersData = fetchDataForLastTenUsers(userData);
    //     console.log(lastTenUsersData);
    // }, [userData]);

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
    }, [userData, userError, userLoading, toast])

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
        setLoading(userChannelLoading);
        localStorage.setItem('channels', JSON.stringify(userChannelData));
      }
    }, [userChannelData, userChannelError, userChannelLoading, toast])

    return (
        <div className='home-container'>
          <div className="progress-container">
            {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
          </div>
            <Header signedInUser={signedInUser} />
            <Flex  maxH='50%'>
                <Sidebar 
                  channels={channelList} 
                  retrieveMessages={retrieveMessages} 
                  messageReceiver={messageReceiver} 
                />
                <MessageContainer 
                  messageReceiver={messageReceiver} 
                  users={userData}
                  channelDetail={channel}
                  refreshChannel={refreshChannel}
                />
            </Flex>
        </div>
    );
}

export default HomePage;