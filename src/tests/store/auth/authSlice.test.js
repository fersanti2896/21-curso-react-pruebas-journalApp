import { authSlice, login, logout } from '../../../store/auth';
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => { 
    test('Debe de regresar el estado inicial y llamarse "auth".', () => { 
        const state = authSlice.reducer( initialState, {} );

        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState );
    });

    test('Debe de realizar la autenticación.', () => { 
        const state = authSlice.reducer( initialState, login( demoUser ) );
        
        expect( state ).toEqual({
            status: 'authenticated', 
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    });

    test('Debe de realizar el logout sin argumentos.', () => { 
        const state = authSlice.reducer( authenticatedState, logout() );
        
        expect( state ).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('Debe de realizar el logout con argumentos.', () => { 
        const errorMessage = 'Credenciales no son correctas.'
        const state = authSlice.reducer( notAuthenticatedState, logout({ errorMessage }) );

        expect( state ).toEqual({
            status: 'not-authenticated', 
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });
});