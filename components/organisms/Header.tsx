import {AppBar, Box, Drawer, IconButton, Toolbar} from '@mui/material';
import React, {FC, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PageList from './PageList';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: '#353535'}}>
          <IconButton
            size="large"
            sx={{color: '#fff'}}
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            width: '500px',
            height: '100vh',
            backgroundColor: '#353535',
            padding: '100px 0',
          }}
        >
          <PageList />
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
