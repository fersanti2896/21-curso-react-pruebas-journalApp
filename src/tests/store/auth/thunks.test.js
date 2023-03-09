import { async } from '@firebase/util';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmail, singWithGoogle } from '../../../firebase/providers';
import { checkingAuthentication, checkingCredentials, login, logout, startCreateUserWithPassword, startGoogleSingIn, startLoginEmailPassword, startLogout } from '../../../store/auth';
import { clearNotesLogout } from '../../../store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../firebase/providers')

describe('Pruebas en thunks de auth.', () => { 
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('checkingAuthentication debe de invocar el checkingCredentials.', async() => { 
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSingIn debe de invocar el checkingCredentials y el login.', async() => { 
        const loginData = {
            ok: true,
            ...demoUser
        }

        await singWithGoogle.mockResolvedValue( loginData );

        /* Llamamos al thunk */
        await startGoogleSingIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSingIn debe de invocar el checkingCredentials y el logout con mensaje de error.', async() => { 
        const loginData = {
            ok: false,
            errorMessage: 'Error en Google'
        }

        await singWithGoogle.mockResolvedValue( loginData );

        /* Llamamos al thunk */
        await startGoogleSingIn()( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startCreateUserWithPassword debe de llamar el checkingCredentials y el login.', async() => { 
        const loginData = { ok: true, ...demoUser };
        const formData = { 
            displayName: demoUser.displayName, 
            email: demoUser.email, 
            password: '123456'
        };

        await registerUserWithEmail.mockResolvedValue( loginData );

        /* Llamamos al thunk */
        await startCreateUserWithPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login({ ...loginData }) );
    });

    test('startCreateUserWithPassword debe de llamar el checkingCredentials y el logout con mensaje de error.', async() => { 
        const loginData = { ok: false, errorMessage: 'Error, no se pudo crear al usuario.' };
        const formData = { 
            displayName: demoUser.displayName, 
            email: demoUser.email, 
            password: '123456'
        };

        await registerUserWithEmail.mockResolvedValue( loginData );

        /* Llamamos al thunk */
        await startCreateUserWithPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('startLoginEmailPassword debe de llamar el checkingCredentials y el login.', async() => { 
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        /* Llamamos al thunk */
        await startLoginEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login({ ...loginData }) );
    });

    test('startLoginEmailPassword debe de llamar el checkingCredentials y el logout con mensaje de error.', async() => { 
        const loginData = { ok: false, errorMessage: 'Error, credenciales inválidas.' };
        const formData = { email: demoUser.email, password: '123456' };
        
        await loginWithEmailPassword.mockResolvedValue( loginData );

        /* Llamamos al thunk */
        await startLoginEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData) );
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 
        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ }) );
    });
});