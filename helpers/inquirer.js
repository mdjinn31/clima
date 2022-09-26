require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que dessea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} ${'Crear Tarea'.inverse}`
            },
            {
                value: '2',
                name: `${'2.'.yellow} ${'Listar Tareas'.inverse}`
            },
            {
                value: '3',
                name: `${'3.'.yellow} ${'Listar Tareas Completadas'.inverse}`
            },
            {
                value: '4',
                name: `${'4.'.yellow} ${'Listar Tareas Pendientes'.inverse}`
            },
            {
                value: '5',
                name: `${'5.'.yellow} ${'Completar Tarea(s)'.inverse}`
            },
            {
                value: '6',
                name: `${'6.'.yellow} ${'Borrar Tarea'.inverse}`
            },
            {
                value: '0',
                name: `${'0.'.yellow} ${'Salir'.inverse}`
            }
        ]
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opcion  '.yellow.bold);
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pause = async() => {
    console.log('\n');
    await inquirer.prompt( {
        type: 'input',
        name: 'enter',
        message: `Precione ${'ENTER'.green.bold} para continuar`,
      });
}

const readInput = async(message = '') => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const deleteTaskMenu = async(tareas = []) => {

    const choices = tareas.map( (v,k) => {
        return ({value: v.id, name: `${((k+1)+'. ').green} ${v.desc} :: ${(v.completadoEn)?'Completada'.green : 'Pendiente'.red}`});
    });

    choices.unshift({value: '0', name: '0. '.green + ' Canselar'});

    const taskList = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione tarea a borrar',
            choices
        }
    ];    

    console.clear();
    console.log('=========================='.green);
    console.log('  Lista de Tareas  '.yellow.bold);
    console.log('==========================\n'.green);
    const { id } = await inquirer.prompt(taskList);
    return id;
}

const completeTaskMenu = async(tareas = []) => {

    const choices = tareas.map( (v,k) => {
        return ({value: v.id, name: `${((k+1)+'. ').green} ${v.desc} :: ${(v.completadoEn)?'Completada'.green : 'Pendiente'.red}`, checked: (v.completadoEn)? true : false});
    });

    const taskList = [
        {
            type: 'checkbox',
            name: 'tasks',
            message: 'Seleccione tarea a borrar',
            choices
        }
    ];    

    console.clear();
    console.log('=========================='.green);
    console.log('  Lista de Tareas  '.yellow.bold);
    console.log('==========================\n'.green);
    const { tasks } = await inquirer.prompt(taskList);
    return tasks;
}

const confirm = async(message) => {
 
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports ={
    inquirerMenu,
    pause,
    readInput,
    deleteTaskMenu,
    confirm,
    completeTaskMenu
}