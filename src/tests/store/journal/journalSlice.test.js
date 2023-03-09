import { addNewEmptyNote, clearNotesLogout, journalSlice, setActiveNote } from "../../../store/journal";
import { initialState, newNote, notesState } from "../../fixtures/journalFixtures";

describe('Pruebas en journalSlice', () => { 
    test('Debe de retornar el estado inicial y llamarse "journal".', () => { 
        const state = journalSlice.reducer( initialState, {} );

        expect( journalSlice.name ).toBe('journal');
        expect( state ).toEqual( initialState );
    });

    test('Debe de agregar una nueva nota en addNewEmptyNote.', () => { 
        const state = journalSlice.reducer( initialState, addNewEmptyNote( newNote ) );

        expect( state ).toEqual({
            isSaving: false,
            messageSaved: '',
            notes: [ newNote ],
            active: null
        })
    });

    test('Debe de llamar clearNotesLogout para limpiar todas las notas.', () => { 
        const state = journalSlice.reducer( notesState, clearNotesLogout() );

        expect( state ).toEqual( initialState );
    });

    test('Debe de llamar setActiveNote cuando se activa una nota.', () => { 
        const state = journalSlice.reducer( initialState, setActiveNote( newNote ) );
        
        expect( state ).toEqual({
            isSaving: false,
            messageSaved: '',
            notes: [ ],
            active: newNote
        });
    });
});