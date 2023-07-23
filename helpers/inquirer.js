require('colors');

let inquirer = null; // Define una variable global para inquirer

// Función auxiliar para esperar a que se cargue el módulo inquirer
const waitForInquirer = () => {
  return new Promise((resolve) => {
    if (inquirer !== null) {
      resolve();
    } else {
      setTimeout(() => {
        resolve(waitForInquirer());
      }, 100);
    }
  });
};

const loadInquirer = async () => {
  inquirer = await import('inquirer'); // Use dynamic import here
};

const inquirerMenu = async () => {
  console.clear();
  console.log('====================='.green);
  console.log('Seleccione una opcion'.white);
  console.log('=====================\n'.green);

  // Esperar a que se cargue inquirer antes de usarlo
  await waitForInquirer();

  const preguntas = [
    {
      type: 'list',
      name: 'opcion',
      message: '¿Que desea hacer?',
      choices: [
        {
          value: '1',
          name: '1.'.green + 'Crear tarea'
        },
        {
          value: '2',
          name: '2.'.green + 'Listar tareas'
        },
        {
          value: '3',
          name: '3.'.green + 'Listar tareas completadas'
        },
        {
          value: '4',
          name: '4.'.green + 'Listar tareas pendientes'
        },
        {
          value: '5',
          name: '5.'.green + 'Completar tarea(s)'
        },
        {
          value: '6',
          name: '6.'.green + 'Borrar tarea'
        },
        {
          value: '0',
          name: '7.'.green + 'Salir'
        },
      ],
    },
  ];

  const { opcion } = await inquirer.default.prompt(preguntas); // Use inquirer.default.prompt

  return opcion;
};

loadInquirer(); // Cargar inquirer al inicio

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`
    }
  ];
  console.log('\n');

  // Esperar a que se cargue inquirer antes de usarlo
  await waitForInquirer();

  await inquirer.default.prompt(question);
};

const leerInput = async (mensaje) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message: mensaje,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  // Esperar a que se cargue inquirer antes de usarlo
  await waitForInquirer();

  const { desc } = await inquirer.default.prompt(question); // Usa inquirer.default.prompt

  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${ idx } ${tarea.desc }`
    }
  });

  choices.unshift({
    value:'0',
    name: '0.'.green+' Cancelar'
  })

  const preguntas = [
    {
      type: 'list', // Usa 'list' en lugar de 'lista'
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.default.prompt(preguntas);
  return id;
}

const confirmar = async (message) => {
  const question = [{
    type: 'confirm',
    name: 'ok',
    message
   }
  ];
  const {ok} = await inquirer.default.prompt(question);
  return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    
    const idx = `${i + 1}`.green;
    
    return {
      value: tarea.id,
      name: `${ idx } ${tarea.desc }`,
      checked: ( tarea.completadoEn) ? true:false
    }
  });

  const pregunta = [
    {
      type: 'checkbox', // Usa 'list' en lugar de 'lista'
      name: 'id',
      message: 'Seleccione',
      choices
    }
  ]

  const { ids } = await inquirer.default.prompt(pregunta);
  return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
};
