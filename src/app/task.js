'use client';
import React, { useState, useMemo, useCallback } from 'react';
import TaskItem from './task-item';
import SearchInput from './search-input';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Task = () => {
  const [taskItems, setTaskItems] = useState(['Task 1', 'Task 2', 'Task 3']);
  const [item, setItem] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleInputChange = useCallback((e) => {
    if (e.target.name === 'search') {
      setSearchList(e.target.value);
    } else {
      setItem(e.target.value);
    }
  }, []);

  const handleUpdateItem = (index, value) => {
    const updatedItems = !!searchList.length ? [...searchList] : [...taskItems];

    updatedItems[index] = value;
    setSearchList(updatedItems);
    setTaskItems(updatedItems);
  };

  const handleRemoveItem = (taskName) => {
    const updatedItems = !!searchList.length ? [...searchList] : [...taskItems];
    const newTaskItems = updatedItems.filter((item) => {
      return item != taskName;
    });

    setSearchList(newTaskItems);
    setTaskItems(newTaskItems);
  };

  const handleAddItem = () => {
    const updatedItems = !!searchList.length ? [...searchList] : [...taskItems];

    if (item != '' && !updatedItems.includes(item)) {
      let temp = updatedItems;
      temp.push(item);
      if (!!searchList.length) {
        setSearchList(temp);
      } else {
        setTaskItems(temp);
      }
      setItem('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please fill in the blank field.');
    }
  };

  const handleSearch = (searchTerm) => {
    const searchValue = taskItems.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );

    if (!searchValue.length) {
      setSearchError('No task found');
    } else {
      if (!!searchList.length) {
        setSearchList([...searchValue]);
      } else {
        setTaskItems([...searchValue]);
      }
      setSearchError('');
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        padding: '30px',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '25px',
          padding: '30px',
        }}
      >
        Task Management System
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: '10px 0 20px 0',
        }}
      >
        <TextField
          variant="outlined"
          label="Input your task"
          sx={{
            width: '240px',
          }}
          name="add item"
          value={item}
          helperText={!item.length && errorMessage}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          onClick={handleAddItem}
          sx={{ height: '55px' }}
        >
          Add Task
        </Button>
      </Stack>
      <SearchInput onSearch={(searchTerm) => handleSearch(searchTerm)} />
      <List>
        {!searchList.length &&
          !searchError.length &&
          taskItems.map((item, index) => (
            <TaskItem
              key={index}
              item={item}
              onUpdate={(value) => handleUpdateItem(index, value)}
              onRemove={(value) => handleRemoveItem(value)}
            />
          ))}
        {!!searchList.length &&
          !searchError.length &&
          searchList.map((item, index) => (
            <TaskItem
              key={index}
              item={item}
              onUpdate={(value) => handleUpdateItem(index, value)}
              onRemove={(value) => handleRemoveItem(value)}
            />
          ))}
        {(taskItems.length === 0 || !!searchError.length) && (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '18px',
              padding: '30px',
            }}
          >
            No task found
          </Box>
        )}
      </List>
    </Card>
  );
};

export default Task;
