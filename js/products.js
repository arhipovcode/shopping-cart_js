'use strict';

let mainProductBlock = document.querySelector('.main-product');
let productImage = 1;
let productObj = {
  productName: {
    1: 'MacBook Pro',
    2: 'Keyboard Magic',
    3: 'Gamepad',
    4: 'Mouse Magic',
  }
};



for(let i = 1; i <= 4; i++) {
  let randomNumberPrice;
  let addProduct = `
                <div class="product">
                  <div class="product-image">
                    <img src="image/${productImage = i}.jpg" alt="Утюг">
                  </div>
                  <h2 class="product-title">${productObj.productName[i]}</h2>
                  <div class="product-price">
                    <p class="price">
                      Цена: <span>${randomNumberPrice = randomPrice()} &#8381;</span>
                    </p>
                  </div>
                  <button class="product-add-btn">
                    В корзину
                  </button>
                </div>`;
  mainProductBlock.insertAdjacentHTML('beforeend', addProduct);
}

function randomPrice() {
  return Math.floor(Math.random() * (20000 - 1000)) + 1000;
}