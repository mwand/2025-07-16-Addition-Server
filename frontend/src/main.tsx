import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'

// 

// import App from './from-spring/Components/TwoCountingButtons.tsx'
import App from './from-spring/Apps/ToDoApp/ToDoApp.tsx'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      Hello!
      <h1>Hello Again!</h1>
      <App />
    </ChakraProvider>
  </StrictMode>)