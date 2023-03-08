import { InfoOutlined } from '@mui/icons-material';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images = [] }) => {
    return (
        <ImageList sx={{ width: '100%', height: 500 }} 
                   cols={ 4 } 
                   rowHeight={ 200 } >
           
            {   
                images.map( (image) => (
                    <ImageListItem key={ image }>
                        <img
                            src={ `${ image }?w=248&fit=crop&auto=format` }
                            srcSet={ `${ image }?w=248&fit=crop&auto=format&dpr=2 2x` }
                            
                        />

                        <ImageListItemBar actionIcon={
                                            <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} >
                                                <InfoOutlined />
                                            </IconButton>
                                        } />
                    </ImageListItem>
                ) ) 
            }
        </ImageList>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired
}

ImageGallery.defaultProps  = {
    images: []
}