import * as model from "./model.js";
import { shopCartView, coursesView } from "./views.js";

//----------------------------//
const controlAddCourse = function (btn) {
     const course = btn.parentElement.id;
     const selectedCourse = model.state.courses.find(
          (el) => el.name === course
     );

     if (
          !model.state.cart.some(
               (course) => course.name === selectedCourse.name
          )
     ) {
          selectedCourse.amount = 1;
          model.state.cart.push(selectedCourse);
     } else {
          selectedCourse.amount++;
     }
     shopCartView._displayCourses(model.state.cart);
};

//----------------------------//

const controlDisplayCourses = function () {
     coursesView._displayCourses(model.state.courses);
};

//----------------------------//

const controlToggleCart = function () {
     shopCartView._parentElement
          .closest(".cart")
          .classList.toggle("cart__active");

     if (model.state.cart.length === 0) shopCartView.renderMessage();
};
//----------------------------//

const controlCloseCart = function (e) {
     const cartBox = shopCartView._parentElement.closest(".cart");

     if (!shopCartView._cartBtn.contains(e.target) && e.target !== cartBox) {
          cartBox.classList.remove("cart__active");
     }
};
//----------------------------//
const init = function () {
     shopCartView._addHandlerToggleCart(controlToggleCart);
     shopCartView._addHandlerCloseCart(controlCloseCart);
     coursesView._addHandlerAddCourse(controlAddCourse);
     coursesView.addHandlerDisplayCourses(controlDisplayCourses);
};
init();
