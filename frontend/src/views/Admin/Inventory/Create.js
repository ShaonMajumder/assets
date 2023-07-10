import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import ImageGalleryUploader from '../../../components/ImageGalleryUploader/ImageGalleryUploader';
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    // minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(4),
    width: 300,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  dropzone: {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
  },
}));

const Create = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null);
  const [imageViewerArray, setImageViewerArray] = useState([]);
  const [imageFormdataArray, setImageFormdataArray] = useState([]);

  const uploadMultipleFiles = (files) => {
    let fileObj = [];
    setImageFormdataArray([...imageFormdataArray, ...files]);
    for (let i = 0; i < files.length; i++) {
      fileObj.push(URL.createObjectURL(files[i]));
    }
    setImageViewerArray([...imageViewerArray, ...fileObj]);
  };

  const handleRemoveImage = (id) => {
    let objA = imageViewerArray.filter((img, i) => i !== id);
    let objB = imageFormdataArray.filter((imgs, idx) => idx !== id);
    setImageViewerArray(objA);
    setImageFormdataArray(objB);
    toast.success('erro', {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform create inventory logic here
    console.log('Name:', name);
    console.log('Quantity:', quantity);
    console.log('File:', imageViewerArray);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <Grid container className={classes.container} justify="center" alignItems="center">
      <Grid item>    
        <div className={classes.container}>
        <Container>
            <Paper className={classes.paper} elevation={3}>
            <Typography variant="h5" align="center" gutterBottom>
                Create Inventory Item
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
                className={classes.textField}
                value={name}
                onChange={handleNameChange}
                />
                <TextField
                type="number"
                label="Quantity"
                variant="outlined"
                fullWidth
                className={classes.textField}
                value={quantity}
                onChange={handleQuantityChange}
                />
                
                <ImageGalleryUploader
                    isImageUploader={true}
                    validation={{
                      maxFileSize: 3,
                      maxFileCount: 10,
                    }}
                    imageArray={imageViewerArray}
                    handleImage={uploadMultipleFiles}
                    handleRemoveImage={handleRemoveImage}
                  />
                  
                <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                >
                Create
                </Button>
            </form>
            </Paper>
        </Container>
        </div>
      </Grid>
    </Grid>
    
  );
};

export default Create;
