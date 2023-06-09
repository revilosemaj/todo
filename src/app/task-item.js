'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const TaskItem = ({ item, onUpdate, onRemove }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item);

  const transformedItem = useCallback((itemName) => {
    return itemName.length > 25 ? itemName.slice(0, 25) + '...' : itemName;
  }, []);

  const handleEditClick = useCallback(() => {
    setEditing(true);
  }, []);

  const handleInputChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleSaveClick = useCallback(() => {
    onUpdate(value);
    setEditing(false);
  }, [value]);

  if (editing) {
    return (
      <ListItem disablePadding>
        <ListItemButton disableTouchRipple>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              sx={{
                width: '240px',
              }}
              value={value}
              onChange={handleInputChange}
            />
            <Button variant="contained" onClick={handleSaveClick}>
              SAVE
            </Button>
          </Stack>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton disableTouchRipple>
        <Stack direction="row" spacing={2}>
          <ListItemText
            primary={transformedItem(item)}
            sx={{
              width: '240px',
            }}
          />

          <IconButton variant="contained" onClick={handleEditClick}>
            <ModeEditIcon />
          </IconButton>
          <IconButton
            variant="contained"
            color="error"
            onClick={() => onRemove(item)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default React.memo(TaskItem);
