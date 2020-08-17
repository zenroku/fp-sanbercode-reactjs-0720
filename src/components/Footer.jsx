import React from 'react'
import {
    Typography,
    Grid

} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    forFooter: {
        backgroundColor: '#3f51b5',
        padding: 30
    },
    forText: {
        color: 'white'
    }
})

// pure Function component
const Footer = () => {
    const classes = useStyles()
    return (
        <Grid container justify='center' className={classes.forFooter}>
            <Grid item>
                <Typography className={classes.forText} variant="body1" gutterBottom>
                    Final Project Sanbercode ReactJS for Beginner July2020
                        </Typography>
                <Typography className={classes.forText} variant="caption" gutterBottom>
                    Copyright @ Movies and Games Reviews
                        </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer