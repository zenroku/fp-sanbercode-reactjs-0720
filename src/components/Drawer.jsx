import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemAvatar, Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MovieIcon from '@material-ui/icons/Movie';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

const useStyles = makeStyles((theme) => ({
    list: {
        width: 320,
    },
    fullList: {
        width: 'auto',
    },
    linkStyle: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

export default function TempDrawer() {
    const classes = useStyles();
    const [state, setState] = useState({ left: false })
    const { accName } = useContext(LoginContext)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link to="/change-password" className={classes.linkStyle}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt="Gambar">{accName.charAt(0).toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={` Welcome To Dashboard ${accName.charAt(0).toUpperCase()}${accName.slice(1)}`} secondary="Click to Change Password" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/movie" className={classes.linkStyle}>
                    <ListItem button>
                        <ListItemIcon><MovieIcon /></ListItemIcon>
                        <ListItemText primary='Movie Table (Edit and Delete)' />
                    </ListItem>
                </Link>
                <Link to="/movie/create" className={classes.linkStyle}>
                    <ListItem button>
                        <ListItemIcon><AddBoxIcon /></ListItemIcon>
                        <ListItemText primary='Add New Movie' />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/game" className={classes.linkStyle}>
                    <ListItem button>
                        <ListItemIcon><SportsEsportsIcon /></ListItemIcon>
                        <ListItemText primary='Game Table (Edit and Delete)' />
                    </ListItem>
                </Link>
                <Link to="/game/create" className={classes.linkStyle}>
                    <ListItem button>
                        <ListItemIcon><AddBoxIcon /></ListItemIcon>
                        <ListItemText primary='Add New Game' />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <div>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon onClick={toggleDrawer('left', true)} />
            </IconButton>
            <Drawer anchor={'left'} open={state.left} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </div>
    );
}