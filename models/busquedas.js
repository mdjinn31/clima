const axios = require('axios');
const{ readData, saveData } = require('../helpers/files');

class Busquedas {

    historial = [];

    constructor(){
        //TODO: leer db si existe
        this.readFromDB();
    }

    _objToArray( ojb = {}){
        const listado = [];
        Object.keys(ojb).forEach( key => listado.push(ojb[key]));
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
            const {main, weather} = res.data;
            return{
                'temp':main.temp,
                'temp_min':main.temp_min,
                'temp_max':main.temp_max,
                'pressure':main.pressure,
                'humidity':main.humidity,
                'description':weather[0].description
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    addHistory ( place = ''){
        // *Prevenir Duplicados
        if(this.historial.includes(place.toLocaleLowerCase())) return;

        this.historial = this.historial.splice(0,5);

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

