const axios = require('axios');
const{ readData, saveData } = require('../helpers/files');

class Busquedas {

    historial = [];

    _results = {};

    constructor(){
        //TODO: leer db si existe
        this.readFromDB();
    }

    _objToArray( ojb = {}){
        const listado = [];
        Object.keys(ojb).forEach( key => listado.push(ojb[key]));
        return listado;        
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._results).forEach( key => listado.push(this._results[key]));
        return listado;
    }
 
    get mapBoxParams(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }

    get openWheaterPArams(){
        return{
            'appid': process.env.OPENWHEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    //Modelo
    async ciudad(lugar = '') {
        try {
            const mapInstance = axios.create({
                baseURL: `${ process.env.MAPBOX_URL}/${ lugar }.json`,
                params: this.mapBoxParams
            });
            const res = await mapInstance.get();        
            return this._objToArray(res.data.features.map( v => {
                return {id: v.id, 
                        lugar: v.place_name_es, 
                        lat: v.center[0], 
                        lng: v.center[1]
                    };
            }));
        } catch (error) {
            return [];
        }
    }

    async clima(lat = '', lng = ''){
        try {
            const weatherInstance = axios.create({
                baseURL: `${process.env.OPENWHEATHER_URL}`,
                params: {
                    'lat': lng,
                    'lon': lat,
                    ...this.openWheaterPArams
                }
            });
            const res = await weatherInstance.get();    
            return res.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    addHistory ( place = ''){
        //TODO 
        // *Prevenir Duplicados
        if(this.historial.includes(place.toLocaleLowerCase())) return;

        // *Save history
        this.historial.unshift(place.toLocaleLowerCase());
        this.saveInDB();
    }

    saveInDB(){
        saveData(this.historial);
    }

    readFromDB(){
        this.historial = readData();
    }


}

module.exports = Busquedas;

