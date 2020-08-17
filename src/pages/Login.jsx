import React, { useEffect, useState, useContext } from 'react'
import { Container, Typography, TextField, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
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

const Login = () => {
    const classes = useStyles()
    const [account, setAccount] = useState(null)
    const [input, setInput] = useState({ username: '', password: '' })
    const { setIsLogin, setAccName, setIdAcc } = useContext(LoginContext)
    const history = useHistory()

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

    const Login = () => {
        const findAccount = account.find(dlogin => dlogin.username === input.username && dlogin.password === input.password)
        if (findAccount !== undefined) {
            setIsLogin(true)
            setAccName(findAccount.username)
            setIdAcc(findAccount.id)
            alert(`Berhasil Login ! Selamat Datang ${findAccount.username} `)
            history.push('/')
        } else {
            alert(`account tidak ditemukan`)
        }
    }

    const handleInput = (event) => {
        switch (event.target.name) {
            case "username": {
                setInput({ ...input, username: event.target.value })
                break
            }
            case "password": {
                setInput({ ...input, password: event.target.value })
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
                <Typography style={{ textAlign: 'center' }} variant="h6">Masuk</Typography>
                <form className={classes.loginForm}>
                    <TextField onChange={handleInput} autoFocus id="username" name="username" label="Username" style={{ margin: 20 }} />
                    <TextField onChange={handleInput} type="password" id="password" name="password" label="Password" style={{ margin: 20 }} />
                    <Button style={{ width: 100, margin: 20 }} color="primary" variant="contained" onClick={Login}>Login</Button>
                    <Typography>belum daftar? <Link to='/register'>Daftar disini</Link></Typography>
                </form>
            </Paper>
        </Container >
    )
}

export default Login