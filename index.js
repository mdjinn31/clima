require('colors');
const{
    readInput
 }  = require('./helpers/inquirer');


 const main = async() => {

    const text = await readInput('Ingrese un valor: ');
    console.log(text.rainbow);

 }


 main();