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
                //Mostart Mensaje                
                console.log('Buscar Ciudad'.cyan.bgRed);
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
                console.log(`Temperatura: `.green,elClima.temp);
                console.log(`Minima: `.green,elClima.temp_min);
                console.log(`Maxima: `.green,elClima.temp_max);
                console.log(`Presion: `.green,elClima.pressure);
                console.log(`Humedad: `.green,elClima.humidity);
                console.log(`Como esta el Clima: `.green, capitilize(elClima.description));

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
                console.log('Opcion no validad'.bgCyan.bgRed);
                break;
        }
        await pause();
    } while (opt !== 0);
    console.clear();
 }


 main();