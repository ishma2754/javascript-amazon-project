//PART E
//Add products to this cart
export const cart = []; //export the variable that you want to take out

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

