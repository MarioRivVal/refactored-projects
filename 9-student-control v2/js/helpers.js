//-----------------------------------------------//
//-----------------------------------------------//
class Helpers {
     getCurrentMonth() {
          return new Date().toLocaleString("default", {
               month: "long",
          });
     }
     //*****************//

     getCurrentYear() {
          return new Date().getFullYear();
     }

     //*****************//
     createDate() {
          return new Intl.DateTimeFormat(navigator.language, {
               day: "2-digit",
               month: "2-digit",
               year: "numeric",
          }).format(new Date());
     }
}

export default new Helpers();
