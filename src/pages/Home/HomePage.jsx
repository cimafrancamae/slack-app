import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MessageList from '../../components/Dashboard/MessageList/MessageList';
import MessageInput from '../../components/Dashboard/MessageInput/MessageInput';
import { Flex, Box } from '@chakra-ui/layout';
import { fetchAllUsers } from '../../services/api';
import useFetch from '../../utils/hooks/useFetch';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import SearchUserModal from '../../components/common/SearchUserModal';
import Dashboard from '../../components/Dashboard/Dashboard';

function HomePage() {
    const { apiUrl, options } = fetchAllUsers();
    const { data, error, load } = useFetch(apiUrl, options);
    const [isOpen, setIsOpen] = useState(false);

    const toast = useToast();

    useEffect(()=> {
        if(error){
            console.error('Error:', error.message);
            toast({
                title: 'Failed to load all users',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            localStorage.setItem('users',JSON.stringify(data));
        }
    }, [data]);

    return (
        <div className='home-container'>
            {load && <Progress size="xs" isIndeterminate colorScheme='blue' />}
            <Header />
            <Flex>
                <Sidebar />
                <Dashboard />
            </Flex>
        </div>
    );
}

export default HomePage;