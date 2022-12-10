Rutas a crear:
IMPORTANTE, PROCUREN TRABAJAR SIEMPRE EN UNA RAMA APARTE DE DEVELOP, DE LO CONTRARIO NO APARECE EL MERGE REQUEST
De momento tenemos estas rutas, si se agregan más o si alguna es obsoleta, avisar en el chat para estar todos en la misma linea

rutas de Back

/create:{
    get: {
        funcionalidad: trae todos los post,
        requiere: no requiere nada, pero se le puede pasar por body {text, type}
    },
    post: {
        funcionalidad: crea un post,
        requiere: un {multimedia} (imagen) o {text}
    }
}
/category:{
    get:{
        funcionalidad: trae todas las categorias,
        requiere: nada
    },
    post:{
        funcionalidad: añade una categoria,
        requeriere: {text} por body,
    },
    delete:{
        funcionalidad: elimina una categoria por id,
        requeriere: un {id} y opcional {deleteMany, category} para eliminar varios
    }
    put:{
        funcionalidad: remplaza una categoria,
        requeriere: un {id} y un {text}
    }

}
asdasd
