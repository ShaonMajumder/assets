import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography, Grid } from '@material-ui/core';
import { jsonToFormdata } from 'convert-form-data';
import { postLogin } from '../services/InventoryServices';
import { HTTP_OK } from '../utils/HttpStatusCode';
import { notify } from '../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { SUCCESS } from '../services/MessageConst';
import { useAuth } from '../services/AuthContext';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(4),
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Login = ({onLogin}) => {
  const { login } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formDataObject = new FormData();
    formDataObject = jsonToFormdata("", formFields, formDataObject);
    
    const {data,status} = await postLogin(formDataObject);
    if (status === HTTP_OK) {
      let access_token = data?.data?.access_token;
      let token_type = data?.data?.token_type;
      let expires_in = data?.data?.expires_in;
      
      Cookies.set('loggedIn', 'true', { expires: expires_in })
      Cookies.set('token_type', token_type, { expires: expires_in })
      Cookies.set('access_token', access_token, { expires: expires_in })
      Cookies.set('expires_in', expires_in, { expires: expires_in })

      notify(data.message, SUCCESS);
      
      login();
      navigate('/');
    } else {
      notify(data.message, data.status_code);
    }
  };

  return (
    <Grid container className={classes.container} justify="center" alignItems="center">
      <Grid item>
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            
            <TextField
              name="email"
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={formFields.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="password"
              type="text"
              label="Password"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={formFields.password}
              onChange={handleInputChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
