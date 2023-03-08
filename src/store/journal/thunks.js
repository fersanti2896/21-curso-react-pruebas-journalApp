import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setImagesToActiveNotes, setSaving, updateNote } from './';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        dispatch( savingNewNote() );
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        /* Guardando la nota en Firebase */
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startSaveNot = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        const noteToFireStore = { ...note };

        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( updateNote( note ) );
    }
}

export const startLoadingFles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photoUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setImagesToActiveNotes( photoUrls ) );
    }
}

export const startDeleteNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );
    }
}