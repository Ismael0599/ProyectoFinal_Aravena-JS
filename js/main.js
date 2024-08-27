// Array de productos
const productsArray = [
    {
        id: "Keyboard-1",
        titulo: "ThunderSwitch Pro",
        imagen: "./img/teclado.jpg",
        categoria: {
            nombre: "100%",
            id: "t-100%"
        },
        precio: 150
    },
    {
        id: "Keyboard-2",
        titulo: "KeyBlaze Elite",
        imagen: "./img/teclado2.jpg",
        categoria: {
            nombre: "100%",
            id: "t-100%"
        },
        precio: 300
    },
    {
        id: "Keyboard-3",
        titulo: "MechaCore X",
        imagen: "./img/teclado3.jpg",
        categoria: {
            nombre: "70%",
            id: "t-70%"
        },
        precio: 500
    },
    {
        id: "Keyboard-4",
        titulo: "AetherBoard Prime",
        imagen: "./img/teclado4.jpg",
        categoria: {
            nombre: "70%",
            id: "t-70%"
        },
        precio: 50
    },
    {
        id: "Keyboard-5",
        titulo: "TitanKey Ultra",
        imagen: "./img/teclado5.jpg",
        categoria: {
            nombre: "60%",
            id: "t-60%"
        },
        precio: 200
    },
    {
        id: "Keyboard-6",
        titulo: "EchoStrike Viper",
        imagen: "./img/teclado6.jpg",
        categoria: {
            nombre: "60%",
            id: "t-60%"
        },
        precio: 1000
    }
];

// Selección de elementos del DOM
const productContainer = document.querySelector("#products-container");
const cartNumber = document.querySelector(".numero-carrito");
let buttonProduct = document.querySelectorAll(".btn-product");

// Cargar productos en la página
function loadProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const article = document.createElement("article");
        article.classList.add("product");
        article.innerHTML = `
                <img src="${product.imagen}" class="img-product" alt="${product.titulo}">
                <span>${product.categoria.nombre}</span>
                <div class="info-product">
                    <h2 class="title-product">${product.titulo}</h2>
                    <p class="price-product">$${product.precio}</p>
                    <button class="btn-product" id="${product.id}">Add Cart</button>
                </div>
            `;

        productContainer.append(article);
    });

    updateButtonProducts(); // Actualiza los botones "Add Cart"
}

loadProducts(productsArray); // Se pasa el Array como parámetro para que cargue completo

// Navegación y filtros
const navButtons = document.querySelectorAll(".boton-nav");
const mainTitle = document.querySelector(".main-title");

navButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        navButtons.forEach(button => button.classList.remove("active"));
        event.currentTarget.classList.add("active");

        if (event.currentTarget.id != "all") {
            const filter = productsArray.find(product => product.categoria.id === event.currentTarget.id);
            mainTitle.innerText = `Keyboards ${filter.categoria.nombre}`;

            const productFilter = productsArray.filter(producto => producto.categoria.id === event.currentTarget.id);
            loadProducts(productFilter);
        } else {
            mainTitle.innerText = "All Keyboards";
            loadProducts(productsArray);
        }
    });
});

// Actualización de botones "Add Cart"
function updateButtonProducts() {
    buttonProduct = document.querySelectorAll(".btn-product");
    buttonProduct.forEach(button => {
        button.addEventListener("click", addCart);
    });
}

// Array del carrito
let productsCartArray = JSON.parse(localStorage.getItem('Producto-carrito')) || [];

// Agregar productos al carrito
function addCart(event) {
    const buttonId = event.currentTarget.id;
    const productCart = productsArray.find(product => product.id === buttonId);
    const existingProduct = productsCartArray.find(product => product.id === buttonId);

    if (existingProduct) {
        existingProduct.cantidad += 1;
    } else {
        productCart.cantidad = 1;
        productsCartArray.push(productCart);
    }

    updateCartNum(); // Actualiza la cantidad de productos en el carrito
    localStorage.setItem("Producto-carrito", JSON.stringify(productsCartArray));

    // Mostrar notificación con Toastify
    Toastify({
        text: "Producto agregado al carrito",
        duration: 1500, // Duración de la notificación en milisegundos
        close: true, // Muestra botón de cierre
        gravity: "top", // Posición vertical (top o bottom)
        position: "right", // Posición horizontal (left, center o right)
        backgroundColor: "#1c3a22", // Color de fondo
        stopOnFocus: true, // Mantener visible en hover
        className: "toast-cart", // Clase personalizada para CSS
    }).showToast();
}

// Actualizar número de productos en el carrito
function updateCartNum() {
    const cartNum = productsCartArray.reduce((accumulator, producto) => accumulator + producto.cantidad, 0);
    cartNumber.innerText = cartNum;
    localStorage.setItem('productos-carrito-cantidad', cartNum);
}

// Inicializar la cantidad del carrito al cargar la página
function initializeCartNum() {
    const savedCartNum = localStorage.getItem('productos-carrito-cantidad');
    if (savedCartNum !== null) {
        cartNumber.innerText = savedCartNum;
    } else {
        updateCartNum(); // Asegura que se muestra la cantidad correcta
    }
}

initializeCartNum();


