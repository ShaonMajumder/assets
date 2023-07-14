import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import LogsTable from './LogsTable';
import Header from './Header';
import Cards from './Cards';
import { createTheme, Typography } from '@material-ui/core';


const myTheme = createTheme({
  palette: {
    primary: {
      main: '#9ccc65', // Replace with your desired color
    },
  },
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
  },
  pageTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
    borderBottom: `2px solid ${myTheme.palette.primary.main}`,
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));



const LogHistory = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div >
          <Header />
          <Typography variant="h5" component="h1" align="left" className={classes.pageTitle} gutterBottom>
            Logs
          </Typography>
          {/* <Cards /> */}
        </div>
        <LogsTable />
      </div>
    </div>
  );
};

export default LogHistory;
