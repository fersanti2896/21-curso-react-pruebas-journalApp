import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmail, singWithGoogle } from "../../firebase/providers";
import { loadNotes } from "../../helpers";
import { clearNotesLogout, setNotes } from "../journal";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSingIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        /* Se llama la función de Firebase para la autenticación con Google */
        const result = await singWithGoogle();
        
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) )
    }
}

export const startCreateUserWithPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        /* Se llama la función de Firebase para la autenticación por JournalApp */
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({ email, password, displayName });

        if( !ok ) return dispatch(logout({ errorMessage, ok }))

        dispatch( login({ uid, displayName, email, photoURL, ok }) );
    }
}

export const startLoginEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({ email, password });
        
        if( !ok ) return dispatch(logout({ errorMessage, ok }))

        dispatch( login({ uid, displayName, email, photoURL, ok }) );
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( clearNotesLogout() )
        dispatch( logout({ }) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;

        if( !uid ) throw new Error('El UID del usuario no existe.');

        const notes = await loadNotes( uid );

        dispatch( setNotes(notes) );
    }
}