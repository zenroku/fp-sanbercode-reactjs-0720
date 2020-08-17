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

const DetailMovie = () => {
    const classes = useStyles()
    const idDetail = parseInt(useParams().id)
    const [detail, setDetail] = useState({})
    const dataDummy = null
    // title: '', year: '', genre: '', rating: '', description: '', duration: '', image_url: '', review: '', 

    useEffect(() => {
        if (dataDummy === null) {
            axios.get('https://backendexample.sanbersy.com/api/movies')
                .then(res => {
                    const detailData = res.data.find(elm => elm.id === idDetail)
                    setDetail({
                        title: detailData.title,
                        year: detailData.year,
                        genre: detailData.genre,
                        rating: detailData.rating,
                        description: detailData.description,
                        duration: detailData.duration,
                        image_url: detailData.image_url,
                        review: detailData.review
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
                            {detail.title}
                        </Typography>
                    </Grid>
                    <Grid container justify="center">
                        <div className={classes.canvas} style={{ objectFit: 'cover' }}>
                            <img className={classes.imageStyle} alt="naon we" src={detail.image_url}></img>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1">Year : <strong>{detail.year}</strong></Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1">Genre : <strong>{detail.genre}</strong></Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1">Rating : <strong>{detail.rating}</strong></Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1">Duration : <strong>{detail.duration} menit</strong></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Description</Typography>
                        <Typography>{detail.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Review</Typography>
                        <Typography>{detail.review}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default DetailMovie