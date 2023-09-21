import React, { useState, useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../Redux/employeeCrud';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const theme = ["System Default Theme", 'Gradient Theme', 'Dark Theme', 'Warm Theme']
const storedTheme = localStorage.getItem('theme') || 'SystemDefault'

export default function ToggleTheme() {
  const dispatch = useDispatch<any>()
  const [currentTheme, setCurrentTheme] = useState(storedTheme||'System Default Theme')

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentTheme(event.target.value as string);
  };

  useMemo(() => {
    localStorage.setItem('theme', currentTheme)
    dispatch(changeTheme(currentTheme))
  }, [currentTheme])
  return (
    <Box className='absolute flex justify-end right-20 top-5 w-64' sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Theme</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentTheme}
          label="Select Theme"
          onChange={handleChange}
        >
          {theme.map((themevalue: string, index) => (
          <MenuItem
            key={index}
            value={themevalue}
            >{themevalue}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}