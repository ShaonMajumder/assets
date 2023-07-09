import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './views/Admin/Sidebar';
import InventoryTable from './views/Admin/InventoryTable';
import Header from './views/Admin/Header';
import Cards from './views/Admin/Cards';
import Dashboard from './views/Admin/Dashboard';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dashboard />
    </div>
  );
};

export default App;
