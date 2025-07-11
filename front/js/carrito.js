document.addEventListener('DOMContentLoaded', () => {

    console.log('carrito.js cargado');

    let carrito = [];
    const contenedorCarrito = document.getElementById("items-carrito");

    function actualizarCarrito() {
        contenedorCarrito.innerHTML = '';
        carrito.forEach(producto => {
            const item = document.createElement('li');
            item.className = 'bloque-item';
            item.innerHTML = `
            <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
            <button id=${producto.id} class="boton-eliminar">Eliminar</button>
            `;
            contenedorCarrito.appendChild(item);

            const conteo = document.createElement('div');
            conteo.className = 'botonesContadorCarrito';
            conteo.innerHTML = `
            <div class="botonesContadorCarrito">
                <button onclick="restarCantidadCarrito(${producto.id})">-</button>
                <span id="${producto.id}">1</span>
                <button onclick="sumarCantidadCarrito(${producto.id})">+</button>
            </div>
            `;

            item.appendChild(conteo);
        });

    }

    const productos = document.querySelectorAll('.botones-carrito');

    productos.forEach(producto => {
    const id = producto.dataset.id;
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);
    //const cantidadSpan = producto.querySelector('.cantidad');

    producto.querySelector('.boton-sumar').addEventListener('click', (event) => {
        event.stopPropagation()
        console.log('click en boton')
        if (!carrito[id]) {
        carrito[id] = { nombre, precio, cantidad: 0 };
        }
        carrito[id].cantidad++;
        //cantidadSpan.textContent = carrito[id].cantidad;
        actualizarCarrito();
    });

    producto.querySelector('.boton-restar').addEventListener('click', (event) => {
        event.stopPropagation()
        if (carrito[id]) {
        carrito[id].cantidad--;
        if (carrito[id].cantidad <= 0) {
            delete carrito[id];
            cantidadSpan.textContent = 0;
        } else {
            cantidadSpan.textContent = carrito[id].cantidad;
        }
        actualizarCarrito();
        }
    });
    });

    function eliminarProducto(idFruta) {
        carrito = carrito.filter((fruta) => fruta.id !== Number(idFruta));
        mostrarCarrito();
    }


    function almacenarCarritoLocalStorage() {
        const jsonFrutas = JSON.stringify(arrayFrutas);
        localStorage.setItem("frutas", jsonFrutas);

    }

    function recuperarCarritoLocalStorage() {
        const datosFrutasCarrito = localStorage.getItem("frutas");

        if (datosFrutasCarrito) {
            carrito = JSON.parse(datosFrutasCarrito);
            console.log("Se cargaron datos guardados del carrito.");
        } else {
        console.log("No se encontraron datos guardados del carrito");
        }

    }


    function actualizarContadorCarrito() {
        const contadorCarrito = document.getElementById("contador-carrito");
        contenedorCarrito.textContent = carrito.length;
    }

    function sumarAlCarrito() {
        if (!carrito[id]) {
        carrito[id] = { nombre, precio, cantidad: 0 };
        }
        carrito[id].cantidad++;
        cantidadSpan.textContent = carrito[id].cantidad;
        actualizarCarrito();
    }


    function restarCantidadCarrito(id) {
        const contadorCarrito = document.getElementById(id)
        parseInt(contadorCarrito.textContent)--;
    }

    function actualizarPrecioCarrito() {
        const precioTotalCarrito = document.getElementById('precio-total');
        const precioTotal = carrito.reduce((a, c) => a + c, 0)
        precioTotalCarrito.textContent = carrito.length;
    }
});