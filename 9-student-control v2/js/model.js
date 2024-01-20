//-----------------------------------------------//
//-----------------------------------------------//

class Model {
     constructor() {
          this.Allstudents = [];

          this.year = null;
          this.month = "";
          this.selectedYear = null;
          this.selectedMonths = null;

          this.elementsToPrint = [];
          this.billNumber = 0;

          this.editMode = false;

          this.quartersMonth = {
               first: ["enero", "febrero", "marzo"],
               second: ["abril", "mayo", "junio"],
               third: ["julio", "agosto", "septiembre"],
               fourth: ["octubre", "noviembre", "diciembre"],
          };
          this.studentDataObj = {};
          this.editedStudentObj = {};

          this.db = null;
     }

     //*****************//
     createDB() {
          return new Promise((resolve, reject) => {
               const request = window.indexedDB.open("control estudiantes", 2);

               request.onerror = (e) => {
                    console.error("Error opening database:", e.target.error);
                    reject(e.target.error);
               };

               request.onupgradeneeded = (e) => {
                    const db = e.target.result;

                    if (!db.objectStoreNames.contains("estudiantes")) {
                         const objectStore = db.createObjectStore(
                              "estudiantes",
                              {
                                   keyPath: "id",
                                   autoIncrement: true,
                              }
                         );

                         objectStore.createIndex("dni", "dni", {
                              unique: true,
                         });
                         objectStore.createIndex("id", "id", { unique: true });
                    }

                    if (!db.objectStoreNames.contains("billNumber")) {
                         const billStore = db.createObjectStore("billNumber", {
                              autoIncrement: true,
                         });

                         billStore.add({ number: 0 });
                    }
               };

               request.onsuccess = () => {
                    this.db = request.result;
                    resolve(request.result);
               };
          });
     }

     // STUDENTS DATA
     //*****************//
     addStudentDB() {
          const transaction = this.db.transaction("estudiantes", "readwrite");
          const objectStore = transaction.objectStore("estudiantes");

          return new Promise((resolve, reject) => {
               const addRequest = objectStore.add(this.studentDataObj);

               addRequest.onsuccess = () => {
                    resolve(addRequest.result);
               };

               addRequest.onerror = (e) => {
                    reject(e.target.error);
               };
          });
     }
     //*****************//

     getAllSudentsDB() {
          const transaction = this.db.transaction("estudiantes", "readonly");
          const objectStore = transaction.objectStore("estudiantes");

          return new Promise((resolve, reject) => {
               const request = objectStore.openCursor();
               const students = [];

               request.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                         students.push(cursor.value);
                         cursor.continue();
                    } else {
                         resolve(students);
                    }
               };

               request.onerror = (e) => {
                    console.error("Error getting students:", e.target.error);
                    reject(e.target.error);
               };
          });
     }
     //*****************//
     deleteStudentDB(id) {
          const transaction = this.db.transaction("estudiantes", "readwrite");
          const objectStore = transaction.objectStore("estudiantes");

          return new Promise((resolve, reject) => {
               const request = objectStore.delete(id);

               request.onsuccess = () => {
                    resolve();
               };

               request.onerror = (e) => {
                    reject(e.target.error);
               };
          });
     }
     //*****************//
     updateStudentDB(studentDataObj) {
          const transaction = this.db.transaction("estudiantes", "readwrite");
          const objectStore = transaction.objectStore("estudiantes");

          return new Promise((resolve, reject) => {
               const request = objectStore.put(studentDataObj);

               request.onsuccess = () => {
                    resolve();
               };

               request.onerror = (e) => {
                    reject(e.target.error);
               };
          });
     }

     // BILL NUMBER VALUE
     //*****************//

     updateBillNumber(newNumber) {
          const transaction = this.db.transaction("billNumber", "readwrite");
          const objectStore = transaction.objectStore("billNumber");

          return new Promise((resolve, reject) => {
               const request = objectStore.openCursor();

               request.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                         const updatedData = {
                              ...cursor.value,
                              number: newNumber,
                         };
                         const updateRequest = cursor.update(updatedData);

                         updateRequest.onsuccess = () => {
                              resolve(updatedData.number);
                         };

                         updateRequest.onerror = (e) => {
                              reject(e.target.error);
                         };
                    } else {
                         reject(new Error("No bill number found"));
                    }
               };

               request.onerror = (e) => {
                    reject(e.target.error);
               };
          });
     }

     //*****************//
     getBillNumber() {
          const transaction = this.db.transaction("billNumber", "readonly");
          const objectStore = transaction.objectStore("billNumber");

          return new Promise((resolve, reject) => {
               const request = objectStore.openCursor();

               request.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                         resolve(cursor.value.number);
                    } else {
                         reject(new Error("No bill number found"));
                    }
               };

               request.onerror = (e) => {
                    console.error("Error getting bill number:", e.target.error);
                    reject(e.target.error);
               };
          });
     }
}

export default new Model();
