import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './views/Sidebar';
import Dashboard from './views/Dashboard';
import InventoryTable from './views/InventoryTable';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div style={{ flex: 1, overflow: 'auto'  }}>
        <Dashboard />
        <InventoryTable />
      </div>
    </div>
  );
};

export default App;
