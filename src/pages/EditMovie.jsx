import React, { useState, useEffect } from 'react'
import { TextField, Container, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useParams, Redirect } from 'react-router-dom'

const useStyle = makeStyles({
    formStyle: {
        paddingTop: 30,
        paddingBottom: 50
    },
    inputForm: {
        maxWidth: 700,
        minHeight: 520
    }
})

const EditMovie = () => {
    const classes = useStyle()
    const [inputUser, setInputUser] = useState({ title: '', rating: '', description: '', genre: '', year: '', review: '', image_url: '', duration: '' })
    const idEdit = parseInt(useParams().id)
    const dataDummy = null
    const [isUpdate, setIsUpdate] = useState(false)


    useEffect(() => {
        if (dataDummy === null) {
            axios.get('https://backendexample.sanbersy.com/api/movies')
                .then(res => {
                    const dataEdit = res.data.find(elm => elm.id === idEdit)
                    const { title, rating, description, genre, year, review, image_url, duration } = dataEdit
                    setInputUser({
                        title,
                        rating,
                        description,
                        genre,
                        year,
                        review,
                        image_url,
                        duration
                    })
                })
        }
    }, [idEdit])


    const handleChange = (event) => {
        switch (event.target.name) {
            case "title": {
                setInputUser({ ...inputUser, title: event.target.value })
                break
            }
            case "rating": {
                setInputUser({ ...inputUser, rating: parseInt(event.target.value) })
                break
            }
            case "description": {
                setInputUser({ ...inputUser, description: event.target.value })
                break
            }
            case "genre": {
                setInputUser({ ...inputUser, genre: event.target.value })
                break
            }
            case "year": {
                setInputUser({ ...inputUser, year: parseInt(event.target.value) })
                break
            }
            case "review": {
                setInputUser({ ...inputUser, review: event.target.value })
                break
            }
            case "image_url": {
                setInputUser({ ...inputUser, image_url: event.target.value })
                break
            }
            case "duration": {
                setInputUser({ ...inputUser, duration: parseInt(event.target.value) })
                break
            }
            default: {
                break
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { title, rating, description, genre, year, review, image_url, duration } = inputUser
        axios.put(`https://backendexample.sanbersy.com/api/movies/${idEdit}`, { title, rating, description, genre, year, review, image_url, duration })
            .then(res => {
                console.log(res)
                // history.goBack()
                setIsUpdate(true)
            })
    }



    return (isUpdate ? (<Redirect to="/movie" />) : (
        <Container className={classes.formStyle}>
            <Grid container justify="center">
                <Grid item >
                    <Typography variant="h4" style={{ textAlign: 'center' }} gutterBottom>Edit Movie Data</Typography>
                    <form style={{ minWidth: 400 }} onSubmit={handleSubmit} method="post">
                        <Grid className={classes.inputForm} container alignItems="center" justify="center" spacing={3}>
                            <Grid item xs={6}><TextField fullWidth={true} autoFocus={true} id="titleID" value={inputUser.title} onChange={handleChange} name="title" label="Title" variant="outlined" /></Grid>
                            <Grid item xs={6}><TextField fullWidth={true} id="genreID" value={inputUser.genre} onChange={handleChange} name="genre" label="Genre" variant="outlined" /></Grid>
                            <Grid item xs={12}><TextField fullWidth={true} id="descriptionID" value={inputUser.description} onChange={handleChange} name="description" multiline rows={3} variant="outlined" label="Description" /></Grid>
                            <Grid item xs={4}><TextField fullWidth={true} id="ratingID" value={inputUser.rating} onChange={handleChange} name="rating" label="Rating" variant="outlined" /></Grid>
                            <Grid item xs={4}><TextField fullWidth={true} id="durationID" value={inputUser.duration} onChange={handleChange} name="duration" label="Duration" variant="outlined" /></Grid>
                            <Grid item xs={4}><TextField fullWidth={true} id="yearID" value={inputUser.year} onChange={handleChange} name="year" label="Year" variant="outlined" /></Grid>
                            <Grid item xs={6}><TextField fullWidth={true} id="reviewID" value={inputUser.review} onChange={handleChange} name="review" label="Review" variant="outlined" /></Grid>
                            <Grid item xs={6}><TextField fullWidth={true} id="image_urlID" value={inputUser.image_url} onChange={handleChange} name="image_url" label="Image URL" variant="outlined" /></Grid>
                            <Button type="Submit" color="primary" variant="contained" style={{ width: 300, textAlign: 'center' }}>Submit</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
    )
}

export default EditMovie