const { maper } = require('../../mongodb/models/validations/index.js');
const { Mapa } = require('../../mongodb/models/mapas.js');

const llenar = async () =>{
     const m = await maper();
     m.map(async (x) =>{
       await Mapa.create(x)
     });
}

module.exports ={
    createMaps : async (req, res)=>{
        try {
            const porSiBorranLaDb = await Mapa.find();
            if(!porSiBorranLaDb.length) await llenar();

            const mapas = await Mapa.find();
            
            res.status(200).json({message : 'listo', data : mapas});
        
        } catch (error) {
            res.status(400).json({message : error.message})
        }
    }
}