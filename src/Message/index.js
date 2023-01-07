const express = require("express");
//// Category Messages
const Message_Create_Category = "Categoria creada correctamente.";
const Message_Error_Create_Category = "Categoria creada correctamente.";
const Message_Find_Category = "Se encontro la categoria buscada.";
const Message_Find_Categorys = "Se encontraron todas las categorias.";
const Message_Delete_Category = "Categoria eliminada correctamente.";
const Message_Delete_Categorys = "Categorias eliminadas correctamente.";
const Message_Error_Delete_Categorys = "No se suministro el id.";
const Message_Update_Categorys = "Categoria actualizada.";
const Message_Error_Update_Categorys = "Faltan los datos id o text.";
const Message_Error_Incomplete = "No se suminstraron los datos requeridos.";

////// Comentary Messages
const Message_Create_Comentary = "Se creo correctamente el commentario.";
const Message_Incomplete_Create_Comentary = "Faltan parametros.";
const Message_Error_Create_Comentary = "No existe Post al que quire comentar.";

////// Like Message
const Message_Error_No_Id = "No se reconoce el id del usuario.";
const Message_Error_Find_Like = "No se encontraron Likes en la publicacion.";
const Message__Find_Like = "Likes encontrados con exito.";
const Message_Error_Add_Like = "No se suministró el like.";
const Message_Add_Like = "Like agregado con exito.";

////// Post Messages
const Message_Find_All_Posts =
    "Se encontraron los posts disponibles con exito.";
const Message_Error_Find_All_Posts = "No se encontraron posts.";
const Message_Error_Create_Post = "No se suminstro un id.";
const Message_Create_Post = "Los datos se guardaron correctamente.";
const Message_Imcomplete_Create_Post =
    "No se suministraron los datos requeridos.";
const Message_Delete_Post = "Se elimino correctamente el Post.";
const Message_Error_Delete_Post = "No existe Post.";

////// User Messages
const Message_Error_Create_User = "Faltan parametros.";
const Message_Error_Find_User = "No existe profile con esos parametros.";
const Message_Error_Not_Minimum_Age = "No tiene la edad minima requerida.";

////// Auth user Message
const Message_Auth_User = "Usuario logueado correctamente.";
const Message_Auth_User_Default = "Usuario por defecto.";
const Message_Error_Auth_User = "Usuario no encontrado.";
const Message_Error_Auth_User_Default = "Usuario por defecto no encontrado";
const Message_Error_Auth_Password = "Conraseña incorrecta.";

////// Validation token
const Message_Error_Access = "Acceso denegado.";
const Message_Error_Validation_Token = "Token no es válido.";

////// User update
const Message_User_Update = "Usuario actualizado.";
const Message_Error_Id = "Id esta indefinido.";
const Message_Error_Username = "Username no definido.";
const Message_Error_Image_Profile = "Imagen de perfil no definida.";
const Message_Error_Password = "Contraseña no definida.";

///// Admin
const Message_Admin_Activo = "Activo.";
const Message_Admin_Inactivo = "Inactivo.";
const Message_Error_Admin = "No se encontro referencia";
module.exports = {
    Message_Create_Category,
    Message_Error_Create_Category,
    Message_Find_Category,
    Message_Find_Categorys,
    Message_Delete_Category,
    Message_Delete_Category,
    Message_Delete_Categorys,
    Message_Error_Delete_Categorys,
    Message_Update_Categorys,
    Message_Error_Update_Categorys,
    Message_Error_Incomplete,
    Message_Create_Comentary,
    Message_Incomplete_Create_Comentary,
    Message_Error_Create_Comentary,
    Message_Find_All_Posts,
    Message_Error_Find_All_Posts,
    Message_Error_Create_Post,
    Message_Create_Post,
    Message_Imcomplete_Create_Post,
    Message_Delete_Post,
    Message_Error_Delete_Post,
    Message_Error_Create_User,
    Message_Error_Find_User,
    Message_Error_Not_Minimum_Age,
    Message_Error_No_Id,
    Message_Error_Find_Like,
    Message__Find_Like,
    Message_Error_Add_Like,
    Message_Add_Like,
    Message_Auth_User,
    Message_Auth_User_Default,
    Message_Error_Auth_User,
    Message_Error_Auth_User_Default,
    Message_Error_Auth_Password,
    Message_Error_Validation_Token,
    Message_Error_Access,
    Message_User_Update,
    Message_Error_Id,
    Message_Error_Username,
    Message_Error_Image_Profile,
    Message_Error_Password,
    Message_Admin_Activo,
    Message_Admin_Inactivo,
    Message_Error_Admin
};
