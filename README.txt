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
        requiere: {id}, {multimedia} y {text} por body,
    },
    delete:{
        funcionalidad: elimina una categoria por id,
        requiere: un {id} y opcional {deleteMany, category} para eliminar varios
    }
    put:{
        funcionalidad: remplaza una categoria,
        requiere: un {id} y un {text}
    }

}
/detail/:postId {
    get:{
        funcionalidad: trae el detalle de un post,
        requiere: {postId}
    }
}
/user{
    get:{
        funcionalidad: busca todos los usuarios
        requiere: nada
    }

}
/userDetail/:id{
    get: {
        funcionalidad: busca un usuario y trae todos los datos que se puedan necesitar,
        requiere: un {id} de usuario
    }
}

