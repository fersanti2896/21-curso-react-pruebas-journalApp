import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSingIn, startLoginEmailPassword } from '../../store/auth';

const fromData = {
    email: '',
    password: ''
}

const formValidations = {
    email: [ ( value ) => value.includes('@'), 'El correo debe tener un @.'],
    password: [ ( value ) => value.length >= 6, 'La contraseña debe tener más de 6 caracteres.']
}

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector( state => state.auth );
    const [ formSubmitted, setFormSubmitted ] = useState( false );
    
    const { formState, email, password, onInputChange,
            isFormValid,  emailValid, passwordValid } = useForm( fromData, formValidations );  
    
    const isAuthenticating = useMemo(() => status === 'checking', [ status ]);

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted( true );

        if( !isFormValid ) return;

        dispatch( startLoginEmailPassword( formState ) );
    }

    const onGoogleSingIn = () => {
        dispatch( startGoogleSingIn() );
    }   

    return (
        <>
            <AuthLayout title='Iniciar Sesión'>
                <form   aria-label='submit-form'
                        className='animate__animated animate__fadeIn animate__faster'
                        onSubmit={ onSubmit }>
                    <Grid container>
                        <Grid item sx={{ mb: 2 }} xs={ 12 } >
                            <TextField  error={ !!emailValid && formSubmitted }
                                        label='Correo'
                                        helperText={ emailValid }
                                        name="email"
                                        placeholder='correo@google.com' 
                                        onChange={ onInputChange }
                                        type='email'
                                        value={ email }
                                        fullWidth />
                        </Grid>

                        <Grid item sx={{ mb: 2 }} xs={ 12 }>
                            <TextField  error={ !!passwordValid && formSubmitted }
                                        inputProps={{
                                            'data-testid': 'password'        
                                        }}
                                        helperText={ passwordValid }
                                        name='password' 
                                        placeholder='Contraseña'
                                        onChange={ onInputChange } 
                                        type='password'
                                        value={ password }
                                        fullWidth />
                        </Grid>

                        <Grid container spacing={ 2 } sx={{ mb: 2 }}>
                            <Grid display={ !!errorMessage ? '' : 'none' } item xs={ 12 }>
                                <Alert severity='error'>{ errorMessage }</Alert>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button disabled={ isAuthenticating }
                                        fullWidth
                                        type='submit'
                                        variant='contained'>
                                <Typography>Login</Typography>
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 6 }>      
                                <Button aria-label='google-btn'
                                        disabled={ isAuthenticating }
                                        fullWidth 
                                        onClick={ onGoogleSingIn }
                                        variant='contained'>
                                    <Google />
                                    <Typography sx={{ ml: 1 }}>Google</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Typography sx={{ mr: 1 }}>¿No tienes cuenta?</Typography>
                            <Link color='inherit' 
                                    component={ RouterLink } 
                                    to='/auth/register'>
                                Crear una cuenta
                            </Link>
                        </Grid>
                    </Grid>
                </form>
           </AuthLayout>
            
        </>
    )
}
