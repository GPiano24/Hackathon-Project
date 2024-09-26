import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import manulifeLogo from '../manulifeLogo.png'
const Navbar = () => {
  return (
    <AppBar position="static"
    sx={{ backgroundColor: 'white', color: 'black' }}>

      <Toolbar>
        <img 
          src={manulifeLogo}
          alt="Logo" 
          style={{ width: '190px', height: '50px', marginRight: '10px' }}
        />

        <Typography variant="h6" sx={{ flexGrow: 1, fontSize:20 }}>
        
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'block' }, gap: 2, display: 'flex' }}>
          <Button color="inherit">Book A Room</Button>
          <Button color="inherit">Bookings</Button>
          <Button color="inherit">Profile</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
