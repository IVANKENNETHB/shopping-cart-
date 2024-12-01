let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCardsContainer = document.querySelector('.listcard'); 
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantityDisplay = document.querySelector('.quantity'); 

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});
//dito naka  object array ako para sa storing ko ng mga item 
let products = [
    { id: 1, name: 'White Lavender Scent', image: 'tide1.jpg', price: 560 },
    { id: 2, name: 'Hyglenic Clean', image: 'tide2.jpg', price: 550 },
    { id: 3, name: 'Spring & Renewal', image: 'tide3.jpg', price: 530 },
    { id: 4, name: 'Clean Breez Scent', image: 'tide4.jpg', price: 530 },
    { id: 5, name: 'Simply Pods + Odor Defence', image: 'tide5.jpg', price: 530 },
    { id: 6, name: 'Botanical Rain', image: 'tide6.jpg', price: 500 },
    { id: 7, name: 'Ocean Mist Scent', image: 'tide7.jpg', price: 509 },
];

/**dito naman sa line na are ay para sa aking cards or bag 
 gumamit ako ng foreach at innerHTML para sa aking mga badong div 
 tas gumamit ako ng DOM method para sa mga bagong div*/
let cart = [];

function initApp() {
    products.forEach((product, index) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${product.image}" alt="${product.name}"/>
            <div class="title">${product.name}</div>
            <div class="price">${product.price.toLocaleString()}</div>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        list.appendChild(newDiv);
    });
}
/**dito naman gamit ang id ng item pag may pinindot ako na add to cart dun sa product na napili ko sya ang mag didisplay  */
initApp();
function addToCart(index) {
    let existingProduct = cart.find(item => item.id === products[index].id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        let newProduct = { ...products[index], quantity: 1 };
        cart.push(newProduct); 
    }
    reloadCart();
}
/** dito sa reload naman  pag naka pili nako ng product ang gagawen nya ay tatanggalin nya yung existing na nasaloob ng foreach */
function reloadCart() {
    listCardsContainer.innerHTML = ''; 
    let count = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        count += item.quantity;

        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="img/${item.image}" alt="${item.name}"/></div>
            <div>${item.name}</div>
            <div>${item.price.toLocaleString()}</div>
            <div>${item.quantity}</div>
            <div>
                <button onclick="changeQuantity(${index}, ${item.quantity - 1})">-</button>
                <div class="count">${item.quantity}</div>
                <button onclick="changeQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
        `;
        listCardsContainer.appendChild(newDiv);
    });

    total.innerText = totalPrice.toLocaleString(); 
    quantityDisplay.innerText = count;
}
/**dito naman sa line na are medyo nakaka lito pero are ay para sa pag bawas at pag dagdag ng quantity*/ 
function changeQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity = newQuantity;
    }
    reloadCart();
}
