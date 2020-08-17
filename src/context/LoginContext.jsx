import React, { createContext, useState } from 'react'

export const LoginContext = createContext()

const LoginContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    const [accName, setAccName] = useState('')
    const [idAcc, setIdAcc] = useState(0)

    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin, accName, setAccName, idAcc, setIdAcc }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider

