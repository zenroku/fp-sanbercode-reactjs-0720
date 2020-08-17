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
import DetailGame from './DetailGame'

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
    const [gameData, setGameData] = useState(null)
    const history = useHistory()
    const { path } = useRouteMatch()

    useEffect(() => {
        if (gameData === null) {
            axios.get('https://backendexample.sanbersy.com/api/games')
                .then(res => {
                    setGameData(res.data.map(elm => {
                        return {
                            id: elm.id,
                            name: elm.name,
                            image_url: elm.image_url,
                            platform: elm.platform,
                        }
                    }))
                })
        }
    }, [gameData])

    const detailMovie = (id) => {
        history.push(`/game-content/detail/${id}`)
    }

    return (
        <Switch>
            <Route exact path={path}>
                <Container style={{ marginTop: 30, marginBottom: 30, minHeight: 585 }}>
                    <Grid container spacing={2} justify="space-around">
                        {gameData !== null && gameData.sort((a, b) => {
                            return (b.id - a.id)
                        }).map(elm => {
                            return (
                                <Grid key={elm.id} item xs={12} md={4}>
                                    <Card className={classes.gridArea}>
                                        <Typography variant='h6' noWrap={true}>
                                            {elm.name}
                                        </Typography>
                                        <Typography variant='subtitle1' noWrap>
                                            {elm.platform}
                                        </Typography>
                                        <CardMedia
                                            className={classes.image}
                                            image={elm.image_url}
                                            title={elm.name}
                                        />
                                        <CardContent>

                                            <Typography gutterBottom variant="body2" color="textSecondary" noWrap>
                                                {elm.genre}
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
                <DetailGame />
            </Route>
        </Switch>
    )
}

export default MovieHome
