
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

//  1. Agrega un endpoint '/api/' que responda a una petición de tipo 
//GET con un código de estado 200 y el siguiente json: { 'mensaje':'hola mundo' }

app.get('/api/', (req, res) => {
  res.status(200).json({ mensaje: 'hola mundo' });
});

// 2.Agrega un endpoint '/api/suma' que responda a una petición de tipo GET con la suma de dos números que reciba mediante las querys num1 y num2. 
// El servidor debe responder con un código de estado 200 y un json como el siguiente: { 'resultado': 7 }
app.get('/api/suma', (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  const resultado = num1 + num2;
  res.status(200).json({ resultado });
});

// 3. Agrega un endpoint '/api/usuario/' que responda a una petición de tipo GET con el nombre que sea recibido a través de params. 
//El servidor debe responder con un código de estado 200 y un json como este: { 'usuario': 'Edwin' }


app.get('/api/usuario/:nombre', (req, res) => {
  const nombre = req.params.nombre;

  if (!nombre) {
    return res.status(400).json({ error: 'El parámetro nombre es requerido.' });
  }

  const respuesta = { usuario: nombre };
  res.status(200).json(respuesta);
});

//app.listen(port, () => {
 // console.log(`Servidor escuchando en el puerto ${port}`);
//});

// Agrega un endpoint '/api/swapi' que responda a una petición de tipo GET con el personaje solicitado de https://swapi.dev/. 
//El cliente debe mandar el número de personaje mediante params. 
// La respuesta del servidor debe lucir algo así { 'personaje': { 'name': 'Luke Skywalker', ..., } }
app.get('/api/swapi', async (req, res) => {
  const numPersonaje = req.query.num;
  const swapiURL = `https://swapi.dev/api/people/${numPersonaje}/`;

  try {
    const response = await fetch(swapiURL);
    const data = await response.json();
    res.status(200).json({ personaje: data });
  } catch (error) {
    res.status(500).json({ error: 'Error en la solicitud a SWAPI' });
  }
});

// Endpoint 5: Agrega un endpoint '/api/body que responda a una petición de tipo PUT con el body que el cliente envíe al hacer la petición.
// Ejemplo: cliente envía un body desde postman o insomnia que luce como este: { “nombre”: “Maui”, “ocupacion”: “Sensei” } 
 // Entonces, el servidor debe responder con un objeto idéntico al que envía el cliente, junto con un status de respuesta 200.

app.put('/api/body', (req, res) => {
  const bodyData = req.body;
  res.status(200).json(bodyData);
});

//--6. Vuelve a hacer el ejercicio 2 pero enviando num1 y num2 desde el body, 
//a través de una petición POST que responda con el status 200

app.post('/api/sum', (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const resultado = num1 + num2;
  res.status(200).json({ resultado });
});

// Endpoint 7: Crea un endpoint para una petición de tipo DELETE donde envíes un ID (un número cualquiera) a través de params. 
// Si el param contiene el ID 3, entonces responde con un status 200 y el mensaje “se ha eliminado el objeto con ID 3”, 
//de lo contrario, si envían cualquier otro número como ID, responde con un status 404 y el mensaje 
// “No se encontró el objeto con el ID especificado”.

app.delete('/api/eliminar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 3) {
    res.status(200).json({ mensaje: `Se ha eliminado el objeto con ID ${id}` });
  } else {
    res.status(404).json({ mensaje: `No se encontró el objeto con el ID especificado` });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});