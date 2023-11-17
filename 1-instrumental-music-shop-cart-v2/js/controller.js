import * as model from "./model.js";
import { shopCartView, coursesView } from "./views.js";

//----------------------------//
const controlAddCourse = function (btn) {
     const course = btn.parentElement.id;
     const selectedCourse = model.state.courses.find(
          (el) => el.name === course
     );

     const exist = model.state.cart.some(
          (course) => course.name === selectedCourse.name
     );

     if (!exist) {
          selectedCourse.amount = 1;
          selectedCourse.totalPrice = selectedCourse.price;
          model.state.cart.push(selectedCourse);
          shopCartView._displayCourses(model.state.cart);
     } else {
          selectedCourse.amount++;
          selectedCourse.totalPrice =
               selectedCourse.totalPrice + selectedCourse.price;
          shopCartView._update(selectedCourse);
     }
};

//----------------------------//

const controlDeleteCourse = function (btn) {
     const course = btn.parentElement.id;
     const selectedCourse = model.state.cart.find((el) => el.name === course);

     if (selectedCourse.amount > 0) {
          selectedCourse.amount--;
          selectedCourse.totalPrice =
               selectedCourse.totalPrice - selectedCourse.price;
          shopCartView._update(selectedCourse);
     }

     if (selectedCourse.amount === 0) {
          model.state.cart = model.state.cart.filter(
               (course) => course.name !== selectedCourse.name
          );
          shopCartView._displayCourses(model.state.cart);
     }
     if (model.state.cart.length === 0) shopCartView.renderMessage();
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
const controlClearCart = function () {
     model.state.cart = [];
     shopCartView._displayCourses(model.state.cart);
     if (model.state.cart.length === 0) shopCartView.renderMessage();
};
//----------------------------//
const init = function () {
     shopCartView._addHandlerToggleCart(controlToggleCart);
     shopCartView._addHandlerDeleteCourse(controlDeleteCourse);
     shopCartView._addHandlerClearCart(controlClearCart);
     coursesView._addHandlerAddCourse(controlAddCourse);
     coursesView.addHandlerDisplayCourses(controlDisplayCourses);
};
init();
