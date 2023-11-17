import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MessageList from '../../components/MessageList/MessageList';
import MessageInput from '../../components/MessageInput/MessageInput';
import { Flex, Box } from '@chakra-ui/layout';
import { fetchAllUsers } from '../../services/api';
import useFetch from '../../utils/hooks/useFetch';

function HomePage(props) {
    const { apiUrl, options } = fetchAllUsers();
    const { data, error, loading } = useFetch(apiUrl, options);
    
    useEffect(() => {
      console.log('home',{apiUrl, options});
    if (loading) {
      console.log('Loading...');
    }

    if (error) {
      console.error('Error:', error.message);
    }

    if (data) {
      console.log('All Users:', data);
    }
  }, []);

    return (
        <div className='home-container'>
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