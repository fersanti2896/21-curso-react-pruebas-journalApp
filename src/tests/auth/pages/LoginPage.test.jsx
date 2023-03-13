import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';

import { LoginPage } from '../../../auth/pages';
import { authSlice } from '../../../store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginEmailPassword = jest.fn();

jest.mock('../../../store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSignIn,
    startLoginEmailPassword: ({ email, password }) => {
        return () => mockStartLoginEmailPassword({ email, password })
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en <LoginPage />', () => { 
    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente.', () => { 
        render( 
            <Provider  store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('Debe hacer match con el snapshot', () => { 
        const { container } = render(
            <Provider  store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect( container ).toMatchSnapshot();
    });

    test('El botón de Google debe de llamar a startGoogleSingIn.', () => { 
        // console.log(store.getState());
        
        render(
            <Provider  store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const button = screen.getByLabelText('google-btn');
        fireEvent.click( button );
        // console.log(store.getState());

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
    });

    test('Submit debe de llamar el startLoginEmailPassword.', () => { 
        const email = 'marisol@gmail.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );
        
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { password: 'password', value: password } } );
        
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginEmailPassword ).toHaveBeenCalled();
        expect( mockStartLoginEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        });
    })
});