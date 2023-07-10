import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import InventoryTable from './InventoryTable';
import Header from './Header';
import Create from './Inventory/Create';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
  },
}));

const CreateInventory = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div >
          <Header />
          <Create />
        </div>
        {/* <InventoryTable /> */}
      </div>
    </div>
  );
};

export default CreateInventory;
