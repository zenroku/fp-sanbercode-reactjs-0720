import React, { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLogin } = useContext(LoginContext)

    return (
        <Route {...rest} component={(props) => (
            isLogin ? (
                <Component {...props} />
            ) : (
                    <Redirect exact to="/login" />
                )
        )} />
    )
}

export default PrivateRoute