class State {
     constructor() {
          this.newClient = {};
          this.allClients = [];
          this.db;
          this.clientId;
     }

     createDB() {
          return new Promise((resolve, reject) => {
               const request = window.indexedDB.open("crm", 1);

               request.onerror = (e) => {
                    console.error("Error opening database:", e.target.error);
                    reject(e.target.error);
               };

               request.onupgradeneeded = (e) => {
                    const db = e.target.result;

                    const objectStore = db.createObjectStore("clients", {
                         keyPath: "id",
                         autoIncrement: true,
                    });

                    objectStore.createIndex("email", "email", { unique: true });
                    objectStore.createIndex("id", "id", { unique: true });
               };

               request.onsuccess = () => {
                    this.db = request.result;
                    resolve(request.result);
               };
          });
     }

     //----------------------------//

     addClientDB(newClient) {
          const transaction = this.db.transaction("clients", "readwrite");
          const objectStore = transaction.objectStore("clients");

          return new Promise((resolve, reject) => {
               const addRequest = objectStore.add(newClient);

               addRequest.onsuccess = () => {
                    resolve(addRequest.result);
               };

               addRequest.onerror = (e) => {
                    reject(e.target.error);
               };
          });
     }

     //----------------------------//

     getAllClients() {
          const transaction = this.db.transaction("clients", "readonly");
          const objectStore = transaction.objectStore("clients");

          return new Promise((resolve, reject) => {
               const request = objectStore.openCursor();
               const clients = [];

               request.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                         clients.push(cursor.value);
                         cursor.continue();
                    } else {
                         resolve(clients);
                    }
               };

               request.onerror = (e) => {
                    console.error("Error getting clients:", e.target.error);
                    reject(e.target.error);
               };
          });
     }
     //----------------------------//

     deleteClientDB() {
          console.log("deleteClientDB");
     }
     //----------------------------//
     getClientId(e) {
          const clientId = +e.target
               .closest(".clients_row")
               .getAttribute("data-id");
          this.clientId = clientId;
     }
}

export default new State();
