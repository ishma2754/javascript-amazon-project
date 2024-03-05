//PART E
//Add products to this cart
export let cart = JSON.parse(localStorage.getItem('cart')); 

//if we don't have  cart or empty to have default value
if (!cart) {
  cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];// no need to save data twice inside products array and cart array we can search through product id ===> de-duplicating data/normalizing the data
   //export the variable that you want to take out
}

//PART I OF CHECKOUT JS ==> convert to string
 function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
 }

export function addToCart (productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      //if we find matching item then save in variable
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    //matchingItem is object which is truthy value
    //add 1 in quantity
    matchingItem.quantity += 1;
    matchingItem.quantity += quantity;
  } else {
    //if not in cart then push it in cart
    cart.push({
      productId,
      quantity: 1,
      quantity
    });
  }

  saveToStorage();
 }




//PART H of delete button in checkout js file
//1.create a new array 
//2.loop through the cart
//3. add new product to the new array, except for this productId that means removing it from cart
//add new items to this cart  if it is not equal to the productid we trying to remove we will add others to cart
export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; //replace cart with new one

  saveToStorage();
}