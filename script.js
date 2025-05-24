/*
  JavaScript para trabajar con la página IndieGameViewer.
    - Permite cambiar el tema de la página (claro, oscuro, vacío, dorado).
    - Permite seleccionar el menú (juegos Indie, carrito, top juegos).
    - Permite guardar y mostrar la información del usuario (nombre y edad).
    - Permite añadir juegos al carrito y guardar la información en localStorage.
    - Permite mostrar una lista de juegos con su información (título, descripción, género, precio, valoración y PEGI).
    - Autor: Javier Martín Cruz (1ºDAW)
*/

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el nodo raíz para buscar elementos (útil si el contenido se genera dinámicamente)
    const root = document.getElementById('contenido') || document;

    // --- Rellenar selects si están vacíos (por si el XSLT no los pone) ---
    // Esta función asegura que los selectores de tema y menú tengan opciones, incluso si el XSLT no las ha generado.
    function ensureSelectOptions() {
        // Añade opciones al selector de tema si está vacío
        const temaSelect = root.querySelector('#tema-color');
        if (temaSelect && temaSelect.children.length === 0) {
            temaSelect.innerHTML = `
                <option value="light">Tema claro</option>
                <option value="dark">Tema oscuro</option>
                <option value="vacio">Tema vacío</option>
                <option value="dorado">Tema dorado</option>
            `;
        }
        // Añade opciones al selector de menú si está vacío
        const menuSelect = root.querySelector('#menu');
        if (menuSelect && menuSelect.children.length === 0) {
            menuSelect.innerHTML = `
                <option value="top-juegos">Top mejores juegos</option>
                <option value="main">Juegos Indie</option>
                <option value="carrito">Carrito</option>
            `;
        }
    }
    ensureSelectOptions();

    // --- Selección de elementos del DOM ---
    // Se seleccionan los elementos principales de la interfaz para manipularlos posteriormente.
    const temaSelect = root.querySelector('#tema-color');
    const menuSelect = root.querySelector('#menu');
    const userInfo = root.querySelector('#user-info');
    const userDisplay = root.querySelector('#user-display');
    const changeUserBtn = root.querySelector('#change-user');
    const userForm = root.querySelector('#user-form');
    const userDataForm = root.querySelector('#user-data-form');
    const nombreInput = root.querySelector('#nombre');
    const edadInput = root.querySelector('#edad');
    const juegos = root.querySelectorAll('.juego');
    // El carrito se inicializa a partir de localStorage, o como array vacío si no existe.
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // --- USUARIO ---
    // Recupera nombre y edad guardados en localStorage para mostrar el saludo o el formulario.
    const nombreGuardado = localStorage.getItem('nombre');
    const edadGuardada = localStorage.getItem('edad');

    // Si el formulario de usuario existe, gestiona la visualización y el guardado de datos
    if (userForm && userDataForm && nombreInput && edadInput) {
        if (!nombreGuardado || !edadGuardada) {
            // Si no hay datos guardados, muestra el formulario para que el usuario los introduzca.
            userForm.style.display = 'block';
        } else {
            // Si hay datos guardados, muestra el saludo al usuario.
            mostrarUsuario(nombreGuardado, edadGuardada);
        }

        // Evento para guardar los datos del usuario al enviar el formulario
        userDataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = nombreInput.value.trim();
            const edad = parseInt(edadInput.value.trim());
            if (nombre && edad >= 0) {
                // Guarda los datos en localStorage y muestra el saludo.
                localStorage.setItem('nombre', nombre);
                localStorage.setItem('edad', edad);
                mostrarUsuario(nombre, edad);
                userForm.style.display = 'none';
                // Mensaje de advertencia si el usuario es menor de edad
                if (edad < 18) {
                    alert('Algunos de los contenidos mostrados en esta página no son aptos para todas las edades, proceda con precaución o acompañado de un adulto.');
                } else {
                    alert('Bienvenido/a a la página, disfruta de los juegos.');
                }
            } else {
                alert('Por favor, introduce un nombre válido y una edad válida.');
            }
        });
    } else if (nombreGuardado && edadGuardada && userInfo && userDisplay) {
        // Si ya hay datos guardados y los elementos existen, muestra el saludo
        mostrarUsuario(nombreGuardado, edadGuardada);
    }

    // Función para mostrar el saludo al usuario
    // Muestra el bloque de información del usuario y el saludo personalizado.
    function mostrarUsuario(nombre, edad) {
        if (userInfo && userDisplay) {
            userInfo.style.display = 'block';
            userDisplay.textContent = `Hola, ${nombre} (${edad} años)`;
        }
    }

    // Permite cambiar de usuario mostrando el formulario de nuevo
    if (changeUserBtn && userForm && userInfo) {
        changeUserBtn.addEventListener('click', () => {
            userForm.style.display = 'block';
            userInfo.style.display = 'none';
        });
    }

    // --- TEMA ---
    // Recupera el tema guardado y lo aplica al body
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado && temaSelect) {
        // Elimina todas las clases de tema antes de aplicar la nueva.
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

    // Evento para cambiar el tema cuando el usuario selecciona otro
    if (temaSelect) {
        temaSelect.addEventListener('change', () => {
            const tema = temaSelect.value;
            // Elimina todas las clases de tema antes de aplicar la nueva.
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
            // Guarda el tema seleccionado en localStorage
            localStorage.setItem('tema', tema);
        });
    }

    // --- MENÚ ---
    // Permite la navegación entre páginas principales según el menú seleccionado
    if (menuSelect) {
        menuSelect.addEventListener('change', () => {
            if (menuSelect.value === 'main') {
                // Redirige a la página principal de juegos Indie
                window.location.href = 'index.html';
            }
            if (menuSelect.value === 'carrito') {
                // Redirige a la página del carrito
                window.location.href = 'cart.html';
            }
            if (menuSelect.value === 'top-juegos') {
                // Redirige a la página de top juegos (XML)
                window.location.href = 'topgames.xml';
            }
        });
    }

    // --- AÑADIR AL CARRITO ---
    // Para cada juego mostrado, añade un evento al botón "Añadir al carrito".
    juegos.forEach(juego => {
        const agregarAlCarritoBtn = juego.querySelector('.add-to-cart');
        // Obtiene el nombre y el precio del juego desde el DOM.
        const nombre = juego.querySelector('h2').textContent;
        const precioTexto = juego.querySelector('ul li:nth-child(3)').textContent
            .replace('Precio: ', '')
            .replace('€', '')
            .replace(',', '.')
            .trim();
        const precio = parseFloat(precioTexto);

        // Al hacer clic, añade el juego al carrito y lo guarda en localStorage.
        agregarAlCarritoBtn.addEventListener('click', () => {
            carrito.push({ nombre, precio });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert(`${nombre} añadido al carrito.`);
        });
    });

    // --- MOSTRAR CARRITO EN LA PÁGINA DEL CARRITO ---
    // Si estamos en la página del carrito, muestra los juegos añadidos y permite quitarlos.
    if (document.body.classList.contains('carrito-page')) {
        const carritoDisplay = document.getElementById('carrito-display');
        const totalDisplay = document.getElementById('total');

        // Función para actualizar la visualización del carrito y el total.
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

                    // Botón para quitar el juego del carrito
                    const quitarBtn = document.createElement('button');
                    quitarBtn.textContent = 'Quitar';
                    quitarBtn.classList.add('remove-from-cart');
                    quitarBtn.addEventListener('click', () => {
                        // Elimina el juego del carrito y actualiza la vista y el almacenamiento.
                        carrito.splice(index, 1);
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                        actualizarCarrito();
                    });

                    itemElement.appendChild(quitarBtn);
                    carritoDisplay.appendChild(itemElement);
                    total += item.precio;
                });

                // Muestra el total actualizado
                totalDisplay.textContent = total.toFixed(2) + '€';
            }
        }

        // Inicializa la visualización del carrito al cargar la página.
        actualizarCarrito();
    }
});

