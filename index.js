require('dotenv').config();
require('colors');
const{
    readInput, 
    pause, 
    inquirerMenu,
    listarLugares
 }  = require('./helpers/inquirer');
 const Busquedas = require('./models/busquedas');
 const {capitilize, allCapital} = require('./helpers/bundle');
 


 const main = async() => {

    const busqueddas = new Busquedas();

    let opt;
    
    do {
        console.clear();
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                console.log('Buscar Ciudad'.cyan.bgRed);
                //Mostart Mensaje
                const lugar = await readInput('Que ciudad desea buscar: ');

                //Buscar los lugares
                const results = await busqueddas.ciudad(lugar);

                //seleccionar el lungar
                const lugarIst = await listarLugares(results);
                if(lugarIst === '0') continue;

                //const selciondado = results.filter(v => v.id === lugarIst);
                const selciondado = results.find(v => v.id === lugarIst);
                
                busqueddas.addHistory(selciondado.lugar);
                
                //clima
                const elClima = await busqueddas.clima(selciondado.lat,selciondado.lng);

                //ver serultados


                console.log(`\nInformacion de la Ciudad\n`.green);
                console.log(`Ciudad: `.green, selciondado.lugar.red);
                console.log(`Lat: `.green, selciondado.lat);
                console.log(`Lng: `.green, selciondado.lng);
                console.log(`Temperatura: `.green,elClima.main.temp);
                console.log(`Minima: `.green,elClima.main.temp_min);
                console.log(`Maxima: `.green,elClima.main.temp_max);
                console.log(`Presion: `.green,elClima.main.pressure);
                console.log(`Humedad: `.green,elClima.main.humidity);
                console.log(`Como esta el Clima: `.green, capitilize(elClima.weather[0].description));


                break;
            case 2:
                console.log('Historial de busqueda'.blue.bgRed);
                busqueddas.historial.forEach( (p,i) => {
                    console.log(`${((i+1)+'.').green} ${allCapital(p).yellow}`);
                });
                
                break;
            case 0:
                console.log('Salir'.bgCyan.bgRed);
                break;
            default:
                console.log('opcion no validad'.bgCyan.bgRed);
                break;
        }
        await pause();
    } while (opt !== 0);
    console.clear();
 }


 main();