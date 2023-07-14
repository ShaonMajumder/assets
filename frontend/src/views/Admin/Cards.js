import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Card, CardContent, CardHeader, createTheme, Grid, Paper, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import Header from './Header';

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

const Cards = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={myTheme}>
      <main className={classes.content}>

        
        <Typography variant="h5" component="h1" align="left" className={classes.pageTitle} gutterBottom>
          Dashboard
        </Typography>

        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Total Assets</Typography>
              <Typography variant="h4">1,234</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Assets in Use</Typography>
              <Typography variant="h4">567</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.paper} ${classes.warningCard}`}>
              <Typography variant="h6" className={classes.warningTypography}>
                Idle Assets
              </Typography>
              <Typography variant="h4" className={classes.warningTypography}>
                567
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Available Assets</Typography>
              <Typography variant="h4">$123,456</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Maintenance Requests</Typography>
              <Typography variant="h4">890</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Buying Requests</Typography>
              <Typography variant="h4">750</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Total Worth</Typography>
              <Typography variant="h4">$750,00,00</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
              <CardHeader avatar={<Avatar>A</Avatar>} title="Asset Allocation" />
              <CardContent>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a eros non lacus luctus convallis.
                  Morbi sit amet sapien non erat varius accumsan id et turpis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
              <CardHeader avatar={<Avatar>M</Avatar>} title="Maintenance Schedule" />
              <CardContent>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a eros non lacus luctus convallis.
                  Morbi sit amet sapien non erat varius accumsan id et turpis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
              <CardHeader avatar={<Avatar>D</Avatar>} title="Depreciation Analysis" />
              <CardContent>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a eros non lacus luctus convallis.
                  Morbi sit amet sapien non erat varius accumsan id et turpis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
    
  );
};

export default Cards;
