import { useDispatch, useSelector } from 'react-redux';
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
    const dispatch = useDispatch();
    const { isSaving, active } = useSelector( state => state.journal );

    const onNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <>
            <JournalLayout>
                { !!active ? <NoteView /> : <NothingSelectedView /> }

                <IconButton disabled={ isSaving }
                            onClick={ onNewNote }
                            size='large'
                            sx={{ backgroundColor: 'error.main', 
                                  bottom: 50,
                                  color: 'white',
                                  ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                                  position: 'fixed',
                                  right: 50 }}>
                    <AddOutlined sx={{ fontSize: 30 }}/>
                </IconButton>
            </JournalLayout>
        </>
    )
}
