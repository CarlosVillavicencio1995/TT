import Cookies from "js-cookie";

export default {


    set_usuario(data) {
        Cookies.set("usuario", JSON.stringify(data));
    },
    get_usuario_iniciado() {
        var data = JSON.parse(Cookies.get('usuario'));
        return {
            id:data.id,
            usuario : data.nombre+" "+data.apellido,
            correo: data.correo,
            cedula:data.cedula,
            administrador:data.es_administrador,
            carrera: data.es_administrador ? "Sin definir": data.estudiante[0].carrera,
            ciclo:data.es_administrador ? "Sin definir": data.estudiante[0].ciclo,
            paralelo:data.es_administrador ? "Sin definir": data.estudiante[0].paralelo,
            estudiante_id:data.es_administrador ? "Sin definir": data.estudiante[0].id,
            iniciado:true,
        }
    },
    borrar_usuario() {
        Cookies.remove('usuario')
    },
    usuario_iniciado(){
        if (Cookies.get('usuario') != undefined ) {
            return true;
        }else{
            return false;
        }
    }



};
