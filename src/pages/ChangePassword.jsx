import React, { useEffect, useState, useContext } from 'react'
import { Container, Typography, TextField, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { LoginContext } from '../context/LoginContext'

const useStyles = makeStyles({
    containerStyle: {
        height: 528,
    },

    paperStyle: {
        margin: 'auto',
        width: 400,
        marginTop: 100
    },

    loginForm: {
        margin: 'auto',
        padding: 20,
        display: 'grid',
        width: 300,
        justifyItems: 'center'
    }
})

const ChangePassword = () => {
    const classes = useStyles()
    const [account, setAccount] = useState(null)
    const [input, setInput] = useState({ prevPass: '', password1: '', password2: '' })
    const history = useHistory()
    const { idAcc } = useContext(LoginContext)

    useEffect(() => {
        if (account === null) {
            axios.get(`https://backendexample.sanbersy.com/api/users`)
                .then(res => {
                    setAccount(res.data.map(elm => {
                        return {
                            id: elm.id,
                            username: elm.username,
                            password: elm.password
                        }
                    }))
                })
        }
    }, [account])

    const handleChangePassword = () => {
        const { prevPass, password1, password2 } = input
        const intIdAcc = parseInt(idAcc)
        const checkAccount = account.find(match => match.id === intIdAcc)
        const { password, username } = checkAccount
        if (prevPass === password && password1 !== password && password2 !== password) {
            if (password1 === password2) {
                axios.put(`https://backendexample.sanbersy.com/api/users/${intIdAcc}`, { username, password: password1 })
                    .then(() => {
                        alert('berhasil ganti password!')
                        history.push('/')
                    })
            }
        } else if (prevPass === password && password1 === password && password2 === password) {
            alert('password baru tidak boleh sama dengan password lama')
        } else if (prevPass === password && password1 !== password2) {
            alert('konfirmasi password tidak cocok')
        } else {
            alert('masukkan password lama dengan benar')
        }
    }

    const handleInput = (event) => {
        switch (event.target.name) {
            case "prevPass": {
                setInput({ ...input, prevPass: event.target.value })
                break
            }
            case "password1": {
                setInput({ ...input, password1: event.target.value })
                break
            }
            case "password2": {
                setInput({ ...input, password2: event.target.value })
                break
            }
            default: {
                break;
            }
        }
    }

    return (
        <Container className={classes.containerStyle}>
            <Paper className={classes.paperStyle}>
                <Typography style={{ textAlign: 'center' }} variant="h6">Ganti Password</Typography>
                <form className={classes.loginForm}>
                    <TextField onChange={handleInput} type="password" id="password" name="prevPass" label="Old Password" style={{ margin: 20 }} />
                    <TextField onChange={handleInput} type="password" id="password1" name="password1" label="New Password" style={{ margin: 20 }} />
                    <TextField onChange={handleInput} type="password" id="password2" name="password2" label="Match New Password" style={{ margin: 20 }} />
                    <Button style={{ width: 200, margin: 20 }} color="primary" variant="contained" onClick={handleChangePassword}>Change Password</Button>
                    <Typography>Tidak jadi? <Link to="/">Ke Home</Link></Typography>
                </form>
            </Paper>
        </Container >
    )
}

export default ChangePassword