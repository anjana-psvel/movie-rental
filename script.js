const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});


document.addEventListener('DOMContentLoaded', loadFood);

function loadFood(){
  loadContent();
}

function loadContent(){
  //remove items from cart
  let btnRemove = document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener("click", removeItem);
  });

  //product item change event
  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener("change", changeQty);
  });
  
// add to cart
let cartBtns = document.querySelectorAll('.add-cart');
cartBtns.forEach((btn)=>{
  btn.addEventListener('click', addCart);
});

updateTotal();
}

//remove item func
function removeItem(){
  if(confirm('Are you sure to remove?')){
    let title= this.parentElement.querySelector('.cart-movie-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }  
}
//change quantity
function changeQty(){
  if (isNaN(this.value) || this.value<1 ){
    this.value=1;
  }
}

let itemList=[];
//add cart function

function addCart(){
    let movie = this.closest('.movies');
    let title = movie.querySelector('.movie-name').innerHTML;
    let price  = movie.querySelector('.price').innerHTML;
    let imgSrc = movie.querySelector('.movie-poster').src;

let newProduct = {title, price, imgSrc}

//check product if it already exist in cart

if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product already in cart");
}
else{
  itemList.push(newProduct);
}

let newProductElement = createCartProduct(title, price, imgSrc);
let element = document.createElement('div');
element.innerHTML=newProductElement;
let basket = document.querySelector('.cart-content');
basket.append(element);
loadContent();
}

function createCartProduct(title, price, imgSrc){

  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-movie-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
      <div class="cart-amt">${price}</div>
    </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>
  </div> `;
}

function updateTotal(){
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total=0;
  cartItems.forEach(product=>{
    let priceElement = product.querySelector('.cart-price');
    let price= parseFloat(priceElement.innerHTML.replace('$',''));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="$"+(price*qty);
  });
  totalValue.innerHTML = '$'+total;

// Add Product Count in Cart Icon

const cartCount=document.querySelector('.cart-count');
let count=itemList.length;
cartCount.innerHTML=count;

if(count==0){
  cartCount.style.display='none';
}else{
  cartCount.style.display='block';
}
}























































































