// Array de productos
let productsArray = [];

// Async Await para traer los productos desde el archivo .json
const dataFetch = async () => {
    try {
        const resp = await fetch("./data/productos.json");
        const data = await resp.json();
        productsArray = data;

        loadProducts(productsArray);
    } catch (error) {
        console.error("Error fetching products: ", error);
    }
};

dataFetch();


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
                    <button class="btn-product" id="${product.id}">Agregar Carrito</button>
                </div>
            `;

        productContainer.append(article);
    });

    updateButtonProducts(); // Actualiza los botones "Add Cart"
}


// Navegación y filtros
const navButtons = document.querySelectorAll(".boton-nav");
const mainTitle = document.querySelector(".main-title");

navButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        navButtons.forEach(button => button.classList.remove("active"));
        event.currentTarget.classList.add("active");

        if (event.currentTarget.id != "todo") {
            const filter = productsArray.find(product => product.categoria.id === event.currentTarget.id);
            mainTitle.innerText = `Teclados Custom ${filter.categoria.nombre}`;

            const productFilter = productsArray.filter(producto => producto.categoria.id === event.currentTarget.id);
            loadProducts(productFilter);
        } else {
            mainTitle.innerText = "Teclados Custom";
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


