import React, { useState, useEffect } from 'react'
import { TextField, Container, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useParams, Redirect } from 'react-router-dom'

const useStyle = makeStyles({
    formStyle: {
        paddingTop: 30,
        paddingBottom: 172
    },
    inputForm: {
        maxWidth: 700,
        minHeight: 400
    }
})

const EditGame = () => {
    const classes = useStyle()
    const [inputUser, setInputUser] = useState({ name: '', platform: '', release: '', genre: '', singlePlayer: '', multiplayer: '', image_url: '' })
    const idEdit = parseInt(useParams().id)
    const dataDummy = null
    const [isUpdate, setIsUpdate] = useState(false)


    useEffect(() => {
        if (dataDummy === null) {
            axios.get('https://backendexample.sanbersy.com/api/games')
                .then(res => {
                    const dataEdit = res.data.find(elm => elm.id === idEdit)
                    const { name, platform, release, genre, singlePlayer, multiplayer, image_url } = dataEdit
                    setInputUser({
                        name,
                        platform,
                        release,
                        genre,
                        singlePlayer,
                        multiplayer,
                        image_url,
                    })
                })
        }
    }, [idEdit])


    const handleChange = (event) => {
        switch (event.target.name) {
            case "name": {
                setInputUser({ ...inputUser, name: event.target.value })
                break
            }
            case "platform": {
                setInputUser({ ...inputUser, platform: event.target.value })
                break
            }
            case "release": {
                setInputUser({ ...inputUser, description: parseInt(event.target.value) })
                break
            }
            case "genre": {
                setInputUser({ ...inputUser, genre: event.target.value })
                break
            }
            case "singlePlayer": {
                setInputUser({ ...inputUser, singlePlayer: parseInt(event.target.value) })
                break
            }
            case "multiplayer": {
                setInputUser({ ...inputUser, multiplayer: parseInt(event.target.value) })
                break
            }
            case "image_url": {
                setInputUser({ ...inputUser, image_url: event.target.value })
                break
            }
            default: {
                break
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { name, platform, release, genre, singlePlayer, multiplayer, image_url } = inputUser
        axios.put(`https://backendexample.sanbersy.com/api/games/${idEdit}`, { name, platform, release, genre, singlePlayer, multiplayer, image_url })
            .then(res => {
                console.log(res)
                setIsUpdate(true)
            })
    }



    return (isUpdate ? (<Redirect to="/game" />) : (
        <Container className={classes.formStyle}>
            <Grid container justify="center">
                <Grid item >
                    <Typography variant="h4" style={{ textAlign: 'center' }} gutterBottom>Edit Game Data</Typography>
                    <form style={{ minWidth: 400 }} onSubmit={handleSubmit} method="post">
                        <Grid className={classes.inputForm} container alignItems="center" justify="center" spacing={3}>
                            <Grid item xs={6}><TextField fullWidth={true} autoFocus={true} id="nameID" value={inputUser.name} onChange={handleChange} name="name" label="Name" variant="outlined" /></Grid>
                            <Grid item xs={6}><TextField fullWidth={true} id="genreID" value={inputUser.genre} onChange={handleChange} name="genre" label="Genre" variant="outlined" /></Grid>
                            <Grid item xs={4}><TextField fullWidth={true} type="number" id="releaseID" value={inputUser.release} onChange={handleChange} name="release" label="Release" variant="outlined" /></Grid>
                            <Grid item xs={4}><TextField fullWidth={true} type="number" id="multiplayerID" value={inputUser.multiplayer} onChange={handleChange} name="multiplayer" label="Multiplayer" variant="outlined" /></Grid>
                            <Grid item xs={4}><TextField fullWidth={true} type="number" id="singlePlayerID" value={inputUser.singlePlayer} onChange={handleChange} name="singlePlayer" label="Singleplayer" variant="outlined" /></Grid>
                            <Grid item xs={6}><TextField fullWidth={true} id="platformID" value={inputUser.platform} onChange={handleChange} name="platform" label="Platform" variant="outlined" /></Grid>
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

export default EditGame