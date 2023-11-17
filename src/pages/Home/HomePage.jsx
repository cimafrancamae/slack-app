import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MessageList from '../../components/MessageList/MessageList';
import MessageInput from '../../components/MessageInput/MessageInput';
import { Flex, Box } from '@chakra-ui/layout';
import { fetchAllUsers } from '../../services/api';
import useFetch from '../../utils/hooks/useFetch';
import { useToast } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';

function HomePage(props) {
    // console.log('home')
    const { apiUrl, options } = fetchAllUsers();
    const { data, error, load } = useFetch(apiUrl, options);

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    
    useEffect(() => {
      console.log('home',{apiUrl, options});
    if (load) {
      console.log('Loading...');
      setLoading(load)
    }

    if (error) {
      console.error('Error:', error.message);
      toast({
        title: 'Failed to load all users',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true
      });
    }

    if (data) {
      console.log('All Users:', data);
      localStorage.setItem('users',JSON.stringify(data))
      setLoading(false)
    }
  }, []);

    return (
        <div className='home-container'>
            {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
            <Header />
            <Flex>
                <Sidebar />
                <Box 
                    flex="1" 
                    p="4" 
                    display="flex" 
                    flexDirection="column"
                    bg="gray.50"
                    boxShadow="md"
                >
                    <Box flex="1">
                        <MessageList />
                    </Box>
                    <Box mt="3">
                        <MessageInput />
                    </Box>
                </Box>
            </Flex>
        </div>
    );
}

export default HomePage;