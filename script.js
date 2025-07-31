const productos = [
  {
    id: 1,
    nombre: "Remera",
    precio: 5000,
    img: "https://sublitextil.com.ar/wp-content/uploads/2019/01/Remera-sublimar-hombre-.jpg",
  },
  {
    id: 2,
    nombre: "Gorra",
    precio: 3000,
    img: "https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw568aa7cc/products/NIFB5625-410/NIFB5625-410-1.JPG",
  },
  {
    id: 3,
    nombre: "Zapatillas",
    precio: 15000,
    img: "https://redsport.vtexassets.com/arquivos/ids/1199015-800-auto?v=638709060379470000&width=800&height=auto&aspect=true",
  },
];
let carrito = [];
let container = document.querySelector(".productos-container");
let containerModal = document.querySelector(".table-body");
let footTable = document.querySelector(".Tablefoot");
productos.map((producto) => {
  container.innerHTML += `
   <div class="card" style="width: 18rem;">
  <img src="${producto.img}" class="card-img-top" alt="img">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">$${producto.precio}</p>
    <button class="btn btn-primary" data-id = ${producto.id}>Agregar Carrito</button>
  </div>
</div>
  
  `;
});

container.addEventListener("click", (e) => {
  let boton = e.target.closest(".btn-primary");
  if (boton) {
    let botonId = boton.dataset.id;
    let productoAgregado = productos.find((producto) => producto.id == botonId);
    let elemento = {
      id: productoAgregado.id,
      producto: productoAgregado.nombre,
      precio: productoAgregado.precio,
      cant: 1,
    };
    if (pertenece(elemento)) {
      agregarProducto(elemento);
      Toastify({
        text: `Agregado  ${elemento.producto} al carrito`,
        className: "info",
        TimeRanges: 2000,
        style: {
          background: "linear-gradient(to right,blue,lightblue)",
        },
      }).showToast();
      calcularTotal();
    } else {
      carrito.push(elemento);
      Toastify({
        text: `Agregado  ${elemento.producto} al carrito`,
        className: "info",
        style: {
          background: "linear-gradient(to right, blue,lightblue)",
        },
      }).showToast();
      calcularTotal();
    }
    containerModal.innerHTML = "";
    footTable.style.display = "block";
    footTable.textContent = "Total: $";
    actualizarCarrito();
  }
});
function pertenece(producto) {
  let afirmacion = false;
  for (let index = 0; index < carrito.length; index++) {
    if (producto.id == carrito[index].id) {
      afirmacion = true;
      break;
    }
  }
  return afirmacion;
}
function agregarProducto(producto) {
  let id = producto.id;
  for (let index = 0; index < carrito.length; index++) {
    if (id == carrito[index].id) {
      carrito[index].cant += 1;
    }
  }
  calcularTotal();
}

function actualizarCarrito() {
  carrito.forEach((producto) => {
    containerModal.innerHTML += `
   <tr>
   <td>${producto.producto} <button class="btn btn-danger" data-id = ${
      producto.id
    }>X</button>
     <button class="btn btn-secondary" data-id = ${
      producto.id
    }>+</button>
    </td>
   <td>${producto.cant}</td>
   <td>${producto.precio}</td>
   <td>${producto.precio * producto.cant}</td>
   </tr>
  `;
  });
  calcularTotal();
}

containerModal.addEventListener("click", (e) => {
  let boton = e.target.closest(".btn-danger");
  calcularTotal();
  if (boton) {
    let botonId = boton.dataset.id;
    let productoEliminado = carrito.find((producto) => producto.id == botonId);
    if (productoEliminado.cant > 1) {
      productoEliminado.cant -= 1;
      Toastify({
        text: `Eliminado 1  ${productoEliminado.producto} del carrito`,
        className: "info",
        style: {
          background: "linear-gradient(to right, orange,red)",
        },
      }).showToast();
    } else {
      eliminarProducto(productoEliminado);
      Toastify({
        text: `Eliminado ${productoEliminado.producto} del carrito`,
        className: "info",
        style: {
          background: "linear-gradient(to right, red,red)",
        },
      }).showToast();
    }
    containerModal.innerHTML = "";

    actualizarCarrito();
    calcularTotal();
  }
});
containerModal.addEventListener("click", (e) => {
  let boton = e.target.closest(".btn-secondary");
  if (boton) {
    let botonId = boton.dataset.id;
    let productoAgregado = carrito.find((producto) => producto.id == botonId);
    agregarProducto(productoAgregado);
    Toastify({
      text: `Agregado 1 ${productoAgregado.producto} al carrito`,
      className: "info",
      style: {
        background: "linear-gradient(to right, blue,lightblue)",
      },
    }).showToast();
    containerModal.innerHTML = "";
    actualizarCarrito();
  }
});




function eliminarProducto(producto) {
  let nuevaLista = carrito.filter((item) => item.id != producto.id);
  carrito = nuevaLista;
}

function calcularTotal() {
  footTable.textContent = "$";
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cant;
  });
  footTable.textContent += " " + total;
}
