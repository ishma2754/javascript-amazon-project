//PART E
//Add products to this cart
export const cart = [{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];// no need to save data twice inside products array and cart array we can search through product id ===> de-duplicating data/normalizing the data
 //export the variable that you want to take out

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
 }

