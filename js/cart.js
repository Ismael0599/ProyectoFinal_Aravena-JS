// Obtener los datos del carrito desde localStorage si este existe
const productCart = JSON.parse(localStorage.getItem('Producto-carrito')) || [];

// Seleccionar los elementos del DOM
const emptyCart = document.querySelector("#empty-cart");
const containerCartProducts = document.querySelector("#cart-box");
const cartNumber = document.querySelector(".cart-num");
const cartNumberH = document.querySelector(".numero-carrito");
const cartProductsContainer = document.querySelector(".cart-item-container");
const backButton = document.querySelector(".btn-continue-empty");

// Prefijo para las imágenes
const imagePrefix = "../";

function updateCart() {
    if (productCart.length > 0) {
        emptyCart.classList.add("disabled");
        backButton.classList.add("disabled");
        containerCartProducts.classList.remove("disabled");

        cartProductsContainer.innerHTML = ''; // Limpia los productos anteriores

        productCart.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                    <img src="${imagePrefix + product.imagen}" alt="${product.titulo}" class="product-image">
                    <div class="product-details">
                        <h3>${product.titulo}</h3>
                        <p class="category">Keyboard ${product.categoria.nombre}</p>
                    </div>
                    <div class="product-price">$${product.precio}</div>
                    <div class="product-quantity">                        
                        <span class="quantity">cantidad: (${product.cantidad})</span>                       
                        <button class="delete-btn" id="${product.id}" title="Delete"><i class="bi bi-trash-fill"></i></button>
                    </div>
                `;
            cartProductsContainer.append(div);

            // Event listener para eliminar producto
            const deleteButton = div.querySelector(".delete-btn");
            deleteButton.addEventListener("click", () => {
                removeProductFromCart(product.id);
            });

        });

        // Generar y agregar el resumen solo una vez
        const summaryDiv = document.createElement("div");
        summaryDiv.classList.add("summary");
        summaryDiv.innerHTML = `
                <h3>Resumen de la compra</h3>
                <div class="summary-detail">
                    <p>Productos</p>
                    <hr class="divisor">
                    <div class="price-detail">
                        <p>Total:</p>
                        <p class="total-price">$${productCart.reduce((acc, product) => acc + (product.precio * product.cantidad), 0)}</p>
                    </div>
                    <button class="checkout-btn">Comprar</button>
                </div>
            `;
        containerCartProducts.append(summaryDiv);

    } else {
        emptyCart.classList.remove("disabled");
        backButton.classList.remove("disabled");
        containerCartProducts.classList.add("disabled");
    }
}

// Función para eliminar un producto del carrito
function removeProductFromCart(productId) {

    // Crea un nuevo Array de productos eliminando el correspondiente
    const updatedCart = productCart.filter(product => product.id !== productId);

    // Actualizar el array y el localStorage
    localStorage.setItem('Producto-carrito', JSON.stringify(updatedCart));

    // Volver a cargar la página o actualizar el carrito
    location.reload();
}

// Actualizar número de productos en el carrito
function updateCartNum() {
    const cartNum = productCart.reduce((accumulator, product) => accumulator + product.cantidad, 0);
    cartNumber.innerText = `(${cartNum} Productos)`;
    cartNumberH.innerText = cartNum;
    localStorage.setItem('productos-carrito-cantidad', cartNum);
}

// Inicializar la cantidad del carrito al cargar la página
function initializeCartNum() {
    const savedCartNum = localStorage.getItem('productos-carrito-cantidad');
    if (savedCartNum !== null) {
        if (savedCartNum == 1) {
            cartNumber.innerText = "(" + savedCartNum + " Producto)";
        } else {
            cartNumber.innerText = "(" + savedCartNum + " Productos)";
        }

        cartNumberH.innerText = savedCartNum;
    } else {
        updateCartNum();
    }
}



updateCart();
updateCartNum();
initializeCartNum();

