/* =====================================================
   GENSPORTS - SCRIPT PRINCIPAL
===================================================== */


/* -----------------------------------------------------
   DATOS
----------------------------------------------------- */

const productos = [
    // Running
    { nombre: "Tenis deportivos", precio: 1299, imagen: "img/productos/tenis.jpg", deporte: "Running" },
    { nombre: "Playera deportiva", precio: 599, imagen: "img/productos/playera.jpg", deporte: "Running" },
    { nombre: "Short para correr", precio: 499, imagen: "img/productos/short-running.jpg", deporte: "Running" },
    { nombre: "Sudadera deportiva", precio: 899, imagen: "img/productos/sudadera-running.jpg", deporte: "Running" },
    { nombre: "Calcetas deportivas", precio: 249, imagen: "img/productos/calcetas-running.jpg", deporte: "Running" },
    { nombre: "Gorra deportiva", precio: 399, imagen: "img/productos/gorra-running.jpg", deporte: "Running" },
    { nombre: "Cangurera deportiva", precio: 449, imagen: "img/productos/cangurera.jpg", deporte: "Running" },

    // Fútbol
    { nombre: "Balón de fútbol", precio: 799, imagen: "img/productos/balon.jpg", deporte: "Fútbol" },
    { nombre: "Jersey de fútbol", precio: 999, imagen: "img/productos/jersey-futbol.jpg", deporte: "Fútbol" },
    { nombre: "Short de fútbol", precio: 499, imagen: "img/productos/short-futbol.jpg", deporte: "Fútbol" },
    { nombre: "Tacos de fútbol", precio: 1499, imagen: "img/productos/tacos-futbol.jpg", deporte: "Fútbol" },
    { nombre: "Espinilleras", precio: 299, imagen: "img/productos/espinilleras.jpg", deporte: "Fútbol" },
    { nombre: "Guantes de portero", precio: 899, imagen: "img/productos/guantes-portero.jpg", deporte: "Fútbol" },
    { nombre: "Mochila de fútbol", precio: 699, imagen: "img/productos/mochila-futbol.jpg", deporte: "Fútbol" },

    // Básquetbol
    { nombre: "Balón de básquetbol", precio: 849, imagen: "img/productos/balon-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Jersey de básquetbol", precio: 899, imagen: "img/productos/jersey-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Short de básquetbol", precio: 499, imagen: "img/productos/short-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Tenis de básquetbol", precio: 1799, imagen: "img/productos/tenis-basquetbol.jpg", deporte: "Básquetbol" },
    { nombre: "Muñequeras deportivas", precio: 249, imagen: "img/productos/munequeras.jpg", deporte: "Básquetbol" },
    { nombre: "Rodilleras deportivas", precio: 399, imagen: "img/productos/rodilleras.jpg", deporte: "Básquetbol" },
    { nombre: "Mochila de básquetbol", precio: 749, imagen: "img/productos/mochila-basquetbol.jpg", deporte: "Básquetbol" },

    // Americano
    { nombre: "Balón americano", precio: 899, imagen: "img/productos/balon-americano.jpg", deporte: "Americano" },
    { nombre: "Jersey americano", precio: 1299, imagen: "img/productos/jersey-americano.jpg", deporte: "Americano" },
    { nombre: "Pants deportivos", precio: 799, imagen: "img/productos/pants-americano.jpg", deporte: "Americano" },
    { nombre: "Casco americano", precio: 2499, imagen: "img/productos/casco-americano.jpg", deporte: "Americano" },
    { nombre: "Guantes americanos", precio: 699, imagen: "img/productos/guantes-americano.jpg", deporte: "Americano" },
    { nombre: "Hombreras deportivas", precio: 1899, imagen: "img/productos/hombreras.jpg", deporte: "Americano" },
    { nombre: "Mochila deportiva", precio: 749, imagen: "img/productos/mochila-americano.jpg", deporte: "Americano" }
].map(function (producto, indice) {
    // El id es la posición del producto en la lista
    return { id: indice, ...producto };
});

const formatoPrecio = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
});

function precio(valor) {
    return formatoPrecio.format(valor);
}

const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");


/* -----------------------------------------------------
   MODAL DEL SORTEO
----------------------------------------------------- */

function iniciarSorteo() {
    const elemento = document.getElementById("modalSorteo");
    const botonParticipar = document.getElementById("btnParticipar");

    if (!elemento) return;

    const modal = bootstrap.Modal.getOrCreateInstance(elemento);
    let irAlFormulario = false;

    // Se muestra una sola vez por visita
    let yaVisto = false;

    try {
        yaVisto = sessionStorage.getItem("sorteoVisto") === "1";
    } catch (error) {
        yaVisto = false;
    }

    if (!yaVisto) {
        modal.show();
    }

    botonParticipar.addEventListener("click", function () {
        irAlFormulario = true;
        modal.hide();
    });

    elemento.addEventListener("hidden.bs.modal", function () {
        try {
            sessionStorage.setItem("sorteoVisto", "1");
        } catch (error) {
            // Si no hay almacenamiento, el modal puede volver a abrirse
        }

        if (irAlFormulario) {
            irAlFormulario = false;

            document.getElementById("suscripcion").scrollIntoView({ behavior: "smooth" });

            setTimeout(function () {
                document.getElementById("nombre").focus({ preventScroll: true });
            }, 700);
        }
    });
}


/* -----------------------------------------------------
   MENÚ DE NAVEGACIÓN
----------------------------------------------------- */

function iniciarMenu() {
    const header = document.querySelector(".header");
    const menu = document.getElementById("menu");
    const boton = document.getElementById("botonMenu");

    // Guarda la altura del header para el sticky de la oferta
    function medirHeader() {
        document.documentElement.style.setProperty(
            "--header-altura",
            header.getBoundingClientRect().height + "px"
        );
    }

    medirHeader();

    if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(medirHeader).observe(header);
    }

    function cerrarMenu() {
        menu.classList.remove("abierto");
        boton.setAttribute("aria-expanded", "false");
    }

    boton.addEventListener("click", function () {
        const abierto = menu.classList.toggle("abierto");
        boton.setAttribute("aria-expanded", String(abierto));
    });

    menu.addEventListener("click", function (evento) {
        if (evento.target.closest("a")) {
            cerrarMenu();
        }
    });
}


/* -----------------------------------------------------
   OFERTA FLASH
----------------------------------------------------- */

function iniciarOferta() {
    const oferta = document.getElementById("oferta");
    const horas = document.getElementById("horas");
    const minutos = document.getElementById("minutos");
    const segundos = document.getElementById("segundos");
    const efectos = oferta.querySelector(".oferta-efectos");

    let tiempoRestante = 90 * 60;
    let intervalo = null;

    function dosDigitos(numero) {
        return String(numero).padStart(2, "0");
    }

    function mostrarTiempo() {
        horas.textContent = dosDigitos(Math.floor(tiempoRestante / 3600));
        minutos.textContent = dosDigitos(Math.floor((tiempoRestante % 3600) / 60));
        segundos.textContent = dosDigitos(tiempoRestante % 60);
    }

    function terminarOferta() {
        clearInterval(intervalo);

        oferta.querySelector(".oferta-titulo").textContent = "Oferta finalizada";
        oferta.querySelector("strong").textContent = "Consulta nuestros productos";
        document.getElementById("botonOferta").textContent = "Ver productos";
    }

    function avanzar() {
        tiempoRestante--;
        mostrarTiempo();

        if (tiempoRestante <= 0) {
            terminarOferta();
        }
    }

    mostrarTiempo();
    intervalo = setInterval(avanzar, 1000);

    // Reduce el tamaño de la oferta al bajar la página
    function revisarScroll() {
        oferta.classList.toggle("compacto", window.scrollY > 150);
    }

    revisarScroll();
    window.addEventListener("scroll", revisarScroll, { passive: true });

    // Efecto de partículas al pasar el mouse
    oferta.addEventListener("mouseenter", function (evento) {
        if (movimientoReducido.matches) return;

        const caja = oferta.getBoundingClientRect();

        for (let i = 0; i < 25; i++) {
            const particula = document.createElement("span");
            const angulo = Math.random() * Math.PI * 2;
            const distancia = 40 + Math.random() * 80;

            particula.className = "particula";
            particula.style.left = (evento.clientX - caja.left) + "px";
            particula.style.top = (evento.clientY - caja.top) + "px";
            particula.style.setProperty("--x", Math.cos(angulo) * distancia + "px");
            particula.style.setProperty("--y", Math.sin(angulo) * distancia + "px");

            efectos.appendChild(particula);

            setTimeout(function () {
                particula.remove();
            }, 800);
        }
    });
}


/* -----------------------------------------------------
   CARRUSEL DEL HERO
----------------------------------------------------- */

function iniciarCarrusel() {
    const carrusel = document.querySelector(".carrusel");
    const slides = Array.from(carrusel.querySelectorAll(".slide"));
    const indicadores = Array.from(carrusel.querySelectorAll(".indicador"));
    const anterior = carrusel.querySelector("[data-anterior]");
    const siguiente = carrusel.querySelector("[data-siguiente]");
    const estado = carrusel.querySelector("[data-estado]");

    let actual = 0;
    let temporizador = null;

    function mostrar(indice, anunciar) {
        actual = (indice + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.hidden = i !== actual;
        });

        indicadores.forEach(function (indicador, i) {
            if (i === actual) {
                indicador.setAttribute("aria-current", "true");
            } else {
                indicador.removeAttribute("aria-current");
            }
        });

        if (anunciar) {
            estado.textContent = slides[actual].getAttribute("aria-label");
        }
    }

    // Cambio automático cada 6 segundos
    function detener() {
        clearInterval(temporizador);
    }

    function iniciar() {
        detener();

        if (movimientoReducido.matches) return;

        temporizador = setInterval(function () {
            mostrar(actual + 1, false);
        }, 6000);
    }

    anterior.addEventListener("click", function () {
        mostrar(actual - 1, true);
        iniciar();
    });

    siguiente.addEventListener("click", function () {
        mostrar(actual + 1, true);
        iniciar();
    });

    indicadores.forEach(function (indicador, i) {
        indicador.addEventListener("click", function () {
            mostrar(i, true);
            iniciar();
        });
    });

    // Se pausa mientras el usuario interactúa con el carrusel
    carrusel.addEventListener("mouseenter", detener);
    carrusel.addEventListener("mouseleave", iniciar);
    carrusel.addEventListener("focusin", detener);
    carrusel.addEventListener("focusout", iniciar);

    mostrar(0, false);
    iniciar();
}


/* -----------------------------------------------------
   PRODUCTOS Y FILTROS
----------------------------------------------------- */

const listaProductos = document.getElementById("productosLista");
const botonesFiltro = document.querySelectorAll(".filtro");

function mostrarProductos(lista) {
    listaProductos.innerHTML = lista.map(function (producto) {
        return `
            <article class="producto">
                <button type="button" class="producto-imagen" data-ver="${producto.id}"
                    aria-label="Ver detalle de ${producto.nombre}">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                    <span class="producto-etiqueta">${producto.deporte}</span>
                </button>

                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="producto-precio">${precio(producto.precio)}</p>
                    <button type="button" class="boton" data-agregar="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function filtrarProductos(deporte) {
    const lista = deporte === "Todos"
        ? productos
        : productos.filter(function (producto) {
            return producto.deporte === deporte;
        });

    botonesFiltro.forEach(function (boton) {
        const activo = boton.dataset.filtro === deporte;

        boton.classList.toggle("activo", activo);
        boton.setAttribute("aria-pressed", String(activo));
    });

    mostrarProductos(lista);
}

function iniciarProductos() {
    mostrarProductos(productos);

    // Filtros del catálogo
    document.getElementById("filtros").addEventListener("click", function (evento) {
        const boton = evento.target.closest("[data-filtro]");

        if (boton) {
            filtrarProductos(boton.dataset.filtro);
        }
    });

    // Tarjetas de deportes: filtran y llevan al catálogo
    document.querySelectorAll(".deporte").forEach(function (tarjeta) {
        tarjeta.addEventListener("click", function () {
            filtrarProductos(tarjeta.dataset.deporte);
            document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
        });
    });

    // Agregar al carrito o ver el detalle
    listaProductos.addEventListener("click", function (evento) {
        const botonAgregar = evento.target.closest("[data-agregar]");
        const botonVer = evento.target.closest("[data-ver]");

        if (botonAgregar) {
            agregarAlCarrito(Number(botonAgregar.dataset.agregar));
            confirmarAgregado(botonAgregar);
        } else if (botonVer) {
            abrirDetalle(Number(botonVer.dataset.ver));
        }
    });
}

// Cambia el texto del botón por un momento
function confirmarAgregado(boton) {
    if (!boton.dataset.original) {
        boton.dataset.original = boton.innerHTML;
    }

    clearTimeout(boton.temporizador);

    boton.classList.add("agregado");
    boton.innerHTML = '<i class="bi bi-check-lg" aria-hidden="true"></i> ¡Agregado!';

    boton.temporizador = setTimeout(function () {
        boton.classList.remove("agregado");
        boton.innerHTML = boton.dataset.original;
    }, 1200);
}


/* -----------------------------------------------------
   DETALLE DEL PRODUCTO
----------------------------------------------------- */

const detalle = document.getElementById("detalleProducto");
const botonDetalleAgregar = document.getElementById("detalleAgregar");

let productoAbierto = null;

function abrirDetalle(id) {
    const producto = productos[id];

    productoAbierto = id;

    document.getElementById("detalleImagen").src = producto.imagen;
    document.getElementById("detalleImagen").alt = producto.nombre;
    document.getElementById("detalleNombre").textContent = producto.nombre;
    document.getElementById("detallePrecio").textContent = precio(producto.precio);
    document.getElementById("detalleDeporte").textContent = producto.deporte;

    detalle.showModal();
}

function iniciarDetalle() {
    document.getElementById("detalleCerrar").addEventListener("click", function () {
        detalle.close();
    });

    // Cierra al hacer clic fuera de la tarjeta
    detalle.addEventListener("click", function (evento) {
        if (evento.target === detalle) {
            detalle.close();
        }
    });

    botonDetalleAgregar.addEventListener("click", function () {
        agregarAlCarrito(productoAbierto);
        confirmarAgregado(botonDetalleAgregar);
    });
}


/* -----------------------------------------------------
   CARRITO
----------------------------------------------------- */

const botonCarrito = document.getElementById("botonCarrito");
const panelCarrito = document.getElementById("panelCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

// Cada elemento guarda el id del producto y su cantidad
let carrito = [];

function agregarAlCarrito(id) {
    const existente = carrito.find(function (item) {
        return item.id === id;
    });

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ id: id, cantidad: 1 });
    }

    actualizarCarrito();

    botonCarrito.classList.remove("rebote");
    void botonCarrito.offsetWidth;
    botonCarrito.classList.add("rebote");
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(function (elemento) {
        return elemento.id === id;
    });

    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        quitarDelCarrito(id);
        return;
    }

    actualizarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(function (item) {
        return item.id !== id;
    });

    actualizarCarrito();
}

function actualizarCarrito() {
    const unidades = carrito.reduce(function (suma, item) {
        return suma + item.cantidad;
    }, 0);

    contadorCarrito.textContent = unidades;
    mostrarCarrito();
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        panelCarrito.innerHTML = `
            <h2 class="carrito-titulo">Tu carrito</h2>
            <p class="carrito-vacio">El carrito está vacío</p>
        `;
        return;
    }

    const filas = carrito.map(function (item) {
        const producto = productos[item.id];

        return `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">

                <div>
                    <h4>${producto.nombre}</h4>
                    <span class="precio">${precio(producto.precio * item.cantidad)}</span>

                    <div class="cantidad">
                        <button type="button" data-restar="${item.id}" aria-label="Quitar una unidad">−</button>
                        <span>${item.cantidad}</span>
                        <button type="button" data-sumar="${item.id}" aria-label="Agregar una unidad">+</button>
                    </div>
                </div>

                <button type="button" class="carrito-quitar" data-quitar="${item.id}"
                    aria-label="Eliminar ${producto.nombre}">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
                </button>
            </div>
        `;
    }).join("");

    const total = carrito.reduce(function (suma, item) {
        return suma + productos[item.id].precio * item.cantidad;
    }, 0);

    panelCarrito.innerHTML = `
        <h2 class="carrito-titulo">Tu carrito</h2>
        ${filas}
        <div class="carrito-total">
            <span>Total</span>
            <span>${precio(total)}</span>
        </div>
    `;
}

function abrirCarrito(abrir) {
    panelCarrito.hidden = !abrir;
    botonCarrito.setAttribute("aria-expanded", String(abrir));
}

function iniciarCarrito() {
    mostrarCarrito();

    botonCarrito.addEventListener("click", function (evento) {
        evento.stopPropagation();
        abrirCarrito(panelCarrito.hidden);
    });

    // Botones dentro del carrito
    panelCarrito.addEventListener("click", function (evento) {
        // Evita que el clic cierre el panel al redibujar su contenido
        evento.stopPropagation();

        const sumar = evento.target.closest("[data-sumar]");
        const restar = evento.target.closest("[data-restar]");
        const quitar = evento.target.closest("[data-quitar]");

        if (sumar) cambiarCantidad(Number(sumar.dataset.sumar), 1);
        if (restar) cambiarCantidad(Number(restar.dataset.restar), -1);
        if (quitar) quitarDelCarrito(Number(quitar.dataset.quitar));
    });

    // Cierra el carrito al hacer clic fuera o con Escape
    document.addEventListener("click", function (evento) {
        if (!panelCarrito.contains(evento.target)) {
            abrirCarrito(false);
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            abrirCarrito(false);
        }
    });
}


/* -----------------------------------------------------
   MARCAS
----------------------------------------------------- */

function iniciarMarcas() {
    const pista = document.getElementById("marcasPista");

    // Se duplican las marcas para que el movimiento no tenga cortes
    Array.from(pista.children).forEach(function (marca) {
        const copia = marca.cloneNode(true);

        copia.classList.add("clon");
        copia.setAttribute("aria-hidden", "true");
        copia.querySelector("img").alt = "";

        pista.appendChild(copia);
    });
}


/* -----------------------------------------------------
   FORMULARIO DE SUSCRIPCIÓN
----------------------------------------------------- */

function iniciarFormulario() {
    const formulario = document.getElementById("formularioSuscripcion");
    const mensaje = document.getElementById("mensajeSuscripcion");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();

        mensaje.textContent = "¡Gracias, " + nombre + "! Tu registro fue recibido correctamente.";
        formulario.reset();
    });
}


/* -----------------------------------------------------
   INICIO
----------------------------------------------------- */

iniciarSorteo();
iniciarMenu();
iniciarOferta();
iniciarCarrusel();
iniciarProductos();
iniciarDetalle();
iniciarCarrito();
iniciarMarcas();
iniciarFormulario();
