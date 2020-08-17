import React, { useState, useEffect } from 'react'
import { TextField, Grid, Container, TableContainer, Table, Paper, TableRow, TableCell, TableBody, TablePagination, TableHead, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import AddMovie from './AddMovie'
import EditMovie from './EditMovie'

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
    const [movieData, setMovieData] = useState(null)
    const { path } = useRouteMatch()
    const history = useHistory()
    const [q, setQ] = useState('')

    useEffect(() => {
        if (movieData === null) {
            axios.get('https://backendexample.sanbersy.com/api/movies')
                .then(res => {
                    setMovieData(res.data.map(elm => {
                        return {
                            id: elm.id,
                            created_at: elm.created_at,
                            updated_at: elm.updated_at,
                            description: elm.description,
                            title: elm.title,
                            duration: elm.duration,
                            image_url: elm.image_url,
                            rating: elm.rating,
                            genre: elm.genre,
                            year: elm.year,
                            review: elm.review
                        }
                    }))
                })
        }
    }, [movieData])

    const search = (rows) => {
        return rows.filter((row) => row.title.toLowerCase().indexOf(q) > -1)
    }

    const handleCreate = () => {
        history.push('/movie/create')
    }

    const handleDelete = (id) => {
        const idDelete = id
        const newMovie = movieData.filter((data) => data.id !== idDelete)
        axios.delete(`https://backendexample.sanbersy.com/api/movies/${idDelete}`)
            .then(() => {
                setMovieData([...newMovie])
            })
    }

    const handleEdit = (id) => {
        history.push(`/movie/edit/${id}`)
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
                        <Grid item><Typography variant="h4">Data Movie</Typography></Grid>
                        <TextField label="Search by title" autoFocus variant="filled" name="search" value={q} onChange={(e) => setQ(e.target.value)}></TextField>
                        <Grid item><Button variant="contained" onClick={handleCreate} color="primary">Create Movie</Button></Grid>
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
                                            Title
                                    </TableCell>
                                        <TableCell align='right'>
                                            Description
                                    </TableCell>
                                        <TableCell align='right'>
                                            Rating
                                    </TableCell>
                                        <TableCell align='right'>
                                            Genre
                                    </TableCell>
                                        <TableCell align='right'>
                                            Duration
                                    </TableCell>
                                        <TableCell align='right'>
                                            Year
                                    </TableCell>
                                        <TableCell align='right'>
                                            Review
                                    </TableCell>
                                        <TableCell align='right'>
                                            image URL
                                    </TableCell>
                                        <TableCell align='right'>
                                            Action
                                    </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {movieData !== null && search(movieData).sort((a, b) => {
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
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.description}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.rating}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.genre}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.duration}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.year}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {row.review}
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
                            count={movieData !== null && movieData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Container >
            </Route>
            <Route path={`${path}/create`}>
                <AddMovie />
            </Route>
            <Route path={`${path}/edit/:id`}>
                <EditMovie />
            </Route>
        </Switch>
    )
}

export default MovieData