import React, { useEffect, useState } from 'react'
import { Paper, Grid, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
    containerStyle: {
        minHeight: 600,
        display: 'grid'
    },
    paperStyle: {
        margin: 50,
        minHeight: 600,
        width: 600,
        padding: 30
    },
    canvas: {
        height: 500,
        width: 600,
        justifyContent: "center"
    },
    imageStyle: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    }
})

const DetailGame = () => {
    const classes = useStyles()
    const idDetail = parseInt(useParams().id)
    const [detail, setDetail] = useState({})
    const dataDummy = null
    // title: '', year: '', genre: '', rating: '', description: '', duration: '', image_url: '', review: '', 

    useEffect(() => {
        if (dataDummy === null) {
            axios.get('https://backendexample.sanbersy.com/api/games')
                .then(res => {
                    const detailData = res.data.find(elm => elm.id === idDetail)
                    setDetail({
                        name: detailData.name,
                        release: detailData.release,
                        genre: detailData.genre,
                        platform: detailData.platform,
                        singlePlayer: detailData.singlePlayer,
                        multiplayer: detailData.multiplayer,
                        image_url: detailData.image_url
                    })
                })
        }

    }, [idDetail])



    return (
        <Container className={classes.containerStyle} style={{ justifyContent: 'center' }}>
            <Paper className={classes.paperStyle}>
                <Grid container spacing={5}>
                    <Grid container justify="center">
                        <Typography variant="h4" style={{ paddingBottom: 30 }}>
                            {detail.name}
                        </Typography>
                    </Grid>
                    <Grid container justify="center">
                        <div className={classes.canvas} style={{ objectFit: 'cover' }}>
                            <img className={classes.imageStyle} alt="naon we" src={detail.image_url}></img>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">Release : <strong>{detail.release}</strong></Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">Single Player : <strong>{detail.singlePlayer}</strong></Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">Multi Player : <strong>{detail.multiplayer}</strong></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Genre</Typography>
                        <Typography>{detail.genre}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Platform</Typography>
                        <Typography>{detail.platform}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default DetailGame