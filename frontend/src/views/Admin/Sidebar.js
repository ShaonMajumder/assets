import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@material-ui/core';
import { Inbox, Mail, Dashboard, Menu, ChevronLeft, Drafts, Delete, Store } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sidebarOpen: {
    width: drawerWidth,
  },
  sidebarClose: {
    width: theme.spacing(7),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${classes.sidebar} ${isOpen ? classes.sidebarOpen : classes.sidebarClose}`}>
      <div className={classes.toolbar}>
        <IconButton onClick={handleToggleSidebar}>
          {isOpen ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </div>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button component={Link} to="/inventory/create">
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
