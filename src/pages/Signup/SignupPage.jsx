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
  Flex
} from '@chakra-ui/react';
import { createUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/slack-with-name-logo.png';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // Other fields for registration
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
            navigate("/login");
    
            toast({
                title: 'Registration Successful',
                status: 'success',
                position: 'bottom',
                duration: 5000,
                isClosable: true,
            });
        } else {
            throw new Error('Registration failed. Invalid response');
        }
    } catch (error) {
        setFormData({ email: '', password: '' });
        setLoading(false);
        console.error('Registration error:', error.message);
        showAlert('Registration failed! Please try again.', 'error');
    }
  };

  return (
    <div className="signup-container">
        {loading && <Progress size="xs" isIndeterminate colorScheme='blue' />}
        <Box 
          w="100%" 
          m="auto" 
          maxW="700px" 
          mt="10" 
          textAlign="center"
        >
        <Flex align="center" justify="center" direction="column" gap="10">
          <Image 
            src={logo} 
            alt="Slack App Logo" 
            mb="4" 
            maxW="100px" 
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
              {/* Form fields for registration */}
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
              {/* Password field and other registration fields */}
              {/* ... */}
              <Button type="submit" colorScheme="blue" mb="4" w="100%">
                  Sign Up
              </Button>
            </form>
        </Flex>
        </Box>
    </div>
  );
};

export default SignupPage;