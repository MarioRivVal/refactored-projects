class ViewClient {
     constructor() {
          this.clientsBtn = document.querySelector(".clients-list-btn");
          this.clientListEl = document.querySelector(".clients_list");
     }
     //----------------------------//
     toggleClientOptions(clientId) {
          const selectedBox = document.querySelector(
               `.clients_options[data-id="${clientId}"]`
          );

          selectedBox.classList.toggle("clients_options--active");

          setTimeout(() => {
               selectedBox.classList.remove("clients_options--active");
          }, 10000);
     }

     //----------------------------//

     renderClientsList(allClients) {
          this.clientListEl.innerHTML = "";
          allClients.forEach((client) => {
               const { name, email, phone, company, id } = client;

               const clientHTML = `
                      <div class="clients_row" data-id="${id}">
                          <p class="clients_data clients_data--name">
                          ${name}
                          </p>
                          <a
                              class="clients_data clients_data--email"
                              href="mailto:${email}"
                          >
                          ${email}
                          </a>
                          <a
                              class="clients_data clients_data--phone"
                              href="tel:${phone}"
                          >
                          ${phone}
                          </a>
                          <p class="clients_data clients_data--company">
                          ${company}
                          </p>
                          <div class="icon-box">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="icon"
                              >
                                  <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                  />
                              </svg>
                          </div>
                          <div class="clients_options" data-id="${id}">
                              <button class="clients_btn clients_btn--delete">
                                  delete
                              </button>
                              <button class="clients_btn clients_btn--edit">
                                  edit
                              </button>
                          </div>
                      </div>
                      `;

               this.clientListEl.insertAdjacentHTML("afterbegin", clientHTML);
          });
     }
     //----------------------------//

     addHandlerClientsList(handler) {
          this.clientsBtn.addEventListener("click", handler);
     }

     //----------------------------//
     // addHandlerClientsOptions(handler) {
     //      this.clientListEl.addEventListener("click", handler);
     // }
     addHandlerClientsEvents(handlers) {
          this.clientListEl.addEventListener("click", (e) => {
               handlers.forEach((handler) => handler(e));
          });
     }
}
export default new ViewClient();
