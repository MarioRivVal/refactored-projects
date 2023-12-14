import helper from "../helpers.js";

class ViewPrint {
     constructor() {
          this.allCheckboxesPrintEl = null;
          this.btnPrintEl = document.querySelector(".btn-print");
     }
     //*****************//
     loadPrintPage(elementsToPrint) {
          // window.open("print.html", "_blank");
          console.log("print");

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
               } = el;

               for (let i = 0; i < paidMonths.length; i++) {
                    const billHTML = `
            <div class="bill">
                    <div class="paid-month">
                        <p class="month">${paidMonths[i]}</p>
                        <p class="year">${year}</p>
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
     }

     //*****************//
     // printBills(htmls) {
     //      const headerContent = `<html><head><title>Print Bills</title><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/><link rel="stylesheet" href="css/style.css" /></head><body><section class="all-bills">${htmls.join(
     //           ""
     //      )}</section></body></html>`;

     //      const printWindow = window.open();
     //      printWindow.document.write(headerContent);
     //      printWindow.document.close();

     //      printWindow.onload = function () {
     //           printWindow.print();
     //      };
     // }

     printBills(htmls) {
          const headerContent = `<html><head><title>Print Bills</title><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/><link rel="stylesheet" href="css/style.css" /></head><body><section class="all-bills">${htmls.join(
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
                    // Popup was blocked
                    alert("Please disable your popup blocker and try again");
               }
          } catch (error) {
               // Log the error or handle it in another appropriate way
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
