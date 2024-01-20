class ViewConf {
     constructor() {
          this.confBoxEl = document.querySelector(".modal-conf");
          this.confEl = document.querySelector(".conf");
          this.billNumberEl = document.querySelector(".last-bill-n");
          this.cancelBtnEl = document.querySelector(".conf-cancel-btn");
          this.submitBtnEl = document.querySelector(".conf-submit-btn");
          this.formEl = document.querySelector(".modal-conf form");
     }

     displayBillNumber(billNumber) {
          this.billNumberEl.textContent = billNumber;
     }

     //*****************//

     addHandlerCancelBtn(handler) {
          this.cancelBtnEl.addEventListener("click", handler);
     }
     //*****************//
     addHandlerSubmitBtn(handler) {
          this.submitBtnEl.addEventListener("click", handler);
     }
}

export default new ViewConf();
