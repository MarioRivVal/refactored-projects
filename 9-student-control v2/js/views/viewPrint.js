import helper from "../helpers.js";

class ViewPrint {
     constructor() {
          this.allCheckboxesPrintEl = null;
          this.btnPrintEl = document.querySelector(".btn-print");
          this.printStyle =
               "*,*::before,*::after {margin: 0;padding: 0;box-sizing: inherit;}html {font-size: 62.5%;@media only screen and (max-width: 56.25em){font-size: 50%;}@media only screen and (max-width:37.5em) {font-size: 37.5%;}}body{position: relative;box-sizing: border-box;display: flex;flex-direction: column;font-family:'lato',sans-serif;color: #4a4e68;background-color: #4a4e68;}.all-bills { display: grid;grid-template-columns: repeat(2, 1fr);grid-template-rows: repeat(3, 1fr);background-color: antiquewhite;width: 210mm;border: 1px solid black;}.bill {padding: 1.5rem;background-color: azure; display: flex;flex-direction: column;gap: 1rem; align-items: center;justify-content: space-between; border: 2px solid #9a8d98; border-radius: 5px;page-break-inside: avoid;}.bill .paid {font-size: 1.6rem;text-transform: uppercase;font-weight: 700;}.paid-month {display: flex;gap: 0.5rem;text-transform: uppercase;font-size: 1.6rem;font-weight: 700;}.student-info { align-self: flex-start;}.student-info > * {margin-bottom: 1rem;font-size:1.6rem;}.details { display: flex;gap: 0.5rem;}.footer { width: 100%;display: flex; justify-content: space-around;}.footer > div > p:last-child {padding: 0 2rem;font-size: 1.2rem;text-transform: uppercase;border-top: 1px solid #9a8d98;}.sign-box p {margin-top:14px;}.date-box .date {text-align: center;font-size: 1.2rem;}";
     }
     //*****************//
     loadPrintPage(elementsToPrint, billNumber, updateBillNumberFunc) {
          let newBillNumber = billNumber;

          const htmlToPrint = [];

          elementsToPrint.forEach((el) => {
               const {
                    name,
                    surname,
                    city,
                    quota,
                    address,
                    dni,
                    year,
                    paidMonths,
                    reason,
               } = el;

               for (let i = 0; i < paidMonths.length; i++) {
                    newBillNumber = billNumber++;
                    const billHTML = `
            <div class="bill">
                    <div class="paid-month">
                        <p class="month">${paidMonths[i]}</p>
                        <p class="year">${year}</p>
                        <p class="bill-number"> -- Factura N: ${
                             newBillNumber + 1
                        }</p>
                    </div>
                    <div class="student-info">
                        <div>
                            <h4>Nombre:</h4>
                            <div class="details">
                            <p class="name">${name}</p>
                            <p class="surname">${surname}</p>
                            </div>
                        </div>
                        <div>
                            <h4>DNI:</h4>
                            <p class="dni">${dni}</p>           
                        </div>
                        <div>
                            <h4>Direccion:</h4>
                            <div class="details">
                            <p class="address">${address}</p>
                            <p class="city">${city}</p>
                            </div>
                        </div>
                        <div>
                            <h4>Concepto:</h4>
                            <p class="reason">${reason}</p>           
                        </div>
                    </div>
                    
                    <p class="paid">Pagado - ${quota}€</p>
                    <div class="footer">
                        <div class="sign-box">
                            <p>firma</p>
                        </div>
                        <div class="date-box">
                            <p class="date">${helper.createDate()}</p>
                            <p>fecha</p>
                        </div>
                    </div>
                </div>

            `;

                    htmlToPrint.push(billHTML);
               }
          });
          if (htmlToPrint.length) this.printBills(htmlToPrint);

          updateBillNumberFunc(newBillNumber + 1);
     }

     printBills(htmls) {
          const headerContent = `<html><head><title>Print Bills</title><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/><style>${
               this.printStyle
          }</style></head><body><section class="all-bills">${htmls.join(
               ""
          )}</section></body></html>`;

          try {
               const printWindow = window.open();
               if (printWindow) {
                    printWindow.document.write(headerContent);
                    printWindow.document.close();

                    printWindow.onload = function () {
                         printWindow.print();
                    };
               } else {
                    alert("Please disable your popup blocker and try again");
               }
          } catch (error) {
               console.error("An error occurred while trying to print:", error);
          }
     }
     //*****************//
     addHandlerPrint(handler) {
          this.btnPrintEl.addEventListener("click", () => {
               handler();
          });
     }
     //*****************//

     addHandlerSelectItems(handler) {
          this.allCheckboxesPrintEl = document.querySelectorAll(
               ".print_checkbox-input"
          );

          this.allCheckboxesPrintEl.forEach((input) => {
               input.addEventListener("click", (e) => {
                    handler(e);
               });
          });
     }
}

export default new ViewPrint();
