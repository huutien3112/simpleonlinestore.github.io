const products = [
    {
        name: 'Milk',
        price: 10,
    },
    {
        name: 'Egg',
        price: 4,
    },
    {
        name: 'Mineral Water',
        price: 1,
    }

]

let cart = {
    item: [],
    totalPrice: 0,
}

function renderAllProduct(){
    const cartItemTable = document.getElementById('cart-items')
    cartItemTable.innerHTML = ''
    if(cart.item.length === 0){
        cartItemTable.innerHTML = `
            <tr>
                <td colspan="5">
                    There is no item in cart yet
                </td>
            </tr>
        `
    } 

    cartItems.forEach((cartItem, index) => {
        cartItemTable.innerHTML += `
        <tr>
            <td>${cartItem.name}</td>
            <td>${cartItem.price}</td>
            <td>${cartItem.quantity}</td>
            <td>${cartItem.total}</td>
            <td>
                <button class="btn btn-success">
                REMOVE FORM CART
                </button>
            </td>    
        </tr>
        `
    })
}

function addToCart(productIndex){
    const product = product[productIndex]
    let isAreadyInCart = false

    let newCartItems = cart.items.reduce((state, item) => {
        if(item.name === product.name){
            isAreadyInCart = true
            const newItem = {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price
            }
            return [...state, newItem];
        }
        return [...state, newItem]
    }, [])

    if(!isAreadyInCart){
        newCartItems.push({
            ...product,
            quantity: 1,
            total: product.price,
        })
    }
    cart = {
        ...cart,
        items: newCartItems, 
    }
    renderAllCartItems()
}

renderAllCartItems()
renderAllProduct()