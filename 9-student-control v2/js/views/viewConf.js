class ViewConf {
     constructor() {
          this.confBoxEl = document.querySelector(".modal-conf");
          this.confEl = document.querySelector(".conf");
          this.billNumberEl = document.querySelector(".last-bill-n");
     }

     displayBillNumber(billNumber) {
          this.billNumberEl.textContent = billNumber;
     }
}

export default new ViewConf();
