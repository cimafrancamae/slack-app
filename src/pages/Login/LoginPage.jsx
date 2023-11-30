import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  useToast,
  Progress,
  Image,
  Flex,
} from '@chakra-ui/react';
import { loginUser } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../public/slack-with-name-logo.png';
import bgImage from '../../../public/chat-bg.jpg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const showAlert = (message, type) => {
    setAlertMessage({ message, type });
    setTimeout(() => {
        setAlertMessage(null);
    }, 5000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const response = await loginUser(formData);
        if(response){
            console.log('Login Successful:', response);
            localStorage.setItem('id',response.data.id);
            setLoading(false);
            
            toast({
              title: 'Login Successful',
              status: 'success',
              position: 'top',
              duration: 5000,
              isClosable: true,
            });

            navigate("/home");
        } else {
          console.log(response)
            throw new Error('Login failed. Invalid response');
        }
    } catch (error) {
        setFormData({ email: '', password: '' });
        setLoading(false);
        console.error('Login error:', error.message);
        showAlert(`${error.message}`, 'error');
    }

  };

  return (
      <Flex width='100vw' height='100vh' backgroundImage={bgImage} backgroundSize='cover'>
          {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
          <Box 
            m="auto" 
            textAlign="center"
            backgroundColor='white'
            p={10}
            borderRadius={5}
            boxShadow='md'
          >
          <Flex 
            align="center" 
            justify="center" 
            direction="column" 
          >
            <Image 
              src={logo} 
              alt="Slack App Logo" 
              mb="2" 
              maxW="100px"
              width='85px'
              height='auto' 
            />
            <Heading as="h2" size="lg" mb="4">
                Login
            </Heading>
            { alertMessage && (
                <Alert status={alertMessage.type} mb={'4'} maxW="400px">
                    <AlertIcon />
                    {alertMessage.message}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    w="400px"
                />
                </FormControl>
                <FormControl mb="4">
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                />
                </FormControl>
                <Button type="submit" colorScheme="blue" mb="4" w="100%">
                    Login
                </Button>
              </form>
              <Text mb="4">
              {"Don't have an account? "}
                <Link to="/register" ml="1">
                  Create one here
                </Link>
              </Text>
          </Flex>
          </Box>
      </Flex>
  );
};

export default LoginPage;
