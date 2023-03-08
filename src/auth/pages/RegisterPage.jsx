import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreateUserWithPassword } from '../../store/auth';

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ ( value ) => value.includes('@'), 'El correo debe tener un @.'],
    password: [ ( value ) => value.length >= 6, 'La contraseña debe tener más de 6 caracteres.'],
    displayName: [ ( value ) => value.length >= 2, 'El nombre es obligatorio.']
}

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [ formSubmitted, setFormSubmitted ] = useState( false );
    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo(() => status === 'checking', [ status ]);

    const { 
        formState, displayName, email, password, onInputChange, 
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );  

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted( true );

        if( !isFormValid ) return;

        dispatch( startCreateUserWithPassword( formState ) );
    }

    return (
        <>
            <AuthLayout title='Crear Cuenta'>
                <form className='animate__animated animate__fadeIn animate__faster'
                      onSubmit={ onSubmit }>
                    <Grid container>
                        <Grid item sx={{ mb: 2 }} xs={ 12 } >
                            <TextField  label='Nombre Completo'
                                        error={ !!displayNameValid && formSubmitted }
                                        helperText={ displayNameValid }
                                        name='displayName' 
                                        placeholder='Tu nombre' 
                                        onChange={ onInputChange }
                                        type='text'
                                        fullWidth
                                        value={ displayName } />
                        </Grid>

                        <Grid item sx={{ mb: 2 }} xs={ 12 } >
                            <TextField  label='Correo'
                                        error={ !!emailValid && formSubmitted }
                                        helperText={ emailValid }
                                        name='email' 
                                        placeholder='google@prueba.com'
                                        onChange={ onInputChange } 
                                        type='text'
                                        fullWidth 
                                        value={ email } />
                        </Grid>

                        <Grid item sx={{ mb: 2 }} xs={ 12 }>
                            <TextField  label='Contraseña'
                                        error={ !!passwordValid && formSubmitted }
                                        helperText={ passwordValid }
                                        name='password'
                                        placeholder='Contraseña'
                                        onChange={ onInputChange } 
                                        type='password'
                                        fullWidth
                                        value={ password } />
                        </Grid>

                        <Grid container spacing={ 2 } sx={{ mb: 2 }}>
                            <Grid display={ !!errorMessage ? '' : 'none' } item xs={ 12 }>
                                <Alert severity='error'>{ errorMessage }</Alert>
                            </Grid>

                            <Grid item xs={ 12 }>
                                <Button disabled={ isCheckingAuthentication }
                                        fullWidth 
                                        type='submit'
                                        variant='contained'>
                                <Typography>Crear Cuenta</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                            <Link   color='inherit' 
                                    component={ RouterLink } 
                                    to='/auth/login'>
                                Ingresar
                            </Link>
                        </Grid>
                    </Grid>
                </form>
           </AuthLayout>
            
        </>
    )
}
