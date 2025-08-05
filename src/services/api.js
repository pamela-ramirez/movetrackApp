const BASE_URL = "https://movetrack.develotion.com";

const login = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login.php`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          password: password,
        }),
      });
      if (response.status == 200) {
        return response.json();
      } else {
        return Promise.reject("Usuario y/o contraseña incorrectos");
      }
    } catch (error) {
      return Promise.reject("Ha ocurrido un error");
    }
  };

  const obtenerPaises = () => {
    return fetch(BASE_URL+"/paises.php")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al obtener los países");
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (datos.codigo !== 200 || !datos.paises) {
          throw new Error("Formato de respuesta incorrecto");
        }
        return datos.paises.map((pais) => ({
          nombre: pais.name,
          id: pais.id, //el ID como clave
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
        return [];
      });
  };

  const registrar = async (user, pass, idPais) => {
    const response = await fetch(`${BASE_URL}/usuarios.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: user,
        password: pass,
        idPais: idPais,
      }),
    });
   
    if (!response.ok) {
      throw new Error("Ha ocurrido un error en el registro");
    }
   
    return response.json();
  };


  const obtenerRegistros = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/registros.php?idUsuario=${userData.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apiKey": userData.apiKey,
          "idUser" : userData.id, 
        },
      });
   
      if (!response.ok) {
        throw new Error("Error al obtener los registros");
      }
   
      const data = await response.json(); 
   
      return data.registros || []; 
   
    } catch (error) {
      console.error("Error:", error.message);
      return [];
    }
  };

  const eliminarRegistro = async (idRegistro, userData) => {
    try {
      const response = await fetch(`${BASE_URL}/registros.php?idRegistro=${idRegistro}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "apiKey": userData.apiKey,
          "idUser": userData.id,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar el registro");
      }
      return true; 
  
    } catch (error) {
      console.error("Error al eliminar el registro:", error.message);
      return false; 
    }
  };

  const obtenerActividades = (userData) => {
    return fetch(`${BASE_URL}/actividades.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apiKey": userData.apiKey,
        "idUser": userData.id,
      },
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al obtener las actividades");
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (datos.codigo !== 200 || !Array.isArray(datos.actividades)) {
          throw new Error("Formato de respuesta incorrecto");
        }
        return datos.actividades.map((actividad) => ({
          id: actividad.id,
          nombre: actividad.nombre,
          imagen : actividad.imagen
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
        return []; 
      });
  };
  

  
  const agregarRegistro = (idActividad, tiempo, fecha, userData) => {
    return fetch(`${BASE_URL}/registros.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": userData.apiKey,
        "idUser": userData.id,
      },
      body: JSON.stringify({
        idActividad: idActividad,
        idUsuario : userData.id,
        tiempo: tiempo,
        fecha: fecha,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Error al agregar el registro");
        }
        return response.json();
        
      })
      .then((data) => {
        const registroConDatos = {
          id: data.idRegistro,
          idActividad: idActividad,
          idUsuario : userData.id,
          tiempo: tiempo,
          fecha: fecha,
          mensaje: data.mensaje,
          codigo: data.codigo,
        };
  
        console.log("Respuesta de la API al agregar un registro:", registroConDatos);
        return registroConDatos;
      })
      .catch(() => {
        return Promise.reject("Ha ocurrido un error");
      });
  };


  export {login, obtenerPaises, registrar, obtenerRegistros, eliminarRegistro, obtenerActividades, agregarRegistro};
   