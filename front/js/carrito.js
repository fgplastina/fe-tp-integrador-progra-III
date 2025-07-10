let arrayCarrito = [];
const contenedorCarrito = document.getElementById("items-carrito");

function crearBotonesAgregarCarrito() {
    const contenedorProductos = document.querySelector(".contenedor-productos");
    const botones = contenedorProductos.querySelectorAll('button');

    botones.forEach(function(boton) {
    boton.addEventListener("click", function() {
            arrayCarrito.push(arrayFrutas.find(fruta => fruta.id == boton.id));
            mostrarCarrito();
        });
    });
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = '';
    arrayCarrito.forEach(fruta => {
        const item = document.createElement('li');
        item.className = 'bloque-item';
        item.innerHTML = `
        <p class="nombre-item">${fruta.nombre} - ${fruta.precio}</p>
        <button id=${fruta.id} class="boton-eliminar">Eliminar</button>
        `;
        contenedorCarrito.appendChild(item);

        const conteo = document.createElement('div');
        conteo.className = 'botonesContadorCarrito';
        conteo.innerHTML = `
        <div class="botonesContadorCarrito">
            <button onclick="restarCantidadCarrito(${fruta.id})">-</button>
            <span id="${fruta.id}">1</span>
            <button onclick="sumarCantidadCarrito(${fruta.id})">+</button>
        </div>
        `;

        item.appendChild(conteo);
    });

    const botones = document.querySelectorAll('.boton-eliminar');
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            eliminarProducto(boton.id);
        });
    });
    
    sumarCantidadCarrito();
    actualizarPrecioCarrito();
}

function eliminarProducto(idFruta) {
    arrayCarrito = arrayCarrito.filter((fruta) => fruta.id !== Number(idFruta));
    mostrarCarrito();
}

function almacenarCarritoLocalStorage() {
    const jsonFrutas = JSON.stringify(arrayFrutas);
    localStorage.setItem("frutas", jsonFrutas);

}

function recuperarCarritoLocalStorage() {
    const datosFrutasCarrito = localStorage.getItem("frutas");

    if (datosFrutasCarrito) {
        arrayCarrito = JSON.parse(datosFrutasCarrito);
        console.log("Se cargaron datos guardados del carrito.");
    } else {
    console.log("No se encontraron datos guardados del carrito");
    }

}


function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    contenedorCarrito.textContent = arrayCarrito.length;
}

function sumarCantidadCarrito(id) {
    const contadorCarrito = document.getElementById(id)
    parseInt(contadorCarrito.textContent)++;
}

function restarCantidadCarrito(id) {
    const contadorCarrito = document.getElementById(id)
    parseInt(contadorCarrito.textContent)--;
}

function actualizarPrecioCarrito() {
    const precioTotalCarrito = document.getElementById('precio-total');
    const precioTotal = arrayCarrito.reduce((a, c) => a + c, 0)
    precioTotalCarrito.textContent = arrayCarrito.length;
}