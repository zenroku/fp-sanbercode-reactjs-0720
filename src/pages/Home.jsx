import React from 'react'
import { Container, Grid, Card, Typography, CardMedia, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import TheatersIcon from '@material-ui/icons/Theaters';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: 50,
        width: 400

    },
    cover: {
        minHeight: 250,
        width: 800,
    },
    cardStyle: {
        display: 'flex'
    }
})

const Home = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <Container style={{ minHeight: 608 }} >
            <Grid container style={{ marginTop: 20 }} spacing={3}>
                <Grid item>
                    <CardActionArea onClick={() => history.push("/movie-content")}>
                        <Card className={classes.cardStyle}>
                            <div className={classes.details}>
                                <Typography component="h5" variant="h2">
                                    Movie <TheatersIcon color="primary" style={{ fontSize: 50 }} /> Gallery
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    menampilkan beberapa Film menarik!
                                </Typography>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1850&q=80"
                                title="Movie Theater"
                            />
                        </Card>
                    </CardActionArea>
                </Grid>
                <Grid item>
                    <CardActionArea onClick={() => history.push("/game-content")} >
                        <Card className={classes.cardStyle}>
                            <div className={classes.details}>
                                <Typography component="h5" variant="h2">
                                    Games <SportsEsportsIcon color="primary" style={{ fontSize: 50 }} /> Gallery
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    menampilkan beberapa Game yang seru!
                                    </Typography>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                                title="Game Console"
                            />
                        </Card>
                    </CardActionArea>
                </Grid>
            </Grid>

        </Container >
    )
}

export default Home