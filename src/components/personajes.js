import { postPersonaje } from "../apis/personajesApi.js";

export class Personajes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.crearPersonaje = this.crearPersonaje.bind(this); // Enlace correcto de this
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            .card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                margin: 10px;
                text-align: center;
                background-color: #f9f9f9;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            }
            img {
                max-width: 100px;
                border-radius: 8px;
            }
        </style>
    <form id="formPersonajes">
        <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" name="nombreHeroe" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Casa</label>
            <select class="form-select" name="casa" required>
                <option value="">Casa</option>
                <option value="DC">DC</option>
                <option value="MARVEL">MARVEL</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Año</label>
            <input type="number" class="form-control" name="año" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Poderes</label>
            <input type="text" class="form-control" name="poderes" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Imagen (URL)</label>
            <input type="text" class="form-control" name="imagen" required>
        </div>
        <button type="submit" class="btn btn-primary">Agregar Personaje</button>
    </form>
<div id="listaPersonajes"></div>
`;
        
        this.shadowRoot.querySelector('#formPersonajes').addEventListener('submit', this.crearPersonaje);
    }

    async crearPersonaje(event) {
        event.preventDefault();
        const form = this.shadowRoot.querySelector('#formPersonajes');
        const formData = new FormData(form);
        const datos = Object.fromEntries(formData.entries());

        // Convertir poderes en array y validar campos vacíos
        const personaje = {
            nombreHeroe: datos.nombreHeroe.trim(),
            año: parseInt(datos.año, 10),
            casa: datos.casa.trim(),
            poderes: datos.poderes.split(',').map(p => p.trim()), // Manejo de array de poderes
            imagen: datos.imagen.trim()
        };

        try {
            const response = await postPersonaje(personaje);
            if (!response.ok) throw new Error('Error al crear el personaje');

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Personaje registrado correctamente',
                timer: 1500,
                showConfirmButton: false
            });

            this.mostrarPersonaje(personaje);
            form.reset();
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo registrar el personaje'
            });
        }
    }

    mostrarPersonaje(personaje) {
        const lista = this.shadowRoot.querySelector('#listaPersonajes');
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${personaje.nombreHeroe}</h3>
            <p><strong>Casa:</strong> ${personaje.casa}</p>
            <p><strong>Año:</strong> ${personaje.año}</p>
            <p><strong>Poderes:</strong> ${personaje.poderes.join(', ')}</p>
            <img src="${personaje.imagen}" alt="${personaje.nombreHeroe}">
        `;
        lista.appendChild(card);
    }
}

customElements.define("personajes-personajes", Personajes);

