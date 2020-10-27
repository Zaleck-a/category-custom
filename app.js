//VARIABLES
const lista = document.querySelector('#lista-categorias');
const categoria = document.querySelector("input[name='nombre']");
const agregarBtn = document.querySelector("button[name='agregar']");
const eliminarElemento = document.querySelector("#categorias");
const colorPicker = document.querySelector("input[type='color']");

// Elementos de categorias
let categoriasArr = [{ nombre: 'trabajo', color: '#4CE740' }, { nombre: 'vacaciones', color: '#40A7E7' }];

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', listar); // Funcion inicial al recargar la pagina
agregarBtn.addEventListener('click', agregarCategoria); // Boton para agregar la nueva categoria
eliminarElemento.addEventListener('click', eliminarCategoria);

// color
colorPicker.addEventListener("change", event => event.target.value, false); // Detecta el color seleccionado


//FUNCIONES

// Agrega las categorias por defecto
function listar() {

    if (!localStorage.getItem('item')) { // Si no exixten elementos en el localStorage cargame los por default 
        guardarLocalStorage();
    }
    cargarLocalStorage();
    categoriasArr.forEach(item => crearElemento(item.nombre, item.color)); // Recorre los elementos del array
}

//Crea el nuevo elemento en la lista
function crearElemento(item, color) {
    const li = document.createElement('li');
    const eliminarBtn = document.createElement('button');


    lista.appendChild(li);
    li.textContent = item;
    li.style.backgroundColor = color;

    if (li.textContent !== 'vacaciones' && li.textContent !== 'trabajo') {
        li.appendChild(eliminarBtn);
        eliminarBtn.classList.add('eliminar');
        li.style.backgroundColor = color;



        if (color.charAt(1) < 7) {

            li.style.color = '#ccc';

            li.firstElementChild.style.color = '#ccc';
        }
    }
}

// Agrega una nueva categoria a la lista
function agregarCategoria() {

    const repetido = categoriasArr.some(elemento => elemento.nombre === categoria.value)

    if (categoria.value !== '' && !repetido) {
        const colorNuevo = colorPicker.value;
        const nuevaCategoria = { nombre: categoria.value, color: colorNuevo };
        crearElemento(nuevaCategoria.nombre, nuevaCategoria.color);
        categoriasArr.push(nuevaCategoria);


    } else {
        alert('La categoria no es valida o ya existe');
    }

    guardarLocalStorage();
}

//Elimina la categoria
function eliminarCategoria(e) {
    if (e.target.classList.contains('eliminar')) {
        const nombre = e.target.parentElement.textContent;
        categoriasArr = categoriasArr.filter(elemento => elemento.nombre !== nombre);
        limpiarLista();
        guardarLocalStorage();
        listar();
    }
}

// Limpia la lista
function limpiarLista() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

// Guardar en localStorage
function guardarLocalStorage() {
    localStorage.setItem('item', JSON.stringify(categoriasArr));
}

// cargar el localStorage
function cargarLocalStorage() {
    categoriasArr = JSON.parse(localStorage.getItem('item'));
}