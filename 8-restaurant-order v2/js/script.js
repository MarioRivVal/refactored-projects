"use strict";

document.addEventListener("DOMContentLoaded", () => {
    //--------------------------------------------//
    // SECTION ELEMENTS
    //--------------------------------------------//

    const categoriesEl = document.querySelector(".categories");
    const tablesEl = document.querySelector(".tables");

    const modalContainerEl = document.querySelector(".modal-container");
    const modalEl = document.querySelector(".modal");

    const orderListEl = document.querySelector(".order_list");

    const optionsEl = document.querySelectorAll(".tips_options .option");

    const btnConfirm = document.querySelector(".btn-confirm");
    const btnCancel = document.querySelector(".btn-cancel");

    const btnPrintBill = document.querySelector(".bill_button");

    let busyTables = [];

    let newOrder = {
        table: "",
        time: "",
        date: "",
        orderItems: [],
        subTotal: 0,
        tip: 0,
        tipPercentual: 0,
    };

    //--------------------------------------------//
    // SECTION FUNCTIONS
    //--------------------------------------------//
    const getBusyTableLS = function () {
        const tables = JSON.parse(localStorage.getItem("busyTables"));

        if (!tables) return;

        busyTables = [...tables];

        const numbers = busyTables.map((el) => el.table);

        numbers.forEach((n) => tableMode(n, "busy"));
    };

    //--------------------------------------------//
    const getDate = function () {
        return new Intl.DateTimeFormat(navigator.language, {
            day: "numeric",
            month: "numeric",
            year: "2-digit",
        }).format(new Date());
    };

    //--------------------------------------------//
    const getTime = function () {
        return new Intl.DateTimeFormat(navigator.language, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        }).format(new Date());
    };

    //--------------------------------------------//
    const displayDate = function () {
        const date = getDate();

        const dateEl = document.querySelectorAll(".current-date");
        dateEl.forEach((el) => (el.textContent = date));
    };
    displayDate();

    //--------------------------------------------//
    const displayTime = function () {
        setInterval(() => {
            const time = getTime();

            const timeEl = document.querySelectorAll(".current-time");
            timeEl.forEach((el) => (el.textContent = time));
        }, 1000);
    };
    displayTime();

    //--------------------------------------------//
    const loadItems = function () {
        const url = "db.json";

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                displayItems(data.items);
            })
            .catch((error) => console.error(error));
    };
    loadItems();

    //--------------------------------------------//
    const displayItems = function (items) {
        items.forEach((item) => {
            const { id, name, price, category } = item;

            const li = document.createElement("LI");
            li.classList.add("category_product");
            li.dataset.id = id;
            li.onclick = () => {
                getOrder(item);
            };

            const pProduct = document.createElement("P");
            pProduct.textContent = name;

            const pPrice = document.createElement("P");
            pPrice.textContent = price;

            li.appendChild(pProduct);
            li.appendChild(pPrice);

            const categoryBox = document.querySelector(
                `.category-${category} .category_list`
            );

            categoryBox.appendChild(li);
        });
    };

    //--------------------------------------------//
    const selectTable = function (e) {
        if (e.target.classList.contains("table")) {
            const tableNumber = e.target.dataset.num;

            checkTable(tableNumber);
        }
    };
    //--------------------------------------------//
    const checkTable = function (tableNumber) {
        const tabelIsBusy = busyTables.some((el) => el.table === tableNumber);

        if (!tabelIsBusy) {
            newOrder.time = getTime();
            newOrder.date = getDate();
            newOrder.table = tableNumber;
        } else {
            const tableBusy = busyTables.filter(
                (el) => el.table === tableNumber
            );

            editTableOrder(tableBusy[0]);
        }
        modalMode("open");
    };
    //--------------------------------------------//
    const resetNewOrderObj = function () {
        newOrder.table = "";
        newOrder.time = "";
        newOrder.date = "";
        newOrder.orderItems = [];
        newOrder.subTotal = 0;
        newOrder.tip = 0;
        newOrder.tipPercentual = 0;
        newOrder.fullTotal = "";
    };

    //--------------------------------------------//
    const getOrder = function (item) {
        let amount = 1;
        const itemExist = newOrder.orderItems.some((el) => el.id === item.id);

        if (!itemExist) {
            newOrder.orderItems = [...newOrder.orderItems, { ...item, amount }];
        } else {
            newOrder.orderItems.map((el) => {
                if (el.id === item.id) {
                    el.amount = el.amount + 1;
                }
            });
        }

        createSubTotal(newOrder);
        addTip(newOrder);
        displayOrder();
        displayBill();
    };

    //--------------------------------------------//
    const createSubTotal = function (obj) {
        const { orderItems } = obj;

        const subTotal = orderItems.reduce((subTot, el) => {
            return subTot + el.price * el.amount;
        }, 0);

        obj.subTotal = parseFloat(subTotal.toFixed(2));
    };

    //--------------------------------------------//
    const displayOrder = function () {
        clearHtml(orderListEl);

        newOrder.orderItems.forEach((el) => {
            const { name, amount, id } = el;

            const li = document.createElement("LI");
            li.classList.add("order_item");

            const pProduct = document.createElement("P");
            pProduct.textContent = name;

            const spanAmount = document.createElement("SPAN");
            spanAmount.textContent = amount;

            const button = document.createElement("BUTTON");
            button.classList.add("btn", "btn-red");
            button.textContent = "x";
            button.onclick = () => {
                deleteProduct(id);
            };

            li.appendChild(pProduct);
            li.appendChild(spanAmount);
            li.appendChild(button);

            orderListEl.appendChild(li);
        });
    };

    //--------------------------------------------//
    const displayBill = function () {
        const {
            date,
            time,
            table,
            orderItems,
            subTotal,
            tip,
            tipPercentual,
            fullTotal,
        } = newOrder;

        const billItems = document.querySelector(".bill_items");
        clearHtml(billItems);

        document.querySelector(".bill_date").textContent = date;
        document.querySelector(".bill_time").textContent = time.slice(0, 5);
        document.querySelector(".bill_table").textContent = `Table N.${table}`;

        document.querySelector(
            ".tip_percentual"
        ).textContent = `Tip(${tipPercentual}%)`;
        document.querySelector(".tip_amount").textContent = `${tip}€`;
        document.querySelector(".total span").textContent = `${subTotal}€`;
        document.querySelector(
            ".bill_full-total span"
        ).textContent = `${fullTotal}€`;

        orderItems.forEach((el) => {
            const { name, id, price, amount } = el;

            const ulItem = document.createElement("UL");
            ulItem.dataset.id = id;

            const liAmount = document.createElement("LI");
            liAmount.textContent = amount;

            const liName = document.createElement("LI");
            liName.textContent = name;

            const liPrice = document.createElement("LI");
            liPrice.textContent = `${price}€`;

            const liTotal = document.createElement("LI");
            liTotal.textContent = `${price * amount}€`;

            ulItem.appendChild(liAmount);
            ulItem.appendChild(liName);
            ulItem.appendChild(liPrice);
            ulItem.appendChild(liTotal);

            billItems.appendChild(ulItem);
        });
    };

    //--------------------------------------------//
    const addTip = function (obj) {
        const { subTotal } = obj;

        const tipPercentual = +document.querySelector('[name="tip"]:checked')
            .value;

        const tip = +((subTotal * tipPercentual) / 100).toFixed(2);

        const fullTotal = tip + subTotal;

        obj.tip = tip;
        obj.tipPercentual = tipPercentual;
        obj.fullTotal = +fullTotal.toFixed(2);

        displayBill();
    };

    //--------------------------------------------//
    const clearHtml = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };

    //--------------------------------------------//
    const deleteProduct = function (id) {
        newOrder.orderItems.map((el) => {
            if (el.id === id) {
                if (el.amount === 1) {
                    newOrder.orderItems = newOrder.orderItems.filter(
                        (el) => el.id !== id
                    );
                } else {
                    el.amount = el.amount - 1;
                }

                createSubTotal(newOrder);
                addTip(newOrder);
                displayOrder();
                displayBill();
            }
        });
    };

    //--------------------------------------------//
    const createTable = function () {
        if (!newOrder.orderItems.length) {
            displayAlert();
            return;
        }

        const tableBusyExist = busyTables.some(
            (el) => el.table === newOrder.table
        );

        if (!tableBusyExist) {
            busyTables = [...busyTables, { ...newOrder }];
        } else {
            busyTables.forEach((el) => {
                if (el.table === newOrder.table) {
                    el.orderItems = [...newOrder.orderItems];
                    createSubTotal(el);
                    addTip(el);
                }
            });
        }
        saveTableInLS();
        modalMode("close");
        resetOrderModal();
        tableMode(newOrder.table, "busy");
    };

    //--------------------------------------------//
    const closeTable = function () {
        tableMode(newOrder.table, "empty");

        busyTables = busyTables.filter((el) => el.table !== newOrder.table);

        saveTableInLS();
        resetNewOrderObj();
        displayBill();
        displayOrder();
        closeAccordion();
        modalMode("close");
    };

    //--------------------------------------------//
    const displayAlert = function () {
        const alertEl = document.querySelector(".alert-text");
        alertEl.style.top = "0";

        setTimeout(() => {
            alertEl.style.top = "-100%";
        }, 3000);
    };

    //--------------------------------------------//
    const modalMode = function (mode) {
        const action = mode === "open" ? "add" : "remove";

        modalContainerEl.classList[action]("modal-container-open");
        modalEl.classList[action]("modal-open");
    };

    //--------------------------------------------//
    const tableMode = function (tableNumber, mode) {
        const table = document.querySelector(`.table-${tableNumber}`);

        table.style.borderColor = mode === "busy" ? "#cd5b5b" : "#228c22";
        table.style.color = mode === "busy" ? "#cd5b5b" : "#228c22";
    };

    //--------------------------------------------//
    const openAccordion = function (e) {
        if (e.target.classList.contains("category_title")) {
            const list = e.target.nextElementSibling;

            list.classList.toggle("list-open");
        }
    };

    //--------------------------------------------//
    const closeAccordion = function () {
        document
            .querySelectorAll(".category_list")
            .forEach((el) => el.classList.remove("list-open"));
    };

    //--------------------------------------------//
    const resetOrderModal = function () {
        setTimeout(() => {
            resetNewOrderObj();
            closeAccordion();
            clearHtml(orderListEl);
            displayBill();

            document.querySelector("form").reset();
            categoriesEl.scrollIntoView({ behavior: "smooth" });
        }, 500);
    };

    //--------------------------------------------//
    const editTableOrder = function (tableBusy) {
        const {
            table,
            time,
            date,
            orderItems,
            subTotal,
            tip,
            tipPercentual,
            fullTotal,
        } = tableBusy;

        newOrder.table = table;
        newOrder.time = time;
        newOrder.date = date;
        newOrder.orderItems = orderItems;
        newOrder.subTotal = subTotal;
        newOrder.tip = tip;
        newOrder.tipPercentual = tipPercentual;
        newOrder.fullTotal = fullTotal;

        displayOrder();
        displayBill();
    };

    //--------------------------------------------//
    const printBill = function () {
        if (!newOrder.orderItems.length) {
            displayAlert();
            return;
        }

        const section = document.querySelector("#bill_print-section");
        const headerContent =
            '<html><head><title>Print Bill</title><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@100;300;400;500;700&family=Dancing+Script:wght@700&family=Source+Code+Pro:wght@300;400;500;600&display=swap"rel="stylesheet"/><link rel="stylesheet" href="css/style.css"></head><body>';

        section.style.width = "284px";
        section.style.height = "fit-content";
        section.style.margin = "10px";

        const printWindow = window.open();
        printWindow.document.write(headerContent);
        printWindow.document.write(`${section.outerHTML}</body></html>`);

        printWindow.document.close();

        printWindow.onafterprint = function () {
            printWindow.close();
            closeTable();
        };
        printWindow.print();

        // TO PRINT FOR REAL WITH CANCEL OPTION BEFORE PRINT

        // let printed = false;

        // printWindow.onafterprint = function () {
        //     printed = true;
        //     printWindow.close();
        // };

        // printWindow.onbeforeunload = function () {
        //     if (!printed) {
        //         printWindow.close();
        //     }
        // };

        // printWindow.print();

        // if (printed) {
        //     closeTable();
        // }
    };

    //--------------------------------------------//
    const saveTableInLS = function () {
        JSON.parse(localStorage.getItem("busyTables")) ?? [];

        localStorage.setItem("busyTables", JSON.stringify(busyTables));
    };

    getBusyTableLS();

    //--------------------------------------------//
    // SECTION EVENTS
    //--------------------------------------------//

    tablesEl.addEventListener("click", selectTable);

    categoriesEl.addEventListener("click", openAccordion);

    btnConfirm.addEventListener("click", createTable);

    btnPrintBill.addEventListener("click", printBill);

    optionsEl.forEach((el) =>
        el.addEventListener("change", () => {
            addTip(newOrder);
        })
    );

    btnCancel.addEventListener("click", () => {
        modalMode("close");
        resetOrderModal();
    });
});
