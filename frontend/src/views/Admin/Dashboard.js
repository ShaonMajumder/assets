import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import InventoryTable from './InventoryTable';
import Header from './Header';
import Cards from './Cards';
import { listInventory } from '../../services/InventoryServices';
import { HTTP_OK } from '../../utils/HttpStatusCode';
import { notify } from '../../utils/Toast';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [inventoryDataList, setInventoryDataList] = useState([]);
  
  useEffect(() => {
    fetchInventories();
  },[]);

  const fetchInventories = async () => {
    const {data,status} = await listInventory();
    let inventoryDataList = data?.data;
    if (status === HTTP_OK) {
      setInventoryDataList(inventoryDataList)
    } else {
      notify(data.message, data.status_code);
    }
  }

  return (
    <div className={classes.root}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div >
          <Header />
          <Cards
            inventoryData = {inventoryDataList}
            setInventoryData = {setInventoryDataList}
          />
        </div>
        <InventoryTable 
          inventoryData = {inventoryDataList}
          setInventoryData = {setInventoryDataList}
        />
      </div>
    </div>
  );
};

export default Dashboard;
