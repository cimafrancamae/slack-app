import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
// import Header from './components/Header/Header'
// import Sidebar from './components/Sidebar/Sidebar'
import LoginPage from './pages/Login/LoginPage'
import './styles/index.css'
import theme from './theme'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <LoginPage />
    </ChakraProvider>
  )
}

export default App
