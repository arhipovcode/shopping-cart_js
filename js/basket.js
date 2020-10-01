'use strict';

let basketProduct = document.querySelector('.basket-product'),
    basketEmpty =document.querySelector('.basket-empty'),
    basket = document.querySelector('.basket'),
    basketBtn = document.querySelector('.header-basket-btn'),
    addBasketBtn = document.querySelectorAll('.product-add-btn'),
    product = document.querySelectorAll('.product'),
    total = document.querySelector('.total span');

basketBtn.addEventListener('click', getBasket);

function getBasket() {
  if(basketProduct.querySelector('.productBlock') == null) {
    basketEmpty.classList.add('show');
    setTimeout(() => {
      basketEmpty.classList.remove('show');
    }, 2000);
    return;
  }
  basket.classList.toggle('show');
}


function getListenerBtn() {
  let minusBtnQuantity = document.querySelectorAll('.minus-quantity');
  let plusBtnQuantity = document.querySelectorAll('.plus-quantity');
  let trash = document.querySelectorAll('.trash');

  trash.forEach((elem) => {
    elem.addEventListener('click', removeProductBlock);
  });

  minusBtnQuantity.forEach((btnMin) => {
    btnMin.addEventListener('click', getMinusQuantityProduct);
  });

  plusBtnQuantity.forEach((plusBtn) => {
    plusBtn.addEventListener('click', getPlusQuantityProduct);
  });
}

function getMinusQuantityProduct(e) {
  if(e.target.parentNode.querySelector('.quantityProduct').innerText == 1) {
    return;
  } else {
    e.target.parentNode.querySelector('.quantityProduct').innerText--;
    total.innerText = productBasket.renderTotalSum();
  }
}
function getPlusQuantityProduct(e) {
  e.target.parentNode.querySelector('.quantityProduct').innerText++;
  total.innerText = productBasket.renderTotalSum();
}

function removeProductBlock(e) {
  e.target.parentNode.parentNode.remove();
  total.innerText = productBasket.renderTotalSum();
  if(basketProduct.querySelector('.productBlock') == null) {
    basket.classList.remove('show');
    return;
  }
}

product.forEach((item, index) => {
  item.setAttribute('data-id', index);
});

addBasketBtn.forEach((btn) => {
  btn.addEventListener('click', function(e) {
    let productId,nameProduct,priceProduct,product;
    if(e.target.tagName == "BUTTON") {
      productId = e.target.parentNode.getAttribute('data-id');
      nameProduct = e.target.parentNode.querySelector('.product-title').innerText;
      priceProduct = parseInt(e.target.parentNode.querySelector('.price span').innerText);

      product = {
        count: 1,
        quantity: 1,
        id: productId,
        name: nameProduct,
        price: priceProduct,
      };

      productBasket.addProductBasket(product);
    }
  });
});

const productBasket = {
  products: {},

  renderTotalSum() {
    let sum = 0;

    for(let i = 0; i < basketProduct.querySelectorAll('.productBlock').length; i++) {
      sum += Number(basketProduct.children[i].querySelector('.priceProduct').innerText) * Number(basketProduct.children[i].querySelector('.quantityProduct').innerText);
    }

    return sum;
  },

  addProductBasket(product) {

    let idProduct = basketProduct.querySelectorAll('.idProduct');
    
    for(let i = 0; i < idProduct.length; i++) {
      if(idProduct[i].innerText == product.id) {
        idProduct[i].parentNode.parentNode.querySelector('.quantityProduct').innerText++;
        total.innerText = this.renderTotalSum();
        return;
      } else {
        product.count++;
      }
    }


    let productBlock = `
              <div class="productBlock">
                <div class="wrapProdEl">
                  <div class="numberProduct">${product.count}</div>
                  <div class="idProduct">${product.id}</div>
                  <div class="nameProduct">${product.name}</div>
                </div>
                <div class="wrapProdEl">
                  <div class="quantity-block"><span class="minus-quantity">-</span><span class="quantityProduct">${product.quantity}</span><span class="plus-quantity">+</span></div>
                  <div class="priceProduct">${product.price}</div>
                  <img class="trash" src="image/trash.svg" alt="Удалить">
                </div>
              </div>`;
  
    basketProduct.insertAdjacentHTML('beforeend', productBlock);
    
    total.innerText = this.renderTotalSum();
    getListenerBtn();
  }
};