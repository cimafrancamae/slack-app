import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/layout';
import { fetchAllUsers, fetchUserChannels } from '../../services/api';
import useFetch from '../../utils/hooks/useFetch';
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

    useEffect(() => {
        console.log('channels',channels);
    },[channels])

    useEffect(()=> {
        if(users.error){
            console.error('Error:', users.error.message);
            toast({
                title: 'Failed to load all users',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });
        }
    }, [users]);

    useEffect(() => {
        if (users.data) {
            setLoading(users.load);
            localStorage.setItem('users',JSON.stringify(users.data));
        }
    }, [users]);

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