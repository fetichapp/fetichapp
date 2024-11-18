const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('./fetichapp-sdk.json'),
  storageBucket: 'fetichapp-acbfa.firebasestorage.app' // Reemplaza con tu nombre de bucket
});

// Crea un objeto de almacenamiento
const storage = new Storage({
  keyFilename: './fetichapp-sdk.json' // Reemplaza con la ruta de tu archivo de clave de cuenta de servicio
});
const bucket = storage.bucket('fetichapp-acbfa.firebasestorage.app'); // Reemplaza con tu nombre de bucket

// Función para cargar un video
async function uploadVideo(filePath, fileName) {
  try {
    
    // Crea un archivo de flujo
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'video/mp4' // Ajusta el tipo de contenido según tu video
      }
    });

    // Escribe el video en el flujo
    stream.on('error', (err) => {
      console.error('Error al cargar el video:', err);
    });

    stream.on('finish', () => {
      console.log('Video cargado exitosamente');
    });

    fs.createReadStream(filePath).pipe(stream);
  } catch (err) {
    console.error('Error al cargar el video:', err);
  }
}

// Ejemplo de uso
const filePath = 'prueba1.mp4'; // Reemplaza con la ruta de tu video
const fileName = 'my-video.mp4'; // Reemplaza con el nombre del archivo

uploadVideo(filePath, fileName);
