import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

/* Provider para autenticarse por Google */
const googleProvider = new GoogleAuthProvider();

export const singWithGoogle = async() => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );

        /* Se obtiene las credenciales */
        // const credentials = GoogleAuthProvider.credentialFromResult( result );

        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }   
    } catch (error) {
        const errorCode    = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage
        }
    }
}

/* Provider para autenticarse por usuario y contraseña del lado de RegisterPage. */
export const registerUserWithEmail = async({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        //TODO: Actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        } 
    } catch (error) {
        return {
            ok: false,
            errorMessage: '¡Error. El correo ya está registrado!'
        }
    }
}

/* Provider para autenticar por usuario y contraseña del lado de LoginPage */
export const loginWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, displayName, photoURL } = resp.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: 'Credenciales incorrectas'
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}