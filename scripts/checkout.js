import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

//added matchingId to radio selectors 
//single dot slash means same folder
//PART F is creating function of repeated codes like pricecents in utility folder
//PART G changing radioselector

//PART E combining all html
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId; //PART B get productid from cart js file

  let matchingProduct; //PART C get full products from product js file
  
  //PART D looping through product js file array
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product; //check whether product.id property of product js file with above productId of cart js file
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
         ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 `;
});

document.querySelector('.js-order-summary')
 .innerHTML = cartSummaryHTML;

 //PART H delete button ==> remove product from cart and update html
 //to know which product to delete add product's data id to delete button
 document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      //remove id from cart ==> go to cart js
      //coming from cart js file
      removeFromCart(productId);
       //only one product remained that is basketball not socks in console
    });
  });

