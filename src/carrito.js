
const listaProductos = document.querySelector("#lista-carrito tbody")

export function comprarProducto(e){
    e.preventDefault()
    console.dir(e.target);
    if(e.target.classList.contains("agregar-carrito")){
        const producto = e.target.parentElement.parentElement
        console.log(producto);
        leerDatosProducto(producto)
    }
}

function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo : producto.querySelector("h5").textContent,
        precio : producto.querySelector(".precio").textContent,
        id : producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
        
    }
    
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function(productoLS){
        if(productoLS.id === infoProducto.id){
            productosLS  = productoLS.id;
        }
    })
    if(productosLS == infoProducto.id){
        console.warn("El producto ya esta (en el carrito) en el localStorage");
    }else{
        insertarCarrito(infoProducto)
    }
}

function obtenerProductosLocalStorage(){
    let productosLS
    if(localStorage.getItem("productos") == null){
        productosLS = []
    }else{
        productosLS = JSON.parse(localStorage.getItem("productos"))
    }
    return productosLS
}

function insertarCarrito(producto){
    const row = document.createElement('tr')

    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
    `
    listaProductos.appendChild(row)
    guardarProductosLocalStorage(producto)
}

function guardarProductosLocalStorage(producto) {
    let productos

    productos = obtenerProductosLocalStorage()
    productos.push(producto)
    localStorage.setItem('productos', JSON.stringify(productos))
     
}

export function leerLocalStorage() {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (producto) {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `
        listaProductos.appendChild(row)
    })


}

export function eliminarProducto(e) {
    e.preventDefault()
    let producto, productoID
    if ( e.target.classList.contains("borrar-producto")) {
        producto = e.target.parentElement.parentElement
        productoID = producto.querySelector("a").getAttribute("data-id")
        producto.remove()
        eliminarProductoLocalStorage(productoID)
    }
}


function eliminarProductoLocalStorage(productoID) {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function(productoLS, index) {
        if(productoLS.id === productoID) {
            productosLS.splice(index, 1)
        }
    })

    localStorage.setItem('productos', JSON.stringify(productosLS))
}

export function vaciarCarrito(e) {
    e.preventDefault()
    while(listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild)
    }
    vaciarLocalStorage()

    return false
}

function vaciarLocalStorage() {
    window.localStorage.clear()
}

export function procesarPedido(e) {
    e.preventDefault()
    let array = obtenerProductosLocalStorage()
    if ( array.length === 0 ) {
        console.warn("El carrito esta vacio")
    } else {
        location.href = "pages/carrito.html"
    }


}

export function leerLocalStorageCompra() {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (producto) {
         const div = document.createElement("div")
         div.innerHTML = `
         
         `
    })
}