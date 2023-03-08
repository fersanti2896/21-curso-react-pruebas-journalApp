import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../helpers';

cloudinary.config({
    cloud_name: 'cursos-udemy-front',
    api_key: '134343836575148',
    api_secret: 'kYnRM7Z6HtC0rT9ErcdApDkQQpg',
    secure: true
})

describe('Pruebas en fileUpload.', () => { 
    test('Debe de subir el archivo correctamente a cloudinary.', async() => { 
        const imageUrl = 'https://dc722jrlp2zu8.cloudfront.net/media/featured_images/que-es-javaScript.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File( [blob],'foto.jpg' );
        
        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        /* Se realiza limpieza de la imagen subida a cloudinary para no generar peso (MB) en el servidor */
        const segmentes = url.split('/');
        const imageId = segmentes[ segmentes.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });
    });

    test('Debe de retornar null si no se sube la imagen.', async() => { 
        const file = new File( [],'foto.jpg' );
        
        const url = await fileUpload( file );
        expect( url ).toBe(null);
    });
});