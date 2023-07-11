import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { listInventory, deleteInventory } from '../../services/InventoryServices';
import { HTTP_OK } from '../../utils/HttpStatusCode';
import { notify } from '../../utils/Toast';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  paper: {
    margin: theme.spacing(1),
  },
}));

const InventoryTable = () => {
  const classes = useStyles();
  const [inventoryData, setInventoryData] = useState([]);
  // const inventoryData = [
  //   { id: 1, name: 'Item 1', category: 'Category A', quantity: 10 },
  //   { id: 2, name: 'Item 2', category: 'Category B', quantity: 5 },
  //   { id: 3, name: 'Item 3', category: 'Category C', quantity: 15 },
  // ];

  useEffect(() => {
    fetchInventories();
  },[]);

  const fetchInventories = async () => {
    const {data,status} = await listInventory();
    let inventoryData = data.data;
    if (status === HTTP_OK) {
      setInventoryData(inventoryData)
    } else {
      notify(data.message, data.status_code);
    }
  }

  const handleDelete = async (id) => {
    console.log("handleDelete")
    const {data,status} = await deleteInventory(id);
    let inventoryData = data.data;
    if (status === HTTP_OK) {
      console.log(inventoryData);
      notify("Inventory Deleted", status);
      setInventoryData(inventoryData)
    } else {
      notify(data.message, data.status_code);
    }
  }

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="Inventory Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={()=> {
                      handleDelete(item.id);
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default InventoryTable;
