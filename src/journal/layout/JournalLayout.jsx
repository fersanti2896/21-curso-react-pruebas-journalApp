import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';

const drawerWidth = 270;

export const JournalLayout = ({ children }) => {
    return (
        <>
            <Box className='animate__animated animate__fadeIn animate__faster'
                 sx={{ display: 'flex' }}>
                {/* Navbar drawerWidth*/}
                <Navbar drawerWidth={ drawerWidth } /> 

                {/* Sidebar drawerWidth*/}
                <Sidebar drawerWidth={ drawerWidth } />

                <Box component='main'
                     sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        { children }
                </Box>
            </Box>
        </>
    )
}
