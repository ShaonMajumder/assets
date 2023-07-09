import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
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
}));

const LoginPage = () => {
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
    <div className={classes.container}>
      <Container>
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
      </Container>
    </div>
  );
};

export default LoginPage;
