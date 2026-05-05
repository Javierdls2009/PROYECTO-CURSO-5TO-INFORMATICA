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


/* BIBLIOTECA */

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}