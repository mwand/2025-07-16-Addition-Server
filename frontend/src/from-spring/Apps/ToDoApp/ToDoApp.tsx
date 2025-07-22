// illustrates forms, lists, etc.
// THE WHOLE POINT OF THIS IS THE ATTRIBUTE 'key' ON LINE

// import * as React from 'react';
import { useState } from 'react';
import {
  Heading, 
  VStack, 
} from '@chakra-ui/react';

import { type ToDoItem } from './types'
import { ToDoItemEntryForm } from './ToDoItemEntryForm';
// import { ToDoItemEntryForm } from './ToDoItemEntryForm'
import { ToDoListDisplay } from './ToDoListDisplay'


export default function ToDoApp () {
  const [todoList,setTodolist] = useState<ToDoItem[]>([])
  const [itemKey,setItemKey] = useState<number>(0)   // first unused key

  function handleAdd (title:string, priority:string) {
    if (title === '') {return}   // ignore blank button presses
    setTodolist(todoList.concat({title: title, priority: priority, key: itemKey}))
    setItemKey(itemKey + 1)
  }

  function handleDelete(targetKey:number) {
    const newList = todoList.filter(item => item.key != targetKey)
    setTodolist(newList)
  }

  return (
    <VStack>
      <Heading>TODO List</Heading>
      <ToDoItemEntryForm onAdd={handleAdd}/>
      <ToDoListDisplay items={todoList} onDelete={handleDelete}/>
    
    </VStack>
  )
}

{/* <VStack>
        <Heading>TODO List</Heading>
        <ToDoItemEntryForm onAdd={handleAdd}/>
        <ToDoListDisplay items={todoList} onDelete={handleDelete}/>
      </VStack> */}



