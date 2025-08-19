// demonstrates passing props down, passing events up

import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
} from '@chakra-ui/react';

// create two CountingButtons, and keep track of the total count.
import CountingButton from './CountingButton';

export default function App() {
  const [globalCount, setGlobalCount] = useState(0);

  const [sumLocalCounts, setSumLocalCounts] = useState(0);
  const [localCountA, setLocalCountA] = useState(0);
  const [localCountB, setLocalCountB] = useState(0);

  // when either local count changes, recalulate the sum
  useEffect(() => {
    recalculateGlobalCount();
  }, [localCountA, localCountB]);

  async function recalculateGlobalCount() {
    console.log("recalculating");
    const response = await fetch(`/sum/${localCountA}/${localCountB}`);
    const sum = await response.json();
    console.log("sum", sum);
    setGlobalCount(sum.sum);
    setSumLocalCounts(localCountA + localCountB);
    return;
  }

  function updateLocalCountA(newCount: number) {
    setLocalCountA(newCount);
    // newrecalculateGlobalCount()
  }

  function updateLocalCountB(newCount: number) {
    setLocalCountB(newCount);
  }

  // on first render, display health in console log
  useEffect(() => {
    fetch("/health")
      .then((response) => {
        return response.json();
      })
      .then((res) => console.log(res));
  }, []);

  return (
    <VStack spacing="30px">
      <Box border="1px" padding="1">
        Total count (from backend) = {globalCount}
      </Box>
      <Box border="1px" padding="1">
        Total count (from frontend) = {sumLocalCounts}
      </Box>
      <CountingButton
        name="Button A"
        globalCount={globalCount}
        onClick={updateLocalCountA}
      />
      <CountingButton
        name="Button B"
        globalCount={globalCount}
        onClick={updateLocalCountB}
      />
    </VStack>
  );
}

 
