/*****************************************/
/*****************************************/
export default class View {
     constructor() {
          this.containerEl = document.querySelector(".container");
          this.navBarEl = document.querySelector(".nav_bar");
          this.headingTitleEl = document.querySelector(".heading");

          this.categoriesEl = document.getElementById("categories");
          this.recipesListEl = document.querySelector(".recipes-list");

          this.titleVisible = document.querySelector(".title-visible");
          this.titleInvisible = document.querySelector(".title-invisible");
     }
     displayMessage(message) {}

     ////////////////////////////////////////////

     switchTitle(mode) {
          this.titleVisible.style.transform =
               mode === "on" ? "translateY(100%)" : "translateY(0)";
          this.titleInvisible.style.top = mode === "on" ? "0" : "-100%";
     }
     ////////////////////////////////////////////

     observeNavBar() {
          const observer = new IntersectionObserver(
               (entries) => {
                    const containerWitdh =
                         this.containerEl.getBoundingClientRect().width;

                    const [entry] = entries;
                    if (!entry.isIntersecting) {
                         this.navBarEl.classList.add("nav_bar-sticky");
                         this.navBarEl.style.width = `${containerWitdh}px`;
                    } else {
                         this.navBarEl.classList.remove("nav_bar-sticky");
                         this.navBarEl.style.width = `initial`;
                    }
               },
               {
                    root: null,
                    threshold: 0,
               }
          );

          observer.observe(this.headingTitleEl);
     }
}
