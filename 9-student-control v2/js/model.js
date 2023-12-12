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
               const request = window.indexedDB.open("control estudiantes", 1);

               request.onerror = (e) => {
                    console.error("Error opening database:", e.target.error);
                    reject(e.target.error);
               };

               request.onupgradeneeded = (e) => {
                    const db = e.target.result;

                    const objectStore = db.createObjectStore("estudiantes", {
                         keyPath: "id",
                         autoIncrement: true,
                    });

                    objectStore.createIndex("dni", "dni", { unique: true });
                    objectStore.createIndex("id", "id", { unique: true });
               };

               request.onsuccess = () => {
                    this.db = request.result;
                    resolve(request.result);
               };
          });
     }

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
}

export default new Model();
