import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import InventoryTable from './InventoryTable';
import Header from './Header';
import Cards from './Cards';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div >
          <Header />
          <Cards />
        </div>
        <InventoryTable />
      </div>
    </div>
  );
};

export default Dashboard;
