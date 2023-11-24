import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/layout';
import { fetchAllUsers, fetchMessage, fetchUserChannels, headers, url } from '../../services/api';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import Dashboard from '../../components/MessageContainer/MessageContainer';
import { capitalize, getLastTenUsers } from '../../utils/helper';
import useFetch from '../../utils/hooks/useFetch';
import { fetchDataForLastTenUsers } from '../../services/api';
import MessageContainer from '../../components/MessageContainer/MessageContainer';

function HomePage() {
    const uid = localStorage.getItem('uid').split('@')[0];
    const signedInUser = capitalize(uid);

    const [loading, setLoading] = useState(false);
    const [messageReceiver, setMessageReceiver] = useState(null);

    const { apiUrl: userUrl, options: userOptions } = fetchAllUsers();
    const { apiUrl: channelUrl, options: channelOptions } = fetchUserChannels();

    const { data: userData, error: userError, load: userLoading, fetchData: fetchUsers } = useFetch();
    const { data: channelData, error: channelError, load: channelLoading, fetchData: fetchChannels } = useFetch();


    let channelList = [
      { id: 1, name: 'general' },
      { id: 2, name: 'random' },
    ];

    if (channelData && Array.isArray(channelData.data)) {
      channelList = channelList.concat(channelData.data.map(channel => ({ id: channel.id, name: channel.name })));
    }
    
    const toast = useToast();

    function retrieveMessages (messageData, messageError, messageLoading, receiver) {
      console.log('data', messageData);
      console.log('error', messageError);
      console.log('load', messageLoading);
      console.log('receiver', receiver);
      setMessageReceiver(receiver);
    }

    useEffect(() => {
      fetchUsers(userUrl, userOptions);
      fetchChannels(channelUrl, channelOptions);
    }, [userUrl, channelUrl])

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
      if (channelError) {
        console.error('Channel Error:', channelError);
        toast({
          title: 'Failed to load channels',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true
        });
      }
      if (channelData) {
        setLoading(channelLoading);
        localStorage.setItem('channels', JSON.stringify(channelData));
      }
    }, [channelData, channelError, channelLoading, toast])

    return (
        <div className='home-container'>
            {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
            <Header signedInUser={signedInUser} />
            <Flex  maxH='50%'>
                <Sidebar 
                  channels={channelList} 
                  retrieveMessages={retrieveMessages} 
                  messageReceiver={messageReceiver} 
                />
                <MessageContainer messageReceiver={messageReceiver} />
            </Flex>
        </div>
    );
}

export default HomePage;