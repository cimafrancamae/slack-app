import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import './styles/index.css'
import theme from './theme'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Sidebar />
    </ChakraProvider>
  )
}

export default App
