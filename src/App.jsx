import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header/Header'
import './App.css'

function App() {

  return (
    <ChakraProvider>
      <Header />
    </ChakraProvider>
  )
}

export default App
