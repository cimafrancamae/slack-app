import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import theme from './theme'
import SignupPage from './pages/Signup/SignupPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChakraProvider theme={theme}>
        <LoginPage />
      </ChakraProvider>
    )
  },
  {
    path: "/register",
    element: (
      <ChakraProvider theme={theme}>
        <SignupPage />
      </ChakraProvider>
    )
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <ChakraProvider theme={theme}>
          <HomePage />
        </ChakraProvider>
      </ProtectedRoute>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
