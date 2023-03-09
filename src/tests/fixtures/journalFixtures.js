
export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const newNote = {
    title: 'Este es una nueva nota de prueba',
    body: 'Es para pruebas',
    date: '1678388176513'
}

export const notesState = {
    isSaving: false,
    messageSaved: '',
    notes: [
        {
            title: 'Este es una nueva nota de prueba',
            body: 'Es para pruebas',
            date: '1678388176513'
        },
        {
            title: 'Este es una nueva nota de prueba 2',
            body: 'Es para pruebas 2',
            date: '1678388176513'
        }
    ],
    active: null
}