import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/layout';
import { fetchAllUsers, fetchUserChannels, headers, url } from '../../services/api';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import Dashboard from '../../components/Dashboard/Dashboard';
import { getLastTenUsers } from '../../utils/helper';
import useFetch from '../../utils/hooks/useFetch';

function HomePage() {
    const uid = localStorage.getItem('uid').split('@')[0];
    const signedInUser = uid.charAt(0).toUpperCase().concat(uid.slice(1));

    
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);

    const { apiUrl: userUrl, options: userOptions } = fetchAllUsers();
    const { apiUrl: channelUrl, options: channelOptions } = fetchUserChannels();

    const { data: userData, error: userError, load: userLoading } = useFetch(userUrl, userOptions);
    const { data: channelData, error: channelError, load: channelLoading } = useFetch(channelUrl, channelOptions);

    const [messageData, setMessageData] = useState(null);

    let channelList = [
        { id: 1, name: 'general' },
        { id: 2, name: 'random' },
      ];
    
    const toast = useToast();

    if (channelData && Array.isArray(channelData.data)) {
        channelList = channelList.concat(channelData.data.map(channel => ({ id: channel.id, name: channel.name })));
    }

    useEffect(() => {
        const fetchDataForLastTenUsers = async () => {
            
            const userIds = getLastTenUsers(users);

            if(userIds){
                const options = {
                    method: 'GET',
                    headers: headers
                };
    
               const requests = await userIds.map(id =>
                    fetch(`${url}/messages?receiver_id=${id}&receiver_class=User`, options)
                       .then((response) => {
                           if(!response.ok){
                               throw new Error('Network response was not ok');
                           }
                           return response.json();
                       })
                       .catch((error) => {
                           console.error('Error fetching messages', id, error);
                           return { error };
                       })
                );

                try {
                    const messagesData = await Promise.all(requests);
                    console.log('messages', messagesData)
                    setMessageData(messagesData);
                } catch (error) {
                    console.log('Error fetching messages', error);
                }
            }
        }

        fetchDataForLastTenUsers();

    }, [users]);

    useEffect(() => {
        if (userError || channelError) {
          console.error('Error:', userError || channelError);
          toast({
            title: 'Failed to load data',
            status: 'error',
            position: 'top',
            duration: 5000,
            isClosable: true
          });
        }
    
        if (userData) {
          setLoading(userLoading);
          setUsers(userData);
          localStorage.setItem('users', JSON.stringify(userData));
        }
    
        if (channelData) {
          setLoading(channelLoading);
          localStorage.setItem('channels', JSON.stringify(channelData));
        }
    }, [userData, userError, channelData, channelError]);

    return (
        <div className='home-container'>
            {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
            <Header signedInUser={signedInUser} />
            <Flex>
                <Sidebar channels={channelList} />
                <Dashboard />
            </Flex>
        </div>
    );
}

export default HomePage;