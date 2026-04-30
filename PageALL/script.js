

document.addEventListener('DOMContentLoaded', () => {

    const interruptorModo = document.getElementById('selectorModo');
    const iconoTema = document.getElementById('etiquetaIcono');
    const cuerpoVentana = document.body;
    const campoBusqueda = document.getElementById('entradaBusqueda');
    const todasLasTarjetas = document.querySelectorAll('.contenedor-tarjeta');

    //                                  logica del modo oscuro
    const temaEnMemoria = localStorage.getItem('temaFavorito');
    if (temaEnMemoria === 'oscuro') {
        cuerpoVentana.classList.add('dark');
        interruptorModo.checked = true;
        iconoTema.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
    }

    interruptorModo.addEventListener('change', () => {
        if (interruptorModo.checked) {
            cuerpoVentana.classList.add('dark');
            iconoTema.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
            localStorage.setItem('temaFavorito', 'oscuro');
        } else {
            cuerpoVentana.classList.remove('dark');
            iconoTema.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
            localStorage.setItem('temaFavorito', 'claro');
        }
    });

    //                                  logica del buscador mejorada
    campoBusqueda.addEventListener('input', (evento) => {
        const palabraClave = evento.target.value.toLowerCase();

        todasLasTarjetas.forEach(contenedor => {
            const h2 = contenedor.querySelector('h2');
            const parrafo = contenedor.querySelector('p'); // colocamos esta variable para seleccionar el párrafo de subtemas
            
            if (h2 && parrafo) {
                const tituloMateria = h2.textContent.toLowerCase();
                const subtemasMateria = parrafo.textContent.toLowerCase();
                
                // aqui utilizamos la condicional para verificar si la búsqueda coincide con el título O con los subtemas
                if (tituloMateria.includes(palabraClave) || subtemasMateria.includes(palabraClave)) {
                    contenedor.style.display = 'block';
                } else {
                    contenedor.style.display = 'none';
                }
            }
        });
    });
});