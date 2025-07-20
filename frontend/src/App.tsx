import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Divider,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'

interface ApiResponse {
  firstNumber: number;
  secondNumber: number;
  sum: number;
}

interface ApiError {
  error: string;
  details?: string;
}

function App() {
  const [firstNumber, setFirstNumber] = useState<string>('')
  const [secondNumber, setSecondNumber] = useState<string>('')
  const [result, setResult] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [serverStatus, setServerStatus] = useState<'unknown' | 'healthy' | 'error'>('unknown')

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const checkServerHealth = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/health')
      if (response.ok) {
        setServerStatus('healthy')
      } else {
        setServerStatus('error')
      }
    } catch {
      setServerStatus('error')
    }
  }

  const calculateSum = async (): Promise<void> => {
    if (!firstNumber.trim() || !secondNumber.trim()) {
      setError('Please enter both numbers')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch(`http://localhost:3000/sum/${firstNumber}/${secondNumber}`)
      
      if (response.ok) {
        const data: ApiResponse = await response.json()
        setResult(data)
        setServerStatus('healthy')
      } else {
        const errorData: ApiError = await response.json()
        setError(errorData.details || errorData.error || 'An error occurred')
      }
    } catch (err) {
      setError('Failed to connect to server. Is the backend running on localhost:3000?')
      setServerStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const clearForm = (): void => {
    setFirstNumber('')
    setSecondNumber('')
    setResult(null)
    setError('')
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="md">
        <VStack spacing={6}>
          {/* Header */}
          <VStack spacing={2}>
            <Heading as="h1" size="xl" textAlign="center" color="blue.600">
              Addition Calculator
            </Heading>
            <Text color="gray.600" textAlign="center">
              Connect to your Express.js backend
            </Text>
          </VStack>

          {/* Server Status */}
          <HStack>
            <Text fontSize="sm">Server Status:</Text>
            <Badge 
              colorScheme={
                serverStatus === 'healthy' ? 'green' : 
                serverStatus === 'error' ? 'red' : 'gray'
              }
            >
              {serverStatus === 'healthy' ? 'Connected' : 
               serverStatus === 'error' ? 'Disconnected' : 'Unknown'}
            </Badge>
            <Button size="xs" onClick={checkServerHealth}>
              Check
            </Button>
          </HStack>

          {/* Calculator Card */}
          <Card w="full" bg={cardBg} shadow="md">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="medium">
                  Enter two numbers to add:
                </Text>

                <VStack spacing={3} w="full">
                  <Input
                    placeholder="First number"
                    value={firstNumber}
                    onChange={(e) => setFirstNumber(e.target.value)}
                    type="number"
                    size="lg"
                  />
                  
                  <Text fontSize="2xl" color="blue.500">+</Text>
                  
                  <Input
                    placeholder="Second number"
                    value={secondNumber}
                    onChange={(e) => setSecondNumber(e.target.value)}
                    type="number"
                    size="lg"
                  />
                </VStack>

                <HStack spacing={3} w="full">
                  <Button
                    colorScheme="blue"
                    onClick={calculateSum}
                    isLoading={loading}
                    loadingText="Calculating..."
                    flex={1}
                    size="lg"
                  >
                    Calculate Sum
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={clearForm}
                    flex={1}
                    size="lg"
                  >
                    Clear
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Results */}
          {result && (
            <Card w="full" bg="green.50" borderColor="green.200" borderWidth={1}>
              <CardBody>
                <VStack spacing={2}>
                  <Heading size="md" color="green.700">Result</Heading>
                  <Text fontSize="xl" textAlign="center">
                    {result.firstNumber} + {result.secondNumber} = 
                    <Text as="span" fontWeight="bold" color="green.600" ml={2}>
                      {result.sum}
                    </Text>
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Text>{error}</Text>
            </Alert>
          )}

          <Divider />

          {/* Instructions */}
          <Card w="full" bg="blue.50" borderColor="blue.200" borderWidth={1}>
            <CardBody>
              <VStack spacing={2} align="start">
                <Heading size="sm" color="blue.700">Backend Setup Instructions:</Heading>
                <Text fontSize="sm" color="blue.600">
                  1. Navigate to the backend directory
                </Text>
                <Text fontSize="sm" color="blue.600">
                  2. Run: <code>npx tsx src/server.ts</code>
                </Text>
                <Text fontSize="sm" color="blue.600">
                  3. Server should start on http://localhost:3000
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
}

export default App
