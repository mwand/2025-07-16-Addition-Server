// import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";


export default function CountingButton(props: {
  name: string; // display name of the button
  globalCount: number; // global count from parent
  onClick: (arg0: number) => void; // event handler to call when clicked
}) {
  // useState persists when you change the code,
  // resets when you hit the reload button
  const [localCount, setLocalCount] = useState(0);

  function handleClick() {
    setLocalCount(localCount + 1);
  }

  // when local count changes, notify the parent
  useEffect(() => {
    console.log('running effect', props.name, localCount)
    props.onClick(localCount);
  }, [localCount]);

  function handleReset() {
    setLocalCount(0);
  }

  return (
    <VStack>
      <Box>
        local count for {props.name} = {localCount}
      </Box>
      <Box>globalCount = {props.globalCount}</Box>
      <Button onClick={handleClick}>Increment {props.name}!</Button>
      <Button onClick={handleReset}>Reset</Button>
    </VStack>
  );
}

// Button.defaultProps = {
//   textColor: "red",
//   border: "2px",
//   borderColor: "black",
// }

// Box.defaultProps = {
//   border: "2px",
//   borderColor: "green",
//   padding: "1",
// }
