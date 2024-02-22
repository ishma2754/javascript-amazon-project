//steps to use Javascript
//1. Save the data
//2. generate the html ==> then put it on the page through DOM
//3. make it inetractive ==> Add eventListener to add to cart button


//1. save the data + data structure + PART A
// we will use object as it groups multiple values together
//toFixed is used to convert number to decibles


/*
const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating:{
    stars: 4.5,
    count: 87
  },
  priceCents: 1090 //calculate in cents
},{
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: ' Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095
},{
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name:' Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799
}, {
  image: 'images/products/black-2-slot-toaster.jpg',
  name: '2 Slot Toaster - Black',
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899
}];
*/

//PART C 

let productsHTML = ''; //add all the html in this variable

//LOOP THROUGH ARRAY ==> save each object and save them in paramemeter which is product and then run function
//after looping we create html for each product
//here use product.name as value is stored in product now not products

//PART B

products.forEach((product) => {
  //  const html = --> replaced
  //accumulator pattern
  productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
      Add to Cart
    </button>
  </div>
  `;
});



//PART C
document.querySelector('.js-products-grid')
 .innerHTML = productsHTML;



//PART D
//target all add to cart button
//loop through each of the button
 document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      //PART E 
      //attach product's name to button through data**
      //it will show product name in  console whose button is clicked
      const productName = button.dataset.productId;
      //PART E
      //add this variable to cart with name and quantity


      //PART F
      //1. check if product is already in the cart
      //2. if yes then increase the quantity
      //check if product is in array ===> loop through cart, if productName above equals to item's productName
      //PART F
      let matchingItem;
      cart.forEach((item) => {
        if (productId === item.productId){
          //if we find matching item then save in variable
          matchingItem = item;
        }
      });

      if (matchingItem) {
        //matchingItem is object which is truthy value
        //add 1 in quantity
        matchingItem.quantity += 1;
      } else {
        //if not in cart then push it in cart
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      /*
      /PART E
      cart.push({
        productName: productName,
        quantity: 1
      });
      */
      console.log(cart);
    });
    
  });


  
  //PART E
  //add a product to a cart which is list of product we want to buy and its quantity
  //represent this as an array contains object
  //separate cart in other file ==> add products to this cart using data attribute which is id element that is specific to one product
  //data attribute have to start with "data-" then name(kebab case)
  //attach product's name to button through data

