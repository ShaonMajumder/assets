import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  ThemeProvider,
  createTheme
} from '@material-ui/core';

import ImageGalleryUploader, { fetchEditDBImages } from '../../../components/ImageGalleryUploader/ImageGalleryUploader';
import {jsonToFormdata} from 'convert-form-data';
import { HTTP_OK, HTTP_CREATED } from "../../../utils/HttpStatusCode";
import { notify } from '../../../components/ImageGalleryUploader/Toast';
import { SUCCESS } from '../../../components/ImageGalleryUploader/MessageConst';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { getInventory, updateInventory } from '../../../services/InventoryServices';

const myTheme = createTheme({
  palette: {
    primary: {
      main: '#9ccc65', // Replace with your desired color
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    height: 64, // Adjust the height as needed
  },
  title: {
    flexGrow: 1,
  },
  dashboard: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
  },
  warningCard: {
    margin: theme.spacing(1),
    border: `2px solid ${theme.palette.warning.light}`,
  },
  warningTypography: {
    color: theme.palette.warning.dark,
  },
  pageTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
    borderBottom: `2px solid ${myTheme.palette.primary.main}`,
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const Update = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const [formFields, setFormFields] = useState({
    _method : 'PUT',
    name: '',
    quantity: '',
    files: null,
  });
  const [imageViewerArray, setImageViewerArray] = useState([]);
  const [imageFormdataArray, setImageFormdataArray] = useState([]);
  
  useEffect(()=>{
    fetchInventoryItem(id);
  }, []);

  const fetchInventoryItem = async (id) => {
    const {data,status} = await getInventory(id);
    let inventoryData = data.data;
    if (status === HTTP_OK) {
      
      console.log("inventoryData.files",inventoryData.files)
      let images = inventoryData.files ?? null;
      let images_url = `${process.env.REACT_APP_API_URL}/inventory/get-image/?fileName=/`;
      let im = await fetchEditDBImages({
        images: images,
        images_url: images_url,
        imageViewerArray: imageViewerArray,
        setImageViewerArray: setImageViewerArray,
        imageFormdataArray: imageFormdataArray,
        setImageFormdataArray: setImageFormdataArray
      });

      console.log("imageFormdataArray on loading...",im)

      setFormFields((prevFormFields)=>({
        ...prevFormFields,
        name: inventoryData.name,
        quantity: inventoryData.quantity,
      }))


    } else {
      notify(data.message, data.status_code);
    }
  }

  const uploadMultipleFiles = (files) => {
    setImageFormdataArray(([...prevImageFormdataArray]) => [...prevImageFormdataArray, ...files] );
   
    setImageViewerArray(([...prevImageViewerArray]) => [
      ...prevImageViewerArray,
      ...Array.from(files, (file) => URL.createObjectURL(file))
    ]);
    
    setFormFields((prevState) => ({
      ...prevState,
      files: [...imageFormdataArray, ...files]
    }));
  };

  const handleRemoveImage = (id) => {
    setImageViewerArray(([...prevImageViewerArray]) => prevImageViewerArray.filter((_, i) => i !== id) );
    let objB = imageFormdataArray.filter((_, i) => i !== id);
    setImageFormdataArray(objB);

    setFormFields((prevState) => ({
      ...prevState,
      files: objB
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formDataObject = new FormData();
    let submissionData = {
      ...formFields,
      files : imageFormdataArray
    }
    formDataObject = jsonToFormdata("", submissionData, formDataObject);
    
    const {data,status} = await updateInventory(id, formDataObject);    
    if (status === HTTP_OK) {
      notify(formFields.name+" Inventory Updated!", SUCCESS);
      navigate('/');
    } else {
      notify(data.message, data.status_code);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <ThemeProvider theme={myTheme}>
      <main className={classes.content}>
        
        <Typography variant="h5" component="h1" align="left" className={classes.pageTitle} gutterBottom>
          Inventory
        </Typography>

        <Grid container className={classes.container} justify="center" alignItems="center" spacing={10}>
          <Grid item>    
            <div className={classes.container}>
            <Container>
                <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5" align="center" gutterBottom>
                    Update Inventory Item
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                      name="name"
                      type="text"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                      value={formFields.name}
                      onChange={handleInputChange}
                      style={{ marginBottom: '1rem' }}
                      required
                    />
                    <TextField
                      name="quantity"
                      type="number"
                      label="Quantity"
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                      value={formFields.quantity}
                      style={{ marginBottom: '1rem' }}
                      onChange={handleInputChange}
                      required
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
                    style={{ marginTop: '1rem' }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    >
                    Update
                    </Button>
                </form>
                </Paper>
            </Container>
            </div>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
    
  );
};

export default Update;
