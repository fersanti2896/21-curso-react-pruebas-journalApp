import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
    return (
        <>
            <Grid alignItems="center"
                  direction="column"
                  className='animate__animated animate__fadeIn animate__faster'
                  container 
                  justifyContent="center"
                  spacing={ 0 }
                  sx={{ backgroundColor: 'primary.main', borderRadius: 5, minHeight: 'calc(100vh - 110px)' }} >
                <Grid item xs={ 12 }>
                    <StarOutline sx={{ fontSize: 100, color: 'white' }} />
                </Grid> 
                
                <Grid item xs={ 12 }>
                    <Typography color='white' variant='h5'>
                        Seleccionar o crea una entrada
                    </Typography>
                </Grid> 
            </Grid>
        </>
    )
}
