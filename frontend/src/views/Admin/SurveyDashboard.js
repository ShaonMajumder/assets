import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import InventoryTable from './InventoryTable';
import Header from './Header';
import Cards from './Cards';
import { listInventory } from '../../services/InventoryServices';
import { HTTP_OK } from '../../utils/HttpStatusCode';
import { notify } from '../../utils/Toast';
import SurveyCard from './SurveyCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden',
  },
}));

const SurveyDashboard = () => {
  const classes = useStyles();
  const [inventoryDataList, setInventoryDataList] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#000000');
  
  useEffect(() => {
    fetchInventories();
  },[]);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

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
        <SurveyCard 
          inventoryData = {inventoryDataList}
          setInventoryData = {setInventoryDataList}
        />
      </div>
    </div>
  );
};

export default SurveyDashboard;
