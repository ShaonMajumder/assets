import React, { useState, useContext } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, createTheme, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, ArrowDropDown } from '@material-ui/icons';
import { postLogout } from '../../services/InventoryServices';
import { HTTP_OK } from '../../utils/HttpStatusCode';
import { notify } from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import Cookies from 'js-cookie';

const myTheme = createTheme({
  palette: {
    primary: {
      main: '#9ccc65', // Replace with your desired color
    },
  },
});

const useStyles = makeStyles((theme) => ({
  header: {
    height: 48, // Adjust the height as needed
    // backgroundColor: myTheme.palette.primary.main, // Use theme2 primary color as background
  },
  title: {
    flexGrow: 1,
    fontSize: '1.5rem', // Adjust the font size as needed
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
    zIndex: theme.zIndex.appBar + 1, // Set a higher z-index
  },
  arrowIcon: {
    marginLeft: '4px',
  },
  dialogSource: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    marginLeft: '8px',
  },
}));

const Header = () => {
  const { logout } = useAuth();
  const classes = useStyles(myTheme);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const {data,status} = await postLogout();
    // console.log(data)
    if (status === HTTP_OK) {
      Cookies.remove('loggedIn');
      Cookies.remove('token_type');
      Cookies.remove('access_token');
      Cookies.remove('expires_in');

      logout();
      navigate("/")
    } else {
      notify(data.message, data.status_code);
    }
  };

  return (
    <ThemeProvider theme={myTheme}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Assets
          </Typography>
          <div className={classes.avatar}>
            
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
              <Typography variant="subtitle2" className={classes.dialogSource}>
                Admin
              </Typography>
              <ArrowDropDown className={classes.arrowIcon} />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
