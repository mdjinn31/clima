
require('colors');

const showMenu = () => {
    return new Promise(
        resolve => {
            console.clear();
            console.log('=========================='.green);
            console.log('  Seleccione una opcion  '.yellow.bold);
            console.log('==========================\n'.green);
            console.log(`${'1.'.green} Crear Tarea `);
            console.log(`${'2.'.green} Listar Tareas `);
            console.log(`${'3.'.green} Listar Tareas Completadas `);
            console.log(`${'4.'.green} Listar Tareas Pendientes `);
            console.log(`${'5.'.green} Completar Tarea(s) `);
            console.log(`${'6.'.green} Borrar Tarea `);
            console.log(`${'0.'.green} Salir `);
            console.log('\n');
            console.log('==========================\n'.green);
            console.log('\n');
            
            const readLine = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
            readLine.question('Selecione una opción: ', (opt) => {
                readLine.close();
                resolve(opt);
            })
        }
    )
}

const pause = () => {
    return new Promise(
        resolve => {
            const readLine = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });    
            readLine.question(`\nPrecione ${'ENTER'.green.bold} para continuar \n`, (opt) => {
                readLine.close();
                resolve();
            });
        }
    )
}

const _consoleString = (tareas = []) =>{
     tareas.map( (v,k) => {
        console.log(`${((k+1)+'. ').green} ${v.desc} :: ${(v.completadoEn)?'Completada'.green : 'Pendiente'.red}`);
    });
}

const listaDeTareas = (tareas = [], caso = 0) => {

    let titulo = "";
    let tempTasks;
    
    switch (caso) {
        case 0:
            titulo = '  Lista de Tareas  ';
            tempTasks = tareas.map(v => {return v;});
            break;
        case 1:
            titulo = '  Lista de Tareas  ';
            tempTasks = tareas.filter(v => v.completadoEn === null);
            break;
        case 2:
            titulo = 'Lista de Tareas Completadas  ';
            tempTasks = tareas.filter(v => v.completadoEn !== null);
            break;
    }

    console.clear();
    console.log('=========================='.green);
    console.log(titulo.yellow.bold);
    console.log('==========================\n'.green);
    _consoleString(tempTasks);
}


module.exports = {
    showMenu,
    pause,
    listaDeTareas
}