// demonstrates passing props down, passing events up

import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
} from '@chakra-ui/react';

// create two CountingButtons, and keep track of the total count.
import CountingButton from './NewCountingButton';

export default function App() {

  const [globalCount, setGlobalCount] = useState(0)

  const [localCountA, setLocalCountA] = useState(0)
  const [localCountB, setLocalCountB] = useState(0)

  // when either local count changes, recalulate the sum
  useEffect(() => {recalculateGlobalCount()},
    [localCountA,localCountB]);


  async function recalculateGlobalCount() {
    console.log("recalculating")
    const response = await fetch(`/sum/${localCountA}/${localCountB}`)
    const sum = await response.json()
    console.log('sum', sum)
    setGlobalCount(sum.sum)
    return
  }

  function incrementLocalCountA() {
    setLocalCountA(localCountA + 1)
   // newrecalculateGlobalCount()
  }

  function incrementLocalCountB() {
    setLocalCountB(localCountB + 1)
  //  newrecalculateGlobalCount()
  }
  

  useEffect(() => {
    const health = fetch("/health")
      .then((response) => {
        return response.json();
      })
      .then((res) => console.log(res));
  }, []);
      
  return (
    <VStack spacing='30px'>
      <Box border="1px" padding='1' >
        Total count (from backend) = {globalCount}
      </Box>
      <CountingButton name="Button A" localCount={localCountA} globalCount= {globalCount} onClick={incrementLocalCountA} />
      <CountingButton name="Button B" localCount={localCountB} globalCount= {globalCount} onClick={incrementLocalCountB} />
    </VStack>
  )
}

 
