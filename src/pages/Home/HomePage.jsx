import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/layout';
import { fetchAllUsers, fetchUserChannels } from '../../services/api';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import Dashboard from '../../components/Dashboard/Dashboard';

function HomePage() {
    const uid = localStorage.getItem('uid').split('@')[0];
    const signedInUser = uid.charAt(0).toUpperCase().concat(uid.slice(1));

    const [loading, setLoading] = useState(false);

    const users = fetchAllUsers();
    const channels = fetchUserChannels();

    const toast = useToast();

    useEffect(()=> {
        let toastTitle = '';

        if(channels.error || users.error){
            if(channels.error) {
                console.error('Error:', channels.error.message);
                toastTitle = 'Failed to load all channels';
            }
    
            if(users.error){
                console.error('Error:', users.error.message);
                toastTitle = 'Failed to load all users';
            }
    
            toast({
                title: toastTitle,
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });
        }

        if (users.data) {
            setLoading(users.load);
            localStorage.setItem('users',JSON.stringify(users.data));
        }

        if (channels.data) {
            setLoading(channels.load);
            localStorage.setItem('channels',JSON.stringify(channels.data));
        }

        console.log(users, channels)
    }, [users, channels]);

    return (
        <div className='home-container'>
            {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
            <Header signedInUser={signedInUser} />
            <Flex>
                <Sidebar channels={channels} />
                <Dashboard />
            </Flex>
        </div>
    );
}

export default HomePage;