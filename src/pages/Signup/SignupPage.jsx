import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  useToast,
  Progress,
  Image,
  Flex
} from '@chakra-ui/react';
import { createUser } from '../../services/api'; 
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/slack-with-name-logo.png';
import bgImage from '../../../public/chat-bg.jpg';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    firstName: '',
    lastName: '',
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
        const response = await createUser(formData);
        if(response){
            console.log('Registration Successful:', response);
            setLoading(false);
            navigate("/");
    
            toast({
                title: 'Registration Successful',
                status: 'success',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
        } else {
            throw new Error('Registration failed. Invalid response');
        }
    } catch (error) {
        setFormData({ 
          email: '', 
          password: '', 
          password_confirmation: '', 
          firstName: '', 
          lastName: '', 
        });
        setLoading(false);
        console.error('Registration error:', error.message);
        showAlert(`${error.message}`, 'error');
    }
  };

  const handleCancel = () => {
    navigate("/"); 
  };

  return (
      <Flex 
        minW='100vw' 
        minH='100vh'
        h='auto' 
        backgroundImage={bgImage} 
        backgroundSize='cover'
        backgroundAttachment='fixed'
        paddingTop='15rem'
        paddingBottom='5rem'
      >
        {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
        <Box 
          w="100%" 
          h="auto"
          m="auto" 
          maxW="500px" 
          textAlign="center"
          backgroundColor='white'
          borderRadius={5}
          boxShadow='lg'
          p={5}
        >
        <Flex 
          align="center" 
          justify="center" 
          direction="column" 
        >
          <Image 
            src={logo} 
            alt="Slack App Logo" 
            mb="4" 
            maxW="100px" 
            width='80px'
          />
          <Heading as="h2" size="lg" mb="4">
              Sign Up
          </Heading>
          { alertMessage && (
              <Alert status={alertMessage.type} mb={'4'}>
                  <AlertIcon />
                  {alertMessage.message}
              </Alert>
          )}
          <form onSubmit={handleSubmit}>
              <FormControl mb="4">
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  w="400px"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
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
              <FormControl mb="4">
                <FormLabel>Password Confirmation</FormLabel>
                <Input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mb="4" w="100%">
                  Sign Up
              </Button>
              <Button variant="outline" colorScheme="blue" mb="4" w="100%" onClick={handleCancel}>
                    Cancel
                </Button>
            </form>
        </Flex>
        </Box>
        </Flex>
  );
};

export default SignupPage;
