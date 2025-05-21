document.addEventListener('DOMContentLoaded', () => {
    const temaSelect = document.getElementById('tema-color');
    const menuSelect = document.getElementById('menu');
    const userInfo = document.getElementById('user-info');
    const userDisplay = document.getElementById('user-display');
    const changeUserBtn = document.getElementById('change-user');
    const userForm = document.getElementById('user-form');
    const userDataForm = document.getElementById('user-data-form');
    const nombreInput = document.getElementById('nombre');
    const edadInput = document.getElementById('edad');
    const juegos = document.querySelectorAll('.juego');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    // Mostrar formulario si no hay datos guardados
    const nombreGuardado = localStorage.getItem('nombre');
    const edadGuardada = localStorage.getItem('edad');

    if (!nombreGuardado || !edadGuardada) {
        userForm.style.display = 'block';
    } else {
        mostrarUsuario(nombreGuardado, edadGuardada);
    }

    // Guardar datos del usuario
    userDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = nombreInput.value.trim();
        const edad = parseInt(edadInput.value.trim());

        if (nombre && edad >= 0) {
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('edad', edad);
            mostrarUsuario(nombre, edad);
            userForm.style.display = 'none';

            // Mostrar aviso si la edad es menor a 18
            if (edad < 18) {
                alert('Algunos de los contenidos mostrados en esta página no son aptos para todas las edades, proceda con precaución o acompañado de un adulto.');
            } else {
                alert('Bienvenido/a a la página, disfruta de los juegos.');
            }
        } else {
            alert('Por favor, introduce un nombre válido y una edad válida.');
        }
    });

    // Mostrar usuario en la parte superior derecha
    function mostrarUsuario(nombre, edad) {
        userInfo.style.display = 'block';
        userDisplay.textContent = `Hola, ${nombre} (${edad} años)`;
    }

    // Cambiar usuario
    changeUserBtn.addEventListener('click', () => {
        userForm.style.display = 'block';
        userInfo.style.display = 'none';
    });

    // Aplicar el tema guardado en localStorage al cargar la página
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado) {
        document.body.classList.remove('tema-oscuro', 'tema-claro', 'tema-vacio', 'tema-dorado');
        if (temaGuardado === 'dark') {
            document.body.classList.add('tema-oscuro');
            temaSelect.value = 'dark';
        } else if (temaGuardado === 'light') {
            document.body.classList.add('tema-claro');
            temaSelect.value = 'light';
        } else if (temaGuardado === 'vacio') {
            document.body.classList.add('tema-vacio');
            temaSelect.value = 'vacio';
        } else if (temaGuardado === 'dorado') {
            document.body.classList.add('tema-dorado');
            temaSelect.value = 'dorado';
        }
    }

    // Cambiar y guardar el tema seleccionado
    temaSelect.addEventListener('change', () => {
        const tema = temaSelect.value;
        document.body.classList.remove('tema-oscuro', 'tema-claro', 'tema-vacio', 'tema-dorado');
        if (tema === 'dark') {
            document.body.classList.add('tema-oscuro');
        } else if (tema === 'light') {
            document.body.classList.add('tema-claro');
        } else if (tema === 'vacio') {
            document.body.classList.add('tema-vacio');
        } else if (tema === 'dorado') {
            document.body.classList.add('tema-dorado');
        }
        localStorage.setItem('tema', tema);
    });

    // Cambio de página al seleccionar "Carrito", "Juegos Indie" y "Top mejores juegos"
    menuSelect.addEventListener('change', () => {
        if (menuSelect.value === 'main') {
            window.location.href = 'IndieGameViewer.html';
        }
        if (menuSelect.value === 'carrito') {
            window.location.href = 'IndieGameViewer_Cart.html';
        }
        if (menuSelect.value === 'top-juegos') {
            window.location.href = 'IndieGameViewer_TopGames.xml'; // Cambia a .xml para que el navegador aplique el XSL automáticamente
        }
    });

    // Añadir al carrito
    juegos.forEach(juego => {
        const agregarAlCarritoBtn = juego.querySelector('.add-to-cart');
        const nombre = juego.querySelector('h2').textContent;
        const precioTexto = juego.querySelector('ul li:nth-child(3)').textContent
            .replace('Precio: ', '')
            .replace('€', '')
            .replace(',', '.')
            .trim();
        const precio = parseFloat(precioTexto);

        agregarAlCarritoBtn.addEventListener('click', () => {
            carrito.push({ nombre, precio });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert(`${nombre} añadido al carrito.`);
        });
    });

    // Mostrar carrito en la página del carrito
    if (document.body.classList.contains('carrito-page')) {
        const carritoDisplay = document.getElementById('carrito-display');
        const totalDisplay = document.getElementById('total');

        function actualizarCarrito() {
            carritoDisplay.innerHTML = '';
            total = 0;

            if (carrito.length === 0) {
                // Mostrar mensaje si el carrito está vacío
                const mensajeVacio = document.createElement('p');
                mensajeVacio.textContent = 'No se ha añadido nada al carrito, visita la página principal y añade juegos al carrito para calcular su precio.';
                mensajeVacio.style.textAlign = 'center';
                mensajeVacio.style.color = '#666';
                total = 0;
                totalDisplay.textContent = total.toFixed(2) + '€';
                carritoDisplay.appendChild(mensajeVacio);
            } else {
                // Mostrar los elementos del carrito
                carrito.forEach((item, index) => {
                    const itemElement = document.createElement('li');
                    itemElement.textContent = `${item.nombre} - ${item.precio.toFixed(2)}€`;

                    const quitarBtn = document.createElement('button');
                    quitarBtn.textContent = 'Quitar';
                    quitarBtn.classList.add('remove-from-cart');
                    quitarBtn.addEventListener('click', () => {
                        carrito.splice(index, 1);
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                        actualizarCarrito();
                    });

                    itemElement.appendChild(quitarBtn);
                    carritoDisplay.appendChild(itemElement);
                    total += item.precio;
                });

                totalDisplay.textContent = total.toFixed(2) + '€';
            }
        }

        actualizarCarrito();
    }

    const cantidadJuegosSelect = document.getElementById('cantidad-juegos');
    const juegosLista = document.getElementById('juegos-lista');
    const topjuegos = Array.from(juegosLista.children);

    // Función para mostrar la cantidad seleccionada de juegos
    function mostrarJuegos(cantidad) {
        topjuegos.forEach((juego, index) => {
            if (index < cantidad) {
                juego.style.display = 'block';
            } else {
                juego.style.display = 'none';
            }
        });
    }

    // Mostrar 10 juegos por defecto
    mostrarJuegos(10);

    // Cambiar la cantidad de juegos mostrados según la selección
    cantidadJuegosSelect.addEventListener('change', () => {
        const cantidad = parseInt(cantidadJuegosSelect.value, 10);
        mostrarJuegos(cantidad);
    });

});

