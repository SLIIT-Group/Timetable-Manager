import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ApartmentIcon from '@material-ui/icons/Apartment';

const drawerWidth = 240;

const navStyle = {
  color: '#fff',
  textDecoration: 'none',
};
const activeStyle = {
  color: '#fdff8c',
  textDecoration: 'none',
  backgroundColor: 'red',
};

const iconStyle = {
  marginRight: '20px',
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // backgroundImage: 'linear-gradient(  #4389A2, #42275a)',
    backgroundImage: 'linear-gradient(  #42275a, #4389A2)',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  //navigation bar will always open
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ backgroundColor: '#42275a' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Timetable Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/time'>
            <ListItem button>
              <ListItemText>
                <ScheduleIcon style={iconStyle} /> Time Manager
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/lecturers'>
            <ListItem button>
              <ListItemText>
                <SupervisorAccountIcon style={iconStyle} /> Lecturers
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/location'>
            <ListItem button>
              <ListItemText>
                <ExploreIcon style={iconStyle} /> Location
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/session'>
            <ListItem button>
              <ListItemText>
                <CalendarViewDayIcon style={iconStyle} /> Session
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/student'>
            <ListItem button>
              <ListItemText>
                <AccountBoxIcon style={iconStyle} /> Student
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/subject'>
            <ListItem button>
              <ListItemText>
                <MenuBookIcon style={iconStyle} /> Subject
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/tags'>
            <ListItem button>
              <ListItemText>
                <LocalOfferIcon style={iconStyle} /> Tags
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeStyle={activeStyle} style={navStyle} to='/stats'>
            <ListItem button>
              <ListItemText>
                <EqualizerIcon style={iconStyle} /> Statistics
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink exact activeStyle={activeStyle} style={navStyle} to='/rooms'>
            <ListItem button>
              <ListItemText>
                <ApartmentIcon style={iconStyle} />
                Rooms
              </ListItemText>
            </ListItem>
          </NavLink>
          <NavLink
            exact
            activeStyle={activeStyle}
            style={navStyle}
            to='/timetables'
          >
            <ListItem button>
              <ListItemText>
                <ApartmentIcon style={iconStyle} />
                Timetables
              </ListItemText>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
