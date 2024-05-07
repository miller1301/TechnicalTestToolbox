const axios = require('axios').default;
const csv = require('csv-parser');
const stream = require('stream');


const getSecretFiles = async () => {
    try {
        const response = await axios.get(`${process.env.EXTERNAL_URI}/files`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });

        return response.data;
        
    } catch (error) {
        return error.data;
    }
}

const getFileByName = async (name) => {
    try {
        const response = await axios.get(`${process.env.EXTERNAL_URI}/file/${name}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });

        return response.data;
        
    } catch (error) {
        return error.data;
    }
}

const formatCSVData = async (csvContent) => {
    return new Promise((resolve, reject) => {
        const readableStream = new stream.Readable();
        readableStream.push(csvContent);
        readableStream.push(null);
        
        let dataFormat = [];
    
        readableStream
            .pipe(csv())
            .on('data', (data)=> {
                // Verificar si la línea tiene los campos necesarios
                if(data.file && data.text && data.number && data.hex) {
                    // Convertir número a entero si es válido
                    const number = parseInt(data.number);
                    // Validar que el número es entero y el hex tiene 32 digitos
                    if(!isNaN(number) && data.hex.length == 32) {
                        dataFormat.push({
                            text: data.text,
                            number,
                            hex: data.hex
                        });
                    }
                }
    
            })
            .on('error', (error) => {
                console.error('Error al procesar el archivo CSV:', error);
            })
            .on('end', () => {
                resolve(dataFormat);
            });
            
    })

}

const getFormattedFiles = async (fileName) => {
    try {
        if( fileName ) {
            return await getSingleFile(fileName);
        }

        const response = await getSecretFiles();

        if (!response.files || response.files.length === 0) {
            return 'No hay archivos para mostrar';
        }
    
        // Formatear los archivos
        const formattedData = await Promise.all(response.files.map(async (file) => {
            const responseFile = await getFileByName(file);
            const lines = await formatCSVData(responseFile);
            return { file, lines };
        }));
        return formattedData.filter(({ lines }) => lines.length > 0);
        
    } catch (error) {
        return error.data;
    }
}

const getSingleFile = async (fileName) => {
    try {
        const formattedData = [];

        const responseFile = await getFileByName(fileName);
        const lines = await formatCSVData(responseFile);

        if( lines.length > 0 ) {
            formattedData.push({file: fileName, lines: lines })
        }
        
        return formattedData;
        
    } catch (error) {
        return error.data;
    }
}


module.exports = {
    getFormattedFiles,
    getSecretFiles
}