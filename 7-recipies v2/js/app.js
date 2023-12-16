"use strict";

const init = function () {
    //--------------------------------------------//
    // SECTION ELEMENT & VARIABLES
    const containerEl = document.querySelector(".container");

    const categoriesEl = document.getElementById("categories");

    const headingTitleEl = document.querySelector(".heading");
    const navBarEl = document.querySelector(".nav_bar");

    const recipesListEl = document.querySelector(".recipes-list");
    const favoritesListEl = document.querySelector(".favorites-list");

    const modalContainerEl = document.querySelector(".modal_container");
    const modalBoxEl = document.querySelector(".modal-box");

    const btnCloseModalEl = document.querySelector(".btn-close");
    const btnAddRemove = document.querySelector(".btn-add-remove");

    let initRecipes = [];

    let recipeInfo;

    //--------------------------------------------//
    // SECTION FUNCTIONS

    const getCategories = function () {
        const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                displayCategories(data.categories);
            });
    };

    //--------------------------------------------//
    const getFavoritesList = function () {
        const favorites = JSON.parse(localStorage.getItem("favorities")) ?? [];

        displayRecipes(favorites);
    };

    //--------------------------------------------//
    const readInitRecipes = function () {
        const initialRecipes = JSON.parse(
            localStorage.getItem("inicialRecipes")
        );

        if (initialRecipes) displayRecipes(initialRecipes);
    };

    //--------------------------------------------//
    const createInitRecipes = function (recipes) {
        JSON.parse(localStorage.getItem("inicialRecipies")) ?? [];

        localStorage.setItem("inicialRecipes", JSON.stringify(recipes));
    };

    //--------------------------------------------//
    const displayCategories = function (categories) {
        categories.forEach((category) => {
            const categoryName = category.strCategory;

            const optionEl = document.createElement("OPTION");
            optionEl.value = `${categoryName}`;
            optionEl.textContent = `${categoryName}`;

            if (categoriesEl) categoriesEl.appendChild(optionEl);
        });
    };

    //--------------------------------------------//
    const selectCategory = function (e) {
        const valueCategory = e.target.value;

        if (valueCategory === "Menu") return;

        const urlCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${valueCategory}`;

        fetch(urlCategory)
            .then((resp) => resp.json())
            .then((data) => {
                const recipePomises = data.meals.map((recipe) => {
                    const id = recipe.idMeal;

                    const urlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
                    return fetch(urlId)
                        .then((resp) => resp.json())
                        .then((data) => data.meals[0]);
                });

                Promise.all(recipePomises).then((recipes) => {
                    containerEl.scrollIntoView({ behavior: "smooth" });
                    displayRecipes(recipes);
                    initRecipes = recipes;
                    createInitRecipes(initRecipes);
                });
            });
    };

    //--------------------------------------------//
    const observeNavBar = function () {
        const observer = new IntersectionObserver(
            function (entries) {
                const containerWitdh =
                    containerEl.getBoundingClientRect().width;

                const [entry] = entries;
                if (!entry.isIntersecting) {
                    navBarEl.classList.add("nav_bar-sticky");
                    navBarEl.style.width = `${containerWitdh}px`;
                } else {
                    navBarEl.classList.remove("nav_bar-sticky");
                    navBarEl.style.width = `initial`;
                }
            },
            {
                root: null,
                threshold: 0,
            }
        );

        observer.observe(headingTitleEl);
    };

    //--------------------------------------------//
    const displayRecipes = function (recipes) {
        recipesListEl.innerHTML = "";

        recipes.forEach((recipe) => {
            const HTML = `
                <div class="recipe">
                    <div class="recipe_img">
                        <img src="${
                            recipe.strMealThumb ?? recipe.img
                        }" alt="photo recipe ${
                recipe.strMeal ?? recipe.name
            }" />
                    </div>
                    <div class="recipe_title">
                        <h3>${recipe.strMeal ?? recipe.name}</h3>
                    </div>

                    <div class="recipe_detail">
                        <p>
                            <span
                                ><svg class="recipe_icon">
                                    <use
                                        xlink:href="svg/symbol-defs.svg#icon-meal"
                                    ></use></svg></span
                            >${recipe.strCategory ?? recipe.category}
                        </p>
                        <p>
                            <span>
                                <svg class="recipe_icon">
                                    <use
                                        xlink:href="svg/symbol-defs.svg#icon-position"
                                    ></use></svg></span
                            >${recipe.strArea ?? recipe.origen}
                        </p>
                    </div>
                    <div data-id="${
                        recipe.idMeal ?? recipe.id
                    }" class="recipe_btn">
                        <div class="recipe_btn-layer"></div>
                        <button>receta</button>
                    </div> 
                </div>
            `;

            recipesListEl.insertAdjacentHTML("beforeend", HTML);
        });

        if (recipes.length === 0) {
            switchTitle("off");
        } else {
            setTimeout(() => {
                switchTitle("on");
            }, 1000);
        }
    };

    //--------------------------------------------//
    const getRecipeId = function (e) {
        if (e.target.tagName === "BUTTON") {
            const target = e.target;
            const id = target.closest(".recipe_btn").dataset.id;

            const urlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            fetch(urlId)
                .then((resp) => resp.json())
                .then((data) => {
                    recipeInfo = data.meals[0];
                    displayFullRecipe(data.meals[0]);
                });

            btnAddRemove.onclick = function () {
                if (checkFavExist(id)) {
                    deleteFavorities(id);

                    return;
                }

                addToFavorities(recipeInfo);
            };
            openPopUp();
        }
    };

    //--------------------------------------------//
    const openPopUp = function () {
        modalContainerEl.classList.add("modal_container-open");
        modalBoxEl.classList.add("modal-box-open");
    };

    //--------------------------------------------//
    const closePopUp = function () {
        modalContainerEl.classList.remove("modal_container-open");
        modalBoxEl.classList.remove("modal-box-open");
        document.querySelector("body").style.overflow = "auto";
    };

    //--------------------------------------------//
    const displayFullRecipe = function (recipe) {
        const {
            idMeal: id,
            strInstructions: instructions,
            strMeal: name,
            strMealThumb: img,
        } = recipe;

        modalBoxEl.dataset.id = id;

        const imgRecipe = document.querySelector(".modal_img img");
        imgRecipe.src = `${img}`;
        imgRecipe.alt = `${name}`;

        const nameRecipe = document.querySelector(".modal_title");
        nameRecipe.textContent = `${name}`;

        const instructionsRecipe = document.querySelector(
            ".modal_instructions"
        );

        instructionsRecipe.textContent = `${instructions}`;

        const ingredientsEl = document.querySelector(".modal_ingredients-list");
        const amountsEl = document.querySelector(".modal_ingredients-amount");

        clearElements(ingredientsEl);
        clearElements(amountsEl);

        for (let i = 1; i < 20; i++) {
            if (recipe[`strIngredient${i}`]) {
                const ingredient = recipe[`strIngredient${i}`];
                const amount = recipe[`strMeasure${i}`];

                const liIngEl = document.createElement("LI");
                liIngEl.textContent = ingredient;
                ingredientsEl.appendChild(liIngEl);

                const liAmoEl = document.createElement("LI");
                liAmoEl.textContent = amount;
                amountsEl.appendChild(liAmoEl);
            }
        }

        switchAddRemoveBtn(checkFavExist(id));
    };

    //--------------------------------------------//
    const clearElements = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    //--------------------------------------------//
    const switchTitle = function (mode) {
        const titleVisible = document.querySelector(".title-visible");
        const titleInvisible = document.querySelector(".title-invisible");

        if (mode === "on") {
            titleVisible.style.transform = "translateY(100%)";
            titleInvisible.style.top = "0";
        } else {
            titleVisible.style.transform = "translateY(0)";
            titleInvisible.style.top = "-100%";
        }
    };

    //--------------------------------------------//
    const addToFavorities = function (recipeInfo) {
        const {
            idMeal: id,
            strArea: origen,
            strCategory: category,
            strMeal: name,
            strMealThumb: img,
        } = recipeInfo;
        const favorities = JSON.parse(localStorage.getItem("favorities")) ?? [];

        localStorage.setItem(
            "favorities",
            JSON.stringify([...favorities, { id, origen, category, name, img }])
        );

        displayMessage(checkFavExist(id));
        switchAddRemoveBtn(checkFavExist(id));

        if (checkIndexPage()) getFavoritesList();
    };

    //--------------------------------------------//
    const deleteFavorities = function (id) {
        const favorities = JSON.parse(localStorage.getItem("favorities")) ?? [];

        const newFavorities = favorities.filter((recipe) => recipe.id !== id);

        localStorage.setItem("favorities", JSON.stringify(newFavorities));

        displayMessage(checkFavExist(id));
        switchAddRemoveBtn(checkFavExist(id));

        if (checkIndexPage()) getFavoritesList();
    };

    //--------------------------------------------//
    const displayMessage = function (mode) {
        const toastEl = document.querySelector(".toast-invisible");
        toastEl.style.top = "0";

        toastEl.style.backgroundColor = mode === true ? "#8bc926" : "#e94e4e";
        toastEl.textContent = mode === true ? "Added" : "Removed";

        setTimeout(() => {
            toastEl.style.top = "-100%";
        }, 2000);
    };

    //--------------------------------------------//
    const checkFavExist = function (id) {
        const favorities = JSON.parse(localStorage.getItem("favorities")) ?? [];

        return favorities.some((recipe) => recipe.id === id);
    };

    //--------------------------------------------//
    const checkIndexPage = function () {
        const pathArray = window.location.pathname.split("/");
        const currentPage = pathArray[pathArray.length - 1];
        return currentPage === "favorites.html" || currentPage === "favorites";
    };
    //--------------------------------------------//
    const switchAddRemoveBtn = function (mode) {
        btnAddRemove.textContent = mode === true ? "Remove" : "Add";
        btnAddRemove.style.backgroundColor =
            mode === true ? "#e94e4e" : "#8bc926";
    };

    //--------------------------------------------//
    // SECTION FUNCTIONALITIES

    if (categoriesEl) getCategories();

    if (favoritesListEl) getFavoritesList();

    if (!checkIndexPage()) readInitRecipes();

    observeNavBar();

    //--------------------------------------------//
    // SECTION EVENTS
    if (categoriesEl) categoriesEl.addEventListener("change", selectCategory);
    recipesListEl.addEventListener("click", getRecipeId);
    btnCloseModalEl.addEventListener("click", closePopUp);
};

document.addEventListener("DOMContentLoaded", init);
