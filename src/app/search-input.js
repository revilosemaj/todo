import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        padding: '10px 0 20px 0',
      }}
    >
      <TextField
        variant="outlined"
        label="Search your task"
        sx={{
          width: '240px',
        }}
        name="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        onClick={handleSearchClick}
        sx={{ height: '55px' }}
      >
        SEARCH TASK
      </Button>
    </Stack>
  );
};

export default SearchInput;
