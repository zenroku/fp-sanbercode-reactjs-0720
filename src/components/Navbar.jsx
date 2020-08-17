import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import TempDrawer from './Drawer'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navigation: {
        paddingTop: '10px'
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const { isLogin, setIsLogin, setAccName, setIdAcc } = useContext(LoginContext)

    const loginHandle = () => {
        if (isLogin) {
            setIsLogin(false)
            setAccName('')
            setIdAcc(0)
            history.push('/')
        } else {
            history.push('/login')
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justify="space-between">
                        <Grid item style={{ display: 'flex' }}>
                            {isLogin ? (<TempDrawer />) : null}
                            <IconButton edge="start" className={classes.menuButton} onClick={() => history.push("/")} color="inherit" aria-label="menu">
                                <Typography variant="h6" className={classes.title}>
                                    Movies and Games Review
                                </Typography>
                            </IconButton>
                        </Grid>
                        <Grid item className={classes.navigation}>
                            <Button color="inherit" onClick={() => history.push("/movie-content")}>Movie Gallery</Button>
                            <Button color="inherit" onClick={() => history.push("/game-content")}>Game Gallery</Button>
                            <Button color="inherit" onClick={loginHandle}>{isLogin ? 'Logout' : 'Login'}</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}