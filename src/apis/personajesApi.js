const URL_API = "http://localhost:3000";

const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getPersonaje = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/personaje`);
        if (respuesta.ok) {
            return await respuesta.json();
        } else {
            throw new Error(`Error ${respuesta.status}`);
        }
    } catch (error) {
        console.error("Error al obtener personajes:", error);
    }
};

const postPersonaje = async (datos) => {
    try {
        return await fetch(`${URL_API}/personaje`, { // Corregido, sin el "/${id}"
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error("Error en la solicitud POST:", error.message);
    }
};

const patchPersonaje = async (datos, id) => {
    try {
        return await fetch(`${URL_API}/personaje/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error("Error en la solicitud PATCH:", error.message);
    }
};

const deletePersonaje = async (id) => {
    try {
        return await fetch(`${URL_API}/personaje/${id}`, { // Corregido "/circuitos/" → "/personaje/"
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error("Error en la solicitud DELETE:", error.message);
    }
};

export {
    getPersonaje,
    postPersonaje,
    patchPersonaje,
    deletePersonaje
};






