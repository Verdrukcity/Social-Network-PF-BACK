const axios = require('axios');

function validateEmail(email){
    //chequea email valido
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return (email)
    }
    else throw new Error('Must enter a valid email')
}

function validateAge(birthdate){
    //split al string que llega
    var date = birthdate.split('')
    
    //slice para tener solo el año
    date = date.slice(11,15).join('')
    
    //paso a integer
    date = parseInt(date)
    
    //fecha actual
    let actualDate = new Date().getFullYear()
    
    //si da menor a 18 es porque es menor de edad
    if (actualDate - date < 18){
        throw new Error('Debe ser mayor de edad')
    }
    return birthdate
}

const maper = async () =>{
  const m = await axios.get('https://restcountries.com/v3/all');
  const p = m.data;
  const tiempo = p.map(x =>{
     return {
        name : x.name.common,
        image : x.flags[1],
        areacode : `${x.idd.root ? x.idd.root : "No area code"}${x.idd.suffixes ? x.idd.suffixes.length > 1 ? "" : x.idd.suffixes[0]  : ""}`
     }
  })
  return tiempo
}


module.exports = {validateEmail, validateAge, maper};