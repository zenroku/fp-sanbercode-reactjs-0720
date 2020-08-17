import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Container,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Grid
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Switch, useRouteMatch, Route } from 'react-router-dom'
import DetailMovie from './DetailMovie'

const useStyle = makeStyles({
    image: {
        height: 200,
    },
    gridArea: {
        minHeight: 350
    }
})

const MovieHome = () => {
    const classes = useStyle()
    const [movieData, setMovieData] = useState(null)
    const history = useHistory()
    const { path } = useRouteMatch()

    useEffect(() => {
        if (movieData === null) {
            axios.get('https://backendexample.sanbersy.com/api/movies')
                .then(res => {
                    setMovieData(res.data.map(elm => {
                        return {
                            id: elm.id,
                            title: elm.title,
                            image_url: elm.image_url,
                            year: elm.year,
                            review: elm.review
                        }
                    }))
                })
        }
    }, [movieData])

    const detailMovie = (id) => {
        history.push(`/movie-content/detail/${id}`)
    }

    return (
        <Switch>
            <Route exact path={path}>
                <Container style={{ marginTop: 30, marginBottom: 30, minHeight: 585 }}>
                    <Grid container spacing={2} justify="space-around">
                        {movieData !== null && movieData.sort((a, b) => {
                            return (b.id - a.id)
                        }).map(elm => {
                            return (
                                <Grid key={elm.id} item xs={12} md={4}>
                                    <Card className={classes.gridArea}>
                                        <Typography variant='h6' noWrap={true}>
                                            {elm.title}
                                        </Typography>
                                        <Typography variant='subtitle1'>
                                            {elm.year}
                                        </Typography>
                                        <CardMedia
                                            className={classes.image}
                                            image={elm.image_url}
                                            title={elm.title}
                                        />
                                        <CardContent>

                                            <Typography gutterBottom variant="body2" color="textSecondary" noWrap>
                                                {elm.review}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => detailMovie(elm.id)}>Detail</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container >
            </Route>
            <Route path={`${path}/detail/:id`}>
                <DetailMovie />
            </Route>
        </Switch>
    )
}

export default MovieHome
