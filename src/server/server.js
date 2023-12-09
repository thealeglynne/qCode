const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Conexión a MongoDB (asegúrate de tener MongoDB instalado y ejecutándose)
mongoose.connect('mongodb://localhost:27017/tu_basede_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir un modelo para las citas en la base de datos
const Cita = mongoose.model('Cita', {
  dia: String,
  hora: String,
  nombre: String,
  apellido: String,
});

app.use(bodyParser.json());

// Rutas para manipular las citas
app.post('/api/citas', async (req, res) => {
  try {
    const nuevaCita = new Cita(req.body);
    await nuevaCita.save();
    res.status(201).json({ mensaje: 'Cita guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la cita:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.get('/api/citas', async (req, res) => {
  try {
    const citas = await Cita.find();
    res.status(200).json(citas);
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
