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
} from '@chakra-ui/react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

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
    
    try {
        const response = await loginUser(formData);
        console.log('Login Successful:', response);
        navigate("/home");
    } catch (error) {
        setFormData({ email: '', password: '' });
        console.error('Login error:', error.message);
        showAlert('Login failed! Please try again.', 'error');
    }

  };

  return (
    <div className="login-container">
        <Box w="100%" maxW="400px" m="auto" mt="10">
        <Heading as="h2" size="lg" mb="4">
            Login
        </Heading>
        { alertMessage && (
            <Alert status={alertMessage.type} mb={'4'}>
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
            <Button type="submit" colorScheme="blue" mb="4">
                Login
            </Button>
        </form>
        </Box>
    </div>
  );
};

export default LoginPage;
