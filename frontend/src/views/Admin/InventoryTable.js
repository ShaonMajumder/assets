import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { listInventory, deleteInventory, fileDownloader, bulkFileDownloader } from '../../services/InventoryServices';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { RiFileExcel2Line } from "react-icons/ri";
import { GrDocumentPdf, GrAdd } from "react-icons/gr";
import ImageGalleryUploader from '../../components/ImageGalleryUploader/ImageGalleryUploader';
import { fetchDBImages2D } from '../../components/ImageGalleryUploader/ImageGalleryUploaderService';
import {
  downloadPDFFrontendAuth,
  downloadExcelFrontendAuth
} from '../../utils/Files';
import { HTTP_OK } from '../../utils/HttpStatusCode';
import { notify } from '../../utils/Toast';

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
  bulkButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  },
  bulkButton: {
    marginLeft: theme.spacing(1),
  },
  bulkActionsText: {
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
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
    await fetchDBImages2D({
      images2D: images2D,
      images_url: images_url,
      imageViewerArray2D: imageViewerArray2D,
      setImageViewerArray2D: setImageViewerArray2D
    });
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

  const handleDownloadPDF = async ( id) => {
    const {data,status} = await fileDownloader( id, "pdf");
    if (status === HTTP_OK) {
      const fileContent = data?.data?.file;
      const file_name = data?.data?.file_name;
      const file_type = data?.data?.file_type;

      downloadPDFFrontendAuth(fileContent,file_name,file_type)
    } else {
      notify(data?.data?.message, data?.data?.status_code);
    }
  };

  const handleDownloadExcel = async (id) => {
    const {data,status} = await fileDownloader(id, "excel");
    if (status === HTTP_OK) {
      console.log(data)
      const fileContent = data?.data?.file;
      const file_name = data?.data?.file_name;
      const file_type = data?.data?.file_type;

      downloadExcelFrontendAuth(fileContent,file_name,file_type)
    } else {
      notify(data?.data?.message, data?.data?.status_code);
    }
  };

  const handleBulkPDFDownload = async () => {
    const {data,status} = await bulkFileDownloader( "pdf");
    if (status === HTTP_OK) {
      const fileContent = data?.data?.file;
      const file_name = data?.data?.file_name;
      const file_type = data?.data?.file_type;

      downloadPDFFrontendAuth(fileContent,file_name,file_type)
    } else {
      notify(data?.data?.message, data?.data?.status_code);
    }
  };

  const handleBulkExcelDownload = async () => {
    const {data,status} = await bulkFileDownloader( "excel");
    if (status === HTTP_OK) {
      const fileContent = data?.data?.file;
      const file_name = data?.data?.file_name;
      const file_type = data?.data?.file_type;

      downloadExcelFrontendAuth(fileContent,file_name,file_type)
    } else {
      notify(data?.data?.message, data?.data?.status_code);
    }
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
        <div className={classes.bulkButtonsContainer}>
          <Typography variant="body1" component="div" className={classes.bulkActionsText}>
            Bulk actions:
          </Typography>
          <IconButton 
            aria-label="Add Inventory" 
            className={classes.bulkButton}
            onClick={()=> {
              navigate("/inventory/create");
            }} >
            <GrAdd size={34} />
          </IconButton>
          <IconButton 
            aria-label="Bulk Download PDF" 
            className={classes.bulkButton}
            onClick={handleBulkPDFDownload}>
            <GrDocumentPdf color='red !important' size={30} />
          </IconButton>
          <IconButton 
            aria-label="Bulk Download Excel" 
            className={classes.bulkButton}
            onClick={handleBulkExcelDownload}>
            <RiFileExcel2Line size={33} style={{ color: "#0bac81" }}/>
          </IconButton>
        </div>
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
                    <IconButton 
                      aria-label="Download PDF" 
                      onClick={() => handleDownloadPDF(item.id) }
                    >
                      <GrDocumentPdf color='red !important' size={23} />
                    </IconButton>
                    <IconButton
                      aria-label="Download Excel"
                      onClick={() => handleDownloadExcel(item.id) }
                    >
                      <RiFileExcel2Line size={24} style={{ color: "#0bac81" }}/>
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
