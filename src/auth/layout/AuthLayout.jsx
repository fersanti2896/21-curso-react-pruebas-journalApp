import { Grid, Typography } from '@mui/material';


export const AuthLayout = ({ children, title = '' }) => {
    return (
        <>
            <Grid alignItems="center"
                  direction="column"
                  container 
                  justifyContent="center"
                  spacing={ 0 }
                  sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }} >
                    <Grid item
                          className='box-shadow'
                          xs={ 3 }
                          sx={{ backgroundColor: 'white', borderRadius:2 , padding: 4, width: { sm: 450 } }} >
                            <Typography variant='h5' sx={{ mb: 1 }}>{ title }</Typography>

                            { children }
                    </Grid>
            </Grid>
        </>
    )
}
