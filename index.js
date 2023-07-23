const fs = require('fs');

// Función para leer los datos del archivo JSON
const leerDatos = () => {
  const data = fs.readFileSync('data.json', 'utf-8');
  return JSON.parse(data);
};

// Función para guardar los datos en el archivo JSON
const guardarDatos = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Función para actualizar el estado de una tarea
const actualizarTarea = (id) => {
  const data = leerDatos();
  const tarea = data.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.completadoEn = new Date().toISOString();
    guardarDatos(data);
  }
};

// Leer los datos iniciales del archivo JSON
console.log('Datos iniciales:', leerDatos());

// Actualizar el estado de la tarea con id '1'
actualizarTarea('1');

// Leer los datos actualizados del archivo JSON
console.log('Datos actualizados:', leerDatos());
