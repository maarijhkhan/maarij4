// CART
let cartIcon = document.querySelector("#cart-icon");

let cart = document.querySelector(".cart");

let closeCart = document.querySelector("#close-cart");

//cart functionality performance
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// MAKING FUNCTION
function ready(){
    var remcartbuttons = document.getElementsByClassName('fa-trash');
    console.log(remcartbuttons);
    
    for(var i =0; i<remcartbuttons.length; i++){
        var button = remcartbuttons[i]
        button.addEventListener('click', removeCartItem);
    }

    //Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i =0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    } 
    //ADD TO CART
    var addCart = document.getElementsByClassName('fa-cart-plus')
    for(var i =0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click",addCartClicked)
    }
    //Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
}

//buy button function
function buyButtonClicked(){
    alert("your order is placed");
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

//REMOVE ITEMS FROM CART
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantityChanged
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value  = 1
    }

    updatetotal();

}

//ADD CART FUNCTION
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText
    var price = shopProducts.getElementsByClassName("price")[0].innerText
    var productImage = shopProducts.getElementsByClassName("product-img")[0].src
    addProductToCart(title,price,productImage);
    updatetotal();
}
function  addProductToCart(title,price,productImage){
    var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");

    for(var i =0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;

        }
    }

var cartBoxContent =`<img src="${productImage}" height="50vh" width="50vh" class="cart-img">
<div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity">
</div>
<!-- remove item -->
<i class="fa fa-trash" ></i>
`;


cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
.getElementsByClassName('fa-trash')[0]
.addEventListener("click",removeCartItem);
cartShopBox
.getElementsByClassName('cart-quantity')[0]
.addEventListener("change",quantityChanged);
}











// for total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBoxes = cartBoxes[i];
        var priceElement = cartBoxes.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBoxes.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

        //IF VALUE CONTAIN CENTS
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    }
}

