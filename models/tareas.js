const Tarea = require('./tarea');
//const { listTasks, pendingListTasks,compleatedListTasks } = require('../helpers/mensajes');
const { listaDeTareas } = require('../helpers/mensajes');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => listado.push(this._listado[key]));
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    deleteTask( id = ''){
        if(this._listado[id]) delete this._listado[id];
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.map( tarea =>  this._listado[tarea.id] = tarea);
    }

    listarTareas(op = 0){
        listaDeTareas(this.listadoArr, op);
    }

    markarTareasCompletadas(tareas = []){
        tareas.map( id => {
            this._listado[id].completadoEn = (this._listado[id].completadoEn) ? null : new Date().toISOString();
        });
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

}

module.exports = Tareas;