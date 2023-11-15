// import { useState } from 'react'
// import { ChakraProvider } from '@chakra-ui/react'
// import Header from './components/Header/Header'
// import Sidebar from './components/Sidebar/Sidebar'

import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import './styles/index.css'
// import theme from './theme'

function App() {
  return (
    // <ChakraProvider theme={theme}>
    //   <LoginPage />
    // </ChakraProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <PrivateRoute path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

const PrivateRoute = ({ element: Element, ...rest}) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return isAuthenticated ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;