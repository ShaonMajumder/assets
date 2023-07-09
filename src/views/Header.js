import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, createTheme, Toolbar, Typography } from '@material-ui/core';

const myTheme = createTheme({
  palette: {
    primary: {
      main: '#9ccc65', // Replace with your desired color
    },
  },
});

const useStyles = makeStyles(() => ({
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
}));

const Header = () => {
  const classes = useStyles(myTheme);

  return (
    <ThemeProvider theme={myTheme}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Assets
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
