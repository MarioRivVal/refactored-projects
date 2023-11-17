///////////////////////////////////////////

class ShopCartView {
     _data;
     _parentElement = document.querySelector(".cart__selections");
     _message = "Any course selected yet. Please select one";

     _cartBtn = document.querySelector(".navigation__img-box");
     _cartClearBtn = document.querySelector(".cart__empty-cart");

     //----------------------------//
     renderMessage(message = this._message) {
          const markup = `
                         <div class="message">
                              <p>${message}</p>
                         </div> 
          `;

          // this._parentElement.innerHTML = "";
          this._parentElement.insertAdjacentHTML("afterbegin", markup);
     }
     //----------------------------//

     _displayCourses(data) {
          this._data = data;
          this._parentElement.innerHTML = "";

          this._data.forEach((course) => {
               const { name, totalPrice, img, amount } = course;

               const markup = `
               
                         <div class="cart__row" id="${name}">
                              <img
                                   src="img/${img}"
                                   alt="${name} photo"
                                   class="cart__row-img"
                              />
                              <p class="cart__row-name">${name}</p>
                              <p class="cart__row-price">${totalPrice}€</p>
                              <p class="cart__row-amount">${amount}</p>
                              <a href="" class="cart__row-delete">x</a>
                         </div> 
               `;
               this._parentElement.insertAdjacentHTML("afterbegin", markup);
          });
     }
     //----------------------------//

     _update(course) {
          document.querySelector(
               `#${course.name} .cart__row-price`
          ).textContent = `${course.totalPrice}€`;

          document.querySelector(
               `#${course.name} .cart__row-amount`
          ).textContent = course.amount;
     }

     //----------------------------//
     _addHandlerToggleCart(handler) {
          this._cartBtn.addEventListener("click", handler);
     }
     //----------------------------//

     _addHandlerClearCart(handler) {
          this._cartClearBtn.addEventListener("click", handler);
     }
     //----------------------------//

     _addHandlerDeleteCourse(handler) {
          this._parentElement.addEventListener("click", (e) => {
               e.preventDefault();
               const btn = e.target.closest(".cart__row-delete");
               if (!btn) return;
               handler(btn);
          });
     }
     //----------------------------//
}

///////////////////////////////////////////

class CoursesView {
     _data;
     _parentElement = document.querySelector(".cards");

     //----------------------------//
     _displayCourses(data) {
          this._data = data;

          this._data.forEach((course) => {
               const { name, price, img } = course;
               const markup = `
          
              <div id="${name}" class="card card--1">
                    <img
                         src="img/${img}"
                         alt="${name} photo"
                         class="card__img"
                    />
                    <h2 class="card__name">${name}</h2>
                    <p class="card__price">${price}€ / <span>month</span></p>
                    <a href="#" class="card__btn">add to cart</a>
               </div>
          
          `;

               this._parentElement.insertAdjacentHTML("afterbegin", markup);
          });
     }
     //----------------------------//

     addHandlerDisplayCourses(handler) {
          window.addEventListener("load", handler);
     }

     //----------------------------//
     _addHandlerAddCourse(handler) {
          this._parentElement.addEventListener("click", (e) => {
               e.preventDefault();

               const btn = e.target.closest(".card__btn");
               if (!btn) return;
               handler(btn);
          });
     }
}

export const shopCartView = new ShopCartView();
export const coursesView = new CoursesView();
