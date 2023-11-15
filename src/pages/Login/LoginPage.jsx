import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic using formData (e.g., API request)
    console.log('Login form submitted:', formData);
    // Reset form fields
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="login-container">
        <Box w="100%" maxW="400px" m="auto" mt="10">
        <Heading as="h2" size="lg" mb="4">
            Login
        </Heading>
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
            {/* Display error message if login fails */}
            {/* Replace this with actual error handling logic */}
            <Text color="red.500">Error: Invalid credentials</Text>
        </form>
        </Box>
    </div>
  );
};

export default LoginPage;
