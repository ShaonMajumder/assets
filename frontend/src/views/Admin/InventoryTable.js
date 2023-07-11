import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { listInventory, deleteInventory } from '../../services/InventoryServices';
import { HTTP_OK } from '../../utils/HttpStatusCode';
import { notify } from '../../utils/Toast';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate } from 'react-router-dom';
import ImageGalleryUploader from '../../components/ImageGalleryUploader/ImageGalleryUploader';
import { fetchDBImages2D } from '../../components/ImageGalleryUploader/ImageGalleryUploaderService';

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
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [imageViewerArray2D, setImageViewerArray2D] = useState([]);

  useEffect(() => {
    fetchInventories();
  },[]);

  const setImagesOnLoading = async (inventoryData) => {
    let images2D = [];
    for(let i in inventoryData){
      console.log(inventoryData[i])
      console.log(inventoryData[i]?.files)
      images2D[i] = inventoryData[i]?.files;
    }
    let images_url = `${process.env.REACT_APP_API_URL}/inventory/get-image/?fileName=`;
    await fetchDBImages2D(images2D,images_url,imageViewerArray2D,setImageViewerArray2D);
  }

  const fetchInventories = async () => {
    const {data,status} = await listInventory();
    let inventoryData = data.data;
    if (status === HTTP_OK) {
      setInventoryData(inventoryData)
      setImagesOnLoading(inventoryData);
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
              {inventoryData.map((item,index) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <ImageGalleryUploader
                      imageUploader={false}
                      is2D={true}
                      imageArray2D={imageViewerArray2D} 
                      rowIndex2D={index}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={()=> {
                      handleDelete(item.id);
                    }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={()=> {
                      navigate(`/inventory/update/${item.id}`);
                    }}>
                      <EditIcon />
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
