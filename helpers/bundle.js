
 const capitilize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

 const allCapital = s =>  s.split(' ').map( a => capitilize(a)).join(' ');
 
 module.exports = {
    capitilize,
    allCapital
}
