require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que dessea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.yellow} ${'Buscar Ciudad'.inverse}`
            },
            {
                value: 2,
                name: `${'2.'.yellow} ${'Historial de Busqueda'.inverse}`
            },
            {
                value: 0,
                name: `${'0.'.yellow} ${'Salir'.inverse}`
            },
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

const listarLugares = async(lugares = []) => {
    
    const choices = lugares.map( (v,k) => {
        return ({
            value: v.id, 
            name: `${((k+1)+'. '+ v.lugar).green}` 
            
        });
    });

    choices.unshift({value: '0', name: '0. '.green + ' Canselar'});

    const placesList = [
        {
            type: 'list',
            name: 'place',
            message: 'Seleccione Lugar: ',
            choices
        }
    ];    

    console.clear();
    console.log('=========================='.green);
    console.log('  Lista de Lugares  '.yellow.bold);
    console.log('==========================\n'.green);
    const { place } = await inquirer.prompt(placesList);
    return place;
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
    confirm,
    listarLugares
}