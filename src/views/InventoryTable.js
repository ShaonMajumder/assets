import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

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

  const inventoryData = [
    { id: 1, name: 'Item 1', category: 'Category A', quantity: 10 },
    { id: 2, name: 'Item 2', category: 'Category B', quantity: 5 },
    { id: 3, name: 'Item 3', category: 'Category C', quantity: 15 },
  ];

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="Inventory Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
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
