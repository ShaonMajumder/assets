import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import InventoryTable from './InventoryTable';
import Header from './Header';
import Update from './Inventory/Update';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
  },
}));

const UpdateInventory = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div >
          <Header />
          <Update />
        </div>
        {/* <InventoryTable /> */}
      </div>
      
    </div>
  );
};

export default UpdateInventory;
