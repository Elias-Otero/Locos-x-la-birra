//variables
const carrito = document.querySelector('#carrito');
const abrirCarrito = document.querySelector('#img-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const buscar = document.querySelector('.submit-buscador');
const buscadorInput = document.querySelector('#buscador');
const body = document.querySelector('body');
const cerrarCarrito = document.querySelector('.abrir');

let articulosCarritos = [];

cargarEvenListener();

function cargarEvenListener() {

    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click',eliminarCurso);
    vaciarCarrito.addEventListener('click',()=>{
        articulosCarritos = [],
        limpiarHTML();
    });
    buscar.addEventListener('click',(e)=>{
        e.preventDefault();
        alert(buscadorInput.value);
        buscadorInput.value='';
    });
 
    abrirCarrito.addEventListener('click',(e)=>{
        
        if(carrito.classList.contains('abrir') ){
            carrito.classList.remove('abrir');
        }else{
            carrito.classList.add('abrir');

        }});
        cerrarCarrito.addEventListener('mouseleave',() => carrito.classList.remove('abrir'));
    

    
    document.addEventListener('DOMContentLoaded',() =>{

    articulosCarritos = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML();
});
    
}



function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) { // devuelve un true o false
        const CursoSelecionado = e.target.parentElement.parentElement;
        leerDatoCurso(CursoSelecionado);
    }
}
function leerDatoCurso(curso) {
    
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
    
    if (existe) {
        
        const cursos = articulosCarritos.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarritos = [...cursos];
    } else {
        
        articulosCarritos = [...articulosCarritos, infoCurso];
    }
    
    carritoHTML();
}

function carritoHTML() {
    
    limpiarHTML(); 

    
    articulosCarritos.forEach(curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id } = curso;
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</d>
        <td>${precio}</td>
        <td class="cantidad" type="number">${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> x </td>
        `;
        
        contenedorCarrito.appendChild(row);
    });
    sincronizarLocalStorage();
}

function sincronizarLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarritos));
}

function eliminarCurso(e){
    const cursoId = e.target.getAttribute('data-id') ;
     if(cursoId){ 

        const contador =e.target.parentElement.parentElement.children[3].textContent;
        console.log(e.target.parentElement.parentElement.children[3].textContent);
   
    if( contador > 1){ 
        
        console.log(idCarrito(e));
         const cursoss = articulosCarritos.map(curso => { 
            if (curso.id === idCarrito(e)) {
                curso.cantidad--;
                return curso;
            }else {
                return curso;
            }
        });
        articulosCarritos = [...cursoss];
        carritoHTML(); 
        
    }else if(contador <= 1){
    articulosCarritos = articulosCarritos.filter(curso => curso.id !== idCarrito(e) );
    carritoHTML();
    }   
}
    
}

function idCarrito(e){
    const id = e.target.getAttribute('data-id');
    return id;
}

function limpiarHTML() {
    
    
     while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    } 
    sincronizarLocalStorage();
}

function clickBoton(){
    $(".u-full-width").click(function () {
        $(`#accionBoton`).html(`<p>Producto Agregado</p>`);
        $(`#accionBoton`).css(`background`, `green`);
        $(`#accionBoton`).fadeOut(3500, function(){
            $(`#accionBoton`).html(`<p>Agregar Al Carrito</p>`);
            $(`#accionBoton`).fadeIn(2000) ;
            $(`#accionBoton`).css(`background`, `#33C3F0`)
        })    
    })
}


btnSwal.onclick=()=>{
    Swal.fire(
    { 
    title: 'Bienvenidoss!',
    text: 'Aca tenemos todas las birras mas ricas',
    imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMc2ruGOxcLNIKHvmebHT4PGpMSK3jlKWERKDob=w1080-h608-p-no-v0',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    confirmButtonText: 'Pasar a ver',
    position: 'top-center' 

}
)
}

