import React, { useState, useEffect } from 'react'
import { TextField, Grid, Container, TableContainer, Table, Paper, TableRow, TableCell, TableBody, TablePagination, TableHead, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import AddGame from './AddGame'
import EditGame from './EditGame'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    }
});

const MovieData = () => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(3)
    const [gameData, setGameData] = useState(null)
    const { path } = useRouteMatch()
    const history = useHistory()
    const [q, setQ] = useState('')
    // const [filtYear, setFiltYear] = useState({ minYear: '', maxYear: '' })

    useEffect(() => {
        if (gameData === null) {
            axios.get('https://backendexample.sanbersy.com/api/games')
                .then(res => {
                    setGameData(res.data.map(elm => {
                        return {
                            id: elm.id,
                            created_at: elm.created_at,
                            updated_at: elm.updated_at,
                            name: elm.name,
                            platform: elm.platform,
                            genre: elm.genre,
                            singlePlayer: elm.singlePlayer,
                            multiplayer: elm.multiplayer,
                            release: elm.release,
                            image_url: elm.image_url
                        }
                    }))
                })
        }
    }, [gameData])

    const search = (rows) => {
        return rows.filter((row) => row.name.toLowerCase().indexOf(q) > -1)
    }

    // const filterYear = (event) => {
    //     event.preventDefault()
    //     const filteredYear = movieData.filter(x => x.year >= filtYear.minYear && x.year <= filterYear.maxYear)
    //     setMovieData({ ...filteredYear })
    // }

    // const handleYearFilter = (event) => {
    //     switch (event.target.name) {
    //         case 'minYear': {
    //             setFiltYear({ ...filtYear, minYear: event.target.value })
    //             break
    //         }
    //         case 'maxYear': {
    //             setFiltYear({ ...filtYear, maxYear: event.target.value })
    //             break
    //         }
    //         default: {
    //             break;
    //         }
    //     }
    // }

    const handleCreate = () => {
        history.push('/game/create')
    }

    const handleDelete = (id) => {
        const idDelete = id
        const newMovie = gameData.filter((data) => data.id !== idDelete)
        axios.delete(`https://backendexample.sanbersy.com/api/games/${idDelete}`)
            .then(() => {
                setGameData([...newMovie])
            })
    }

    const handleEdit = (id) => {
        history.push(`/game/edit/${id}`)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Switch>
            <Route exact path={path}>
                <Container style={{ marginTop: 30, marginBottom: 30, minHeight: 585 }}>
                    <Grid container justify="space-between">
                        <Grid item><Typography variant="h4">Data Game</Typography></Grid>
                        <TextField label="Search by name" variant="filled" autoFocus name="search" value={q} onChange={(e) => setQ(e.target.value)}></TextField>
                        <Grid item><Button variant="contained" onClick={handleCreate} color="primary">Create Game</Button></Grid>
                    </Grid>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='right'>
                                            Id
                                    </TableCell>
                                        <TableCell align='right'>
                                            Created at
                                    </TableCell>
                                        <TableCell align='right'>
                                            Updated at
                                    </TableCell>
                                        <TableCell align='right'>
                                            Name
                                    </TableCell>
                                        <TableCell align='right'>
                                            Platform
                                    </TableCell>
                                        <TableCell align='right'>
                                            Release
                                    </TableCell>
                                        <TableCell align='right'>
                                            Multi Player
                                    </TableCell>
                                        <TableCell align='right'>
                                            Single Player
                                    </TableCell>
                                        <TableCell align='right'>

                                        </TableCell>
                                        <TableCell align='right'>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gameData !== null && search(gameData).sort((a, b) => {
                                        return (b.id - a.id)
                                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow key={row.id} hover role="checkbox">
                                                <TableCell align='right'>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.created_at}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.updated_at}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.platform}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.release}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.multiplayer}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.singlePlayer}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.image_url}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Button variant="contained" color="primary" onClick={() => handleEdit(row.id)}>Edit</Button>
                                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[3, 5, 10]}
                            component="div"
                            count={gameData !== null && gameData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                    {/* <Grid container>
                        <Grid item xs={4}>
                            <Typography>Filter by Year</Typography>
                            <form onSubmit={filterYear}>
                                <TextField onChange={handleYearFilter} id="minYear" name="minYear" type="number" label="Start from" variant="filled"></TextField>
                                <br />
                                <TextField onChange={handleYearFilter} id="maxYear" name="maxYear" type="number" label="End" variant="filled"></TextField>
                                <Button type="Submit" variant="contained" color="primary">Filter</Button>
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Filter by Duration</Typography>
                            <form>
                                <TextField id="minDuration" type="number" label="Start from" variant="filled"></TextField>
                                <br />
                                <TextField id="maxDuration" type="number" label="End" variant="filled"></TextField>
                                <Button type="Submit" variant="contained" color="primary">Filter</Button>
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Filter by Rating</Typography>
                            <form>
                                <TextField id="minRating" type="number" label="Start from" variant="filled"></TextField>
                                <br />
                                <TextField id="maxRating" type="number" label="End" variant="filled"></TextField>
                                <Button type="Submit" variant="contained" color="primary">Filter</Button>
                            </form>
                        </Grid>
                    </Grid> */}
                </Container >
            </Route>
            <Route path={`${path}/create`}>
                <AddGame />
            </Route>
            <Route path={`${path}/edit/:id`}>
                <EditGame />
            </Route>
        </Switch>
    )
}

export default MovieData