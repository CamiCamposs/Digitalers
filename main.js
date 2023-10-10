/* Librerías */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Archivos de proyecto */
import './css/style.css'
import { 
    comprarProducto, 
    eliminarProducto, 
    leerLocalStorage, 
    leerLocalStorageCompra, 
    procesarPedido, 
    vaciarCarrito
} from './src/carrito'

const productos = document.getElementById("lista-productos")
const carrito = document.getElementById("carrito")


cargarEventos()

function cargarEventos() {

    const ruta = String(location.href)
    console.log(ruta)
    
    if ( !ruta.includes("carrito.html") ) {
        esIndex()
    } else {
        console.log("Estoy en carrito")
        document.addEventListener("DOMContentLoaded", leerLocalStorageCompra())
    }

}

function esIndex() {
    console.log("No estoy en carrito!")
    const vaciarCarritoBtn = carrito.querySelector("#vaciar-carrito")
    const procesarPedidoBtn = carrito.querySelector("#procesar-pedido")
    console.log(vaciarCarritoBtn, procesarPedidoBtn)

    productos.addEventListener("click", (e) => comprarProducto(e))
    document.addEventListener("DOMContentLoaded", leerLocalStorage())
    carrito.addEventListener("click", e => eliminarProducto(e))
    vaciarCarritoBtn.addEventListener("click", e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener("click", e => procesarPedido(e))
}

