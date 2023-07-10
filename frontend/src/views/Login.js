import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography, Grid } from '@material-ui/core';

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

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);
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
              type="text"
              label="Username"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={password}
              onChange={handlePasswordChange}
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
