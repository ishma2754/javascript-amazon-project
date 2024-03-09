import {
  cart, 
  removeFromCart, 
  calculateCartQuantity, 
  updateQuantity, 
  updateDeliveryOption
} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; //write url of esm
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';//default export only when importing 1 thing // import the file without curly brackets but only when importing one file NAMED EXPORT
import {deliveryOptions} from '../data/deliveryOptions.js';


hello();

dayjs(); //all lower case

const today = dayjs(); //fetch current date
const deliveryDate = today.add(7,'days'); //add two parameters add 7 days to today's date
console.log(deliveryDate.format('dddd, MMMM D'));





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


  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs(); //to call today's date
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );


  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
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
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
            Update
          </span>
          <input class = "quantity-input js-input-${matchingProduct.id}">
            <span class = "save-quantity-link link-primary js-save-link" data-product-id = "${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
 `;
});

function deliveryOptionsHTML (matchingProduct, cartItem) {

  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs(); //to call today's date
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );

    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    const priceString = deliveryOption.priceCents === 0 ?  'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;//if price is zero freeshipping otherwise ternary operator

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //we need to have blue tick when we load page//we don't have access to cartItem
    html += ` 
      <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" 
      data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
           ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return html;
}

document.querySelector('.js-order-summary')
 .innerHTML = cartSummaryHTML;

 //PART H delete button ==> remove product from cart and update html
 //to know which product to delete add product's data id to delete button
 //update html ==> remove product from page, use remove method ==> first is to see which product to remove by using special class
 document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      //remove id from cart ==> go to cart js
      //coming from cart js file
      removeFromCart(productId);
       //only one product remained that is basketball not socks in console

       //update html
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCartQuantity();
    });

    
  });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;
   }
  
   updateCartQuantity();
  

  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    })
  });

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      const input = document.querySelector(`.js-input-${productId}`);
      const newQuantity = Number(input.value);
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

      quantityLabel.innerHTML = newQuantity;
     
      updateCartQuantity();
     
  
    });
  });

  document.querySelectorAll('.js-delivery-option')
   .forEach((element) => {
     element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
    });
   });
 
  