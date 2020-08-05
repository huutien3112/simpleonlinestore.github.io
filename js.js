document.addEventListener("DOMContentLoaded", function () {
    $(function () {
        $('img.img-child').hover(function () {
            let img = $(this).attr('src');
            $('img#img-main').attr('src', img);
        })
    })
    // $(function () {
    //     $('.header__navbar-item--register').click(function () {
    //         $('.header__navbar-register').addClass('header__navbar-register--open');
    //         $('.header__overlay').addClass('header__overlay-open');
    //     })
    //     $('.register__close').click(function () {
    //         $('.header__navbar-register').removeClass('header__navbar-register--open');
    //         $('.header__overlay').removeClass('header__overlay-open');
    //     })
    //     $('.header__navbar-item--logIn').click(function () {
    //         $('.header__navbar-logIn').addClass('header__navbar-logIn--open');
    //         $('.header__overlay').addClass('header__overlay-open');
    //     })
    //     $('.logIn__close').click(function () {
    //         $('.header__navbar-logIn').removeClass('header__navbar-logIn--open');
    //         $('.header__overlay').removeClass('header__overlay-open');
    //     })
    // })

}, false)
$(function (){
    // navbar hiện khi scroll xuống
    $(window).scroll(function () {
        if($(this).scrollTop()>250){
            $('.header__navbar-2').addClass('header__navbar-2-add');
            $('.scrolltotop').addClass('scrolltotop__show');

        }
        else{
            $('.header__navbar-2').removeClass('header__navbar-2-add');
            $('.scrolltotop').removeClass('scrolltotop__show');

         }
    });
    // scroll to top
    $('.scrolltotop').click(function () { 
        $('html,body').animate({scrollTop:0}, 500);
    });

});

function clickCounter() {
    if(typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      
      }
      document.getElementById("result").innerHTML = localStorage.clickcount;
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }
  function clickCounterr() {
    if(typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)-1;

      }
      document.getElementById("result").innerHTML = localStorage.clickcount;
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }




    // cart 2
    let carts = document.querySelectorAll('.add-cart');
    let products = [
      {
        name: 'Tivi 1',
        tag: 'Television 1',
        price: 15,
        inCart: 0
      },
      {
        name: 'Tivi 2',
        tag: 'Television 2',
        price: 20,
        inCart: 0
      },
      {
        name: 'Tivi 3',
        tag: 'Television 3',
        price: 15,
        inCart: 0
      },
      {
        name: 'Tivi 4',
        tag: 'Television 4',
        price: 20,
        inCart: 0
      },
      
    ];

    for (let i=0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i])
        })
    }

    function onLoadCartNumbers(){
      let productNumbers = localStorage.getItem('cartNumbers');

      if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
      }
    }


    
    function cartNumbers(product){

      let productNumbers = localStorage.getItem('cartNumbers');

      productNumbers = parseInt(productNumbers);

      if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
      } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
      }

      setItems(product);
    }

    function setItems(product){
      let cartItems = localStorage.getItem('productsInCart');
      cartItems = JSON.parse(cartItems);

      if (cartItems != null){
        
        if(cartItems[product.tag] == undefined){
          cartItems = {
            ...cartItems,
            [product.tag]: product
          }
        }
        cartItems[product.tag].inCart += 1;
      } else{
        product.inCart = 1;
        cartItems = {
          [product.tag]: product
      }
      }

      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    }

    function totalCost(product){
      // console.log("the price", product.price);
      let cartCost = localStorage.getItem('totalCost');
      

      console.log("my cost is", cartCost);
      console.log(typeof cartCost);

      if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
      }else{
        localStorage.setItem("totalCost", product.price);
      }
    }

    function displayCart(){
      let cartItems = localStorage.getItem("productsInCart")
      cartItems = JSON.parse(cartItems);
      let productContainer = document.querySelector(".products");
      let cartCost = localStorage.getItem('totalCost');


      console.log(cartItems);
      if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
          productContainer.innerHTML += `
          <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span>${item.name}</span>
          </div>  
          <div class="price">
            $${item.price},00
          </div>
          <div class="quantity">
            <ion-icon name="arrow-back-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="arrow-forward-circle-outline"></ion-icon>
          </div>
          <div class="total">
            $${item.inCart * item.price},00
          </div>
          `
        });
        productContainer.innerHTML += `
          <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
              Basket Total
            </h4>
            <h4 class="basketTotal">
              $${cartCost},00
            </h4>
        `;
      }
    }

    onLoadCartNumbers();
    displayCart();