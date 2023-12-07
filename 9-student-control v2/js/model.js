//-----------------------------------------------//
//-----------------------------------------------//

class Model {
     constructor() {
          this.Allstudents = [];

          this.year = null;
          this.month = "";
          this.selectedYear = null;
          this.selectedMonth = "";

          this.elementsToPrint = [];

          this.editMode = false;

          this.quartersMonth = {
               first: ["enero", "febrero", "marzo"],
               second: ["abril", "mayo", "junio"],
               third: ["julio", "agosto", "septiembre"],
               fourth: ["octubre", "noviembre", "diciembre"],
          };
          this.studentDataObj = {};
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

                    const objectStore = db.createObjectStore("students", {
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
}

export default new Model();
