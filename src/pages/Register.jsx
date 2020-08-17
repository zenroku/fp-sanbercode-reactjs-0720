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

const Register = () => {
    const classes = useStyles()
    const [account, setAccount] = useState(null)
    const [input, setInput] = useState({ username: '', password1: '', password2: '' })
    const history = useHistory()
    const { setAccName, setIsLogin } = useContext(LoginContext)

    useEffect(() => {
        if (account === null) {
            axios.get(`https://backendexample.sanbersy.com/api/users`)
                .then(res => {
                    setAccount(res.data.map(elm => {
                        return {
                            username: elm.username,
                            password: elm.password
                        }
                    }))
                })
        }
    }, [account])

    const daftar = () => {
        const { username, password1, password2 } = input
        if (password1 !== password2) {
            alert(`password anda tidak cocok! masukkan kembali password yang cocok!`)
        } else {
            const filterAccount = account.find(dlogin => dlogin.username === input.username)
            if (filterAccount === undefined) {
                const password = password1
                console.log(filterAccount)
                axios.post('https://backendexample.sanbersy.com/api/users', { username, password })
                    .then(res => {
                        setAccName(res.data.username)
                        setIsLogin(true)
                        alert('akun anda sudah terdaftar! silahkan nikmati fitur web ini!')
                        history.push('/')
                    })
            } else {
                alert(`username tidak tersedia, gunakan username lain`)
            }
        }

    }

    const handleInput = (event) => {
        switch (event.target.name) {
            case "username": {
                setInput({ ...input, username: event.target.value })
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
                <Typography style={{ textAlign: 'center' }} variant="h6">Daftar Akun Baru</Typography>
                <form className={classes.loginForm}>
                    <TextField onChange={handleInput} autoFocus id="username" name="username" label="Username" style={{ margin: 20 }} />
                    <TextField onChange={handleInput} type="password" id="password1" name="password1" label="Password" style={{ margin: 20 }} />
                    <TextField onChange={handleInput} type="password" id="password2" name="password2" label="Match Password" style={{ margin: 20 }} />
                    <Button style={{ width: 100, margin: 20 }} color="primary" variant="contained" onClick={daftar}>Register</Button>
                    <Typography>sudah daftar? <Link to="/login">Login disini</Link></Typography>
                </form>
            </Paper>
        </Container >
    )
}

export default Register