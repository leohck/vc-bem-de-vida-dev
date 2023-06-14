import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Bem Vindo!</h3>
                <p>Informe suas credenciais para acessar o sistema!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
