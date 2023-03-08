import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        }
        ,
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        setImagesToActiveNotes: ( state, action ) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            } );

            state.messageSaved = `${ action.payload.title } actualizado correctamente.` 
        },
        deleteNoteById: ( state, action ) => {
            state.notes = state.notes.filter( note => note.id !== action.payload );
            state.messageSaved = 'Nota eliminada correctamente.';
            state.active = null;
        }
    }
});

// Action creators are generated for each case reducer function
export const { addNewEmptyNote,
               clearNotesLogout,
               setActiveNote, 
               setNotes, 
               setSaving, 
               savingNewNote,
               setImagesToActiveNotes,
               updateNote,
               deleteNoteById } = journalSlice.actions;