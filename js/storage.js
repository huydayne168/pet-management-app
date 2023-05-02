"use strict";

//////////////////////////////////////
//////////////////////////////////////
//Declare all variables:
// input form:
const idInput = document.querySelector("#id");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const typeInput = document.querySelector("#pet-select");
const weightInput = document.querySelector("#weight");
const lengthInput = document.querySelector("#length");
const colorInput = document.querySelector("#color");
const breedInput = document.querySelector("#breed-select");
const vaccinatedInput = document.querySelector("#vaccinated");
const dewormedInput = document.querySelector("#dewormed");
const sterilizedInput = document.querySelector("#sterilized");
const submitInput = document.querySelector(
    ".button-wrapper button[type = 'submit']"
);
const filterHeathyBtn = document.querySelector(
    ".button-wrapper .filter-heathy"
);
const calcBmiButton = document.querySelector(".button-wrapper .calc-bmi");

// list item:
const listContainer = document.querySelector("#list .list-wrapper");
const idList = document.querySelector(".item .id");
const nameList = document.querySelector(".item .name");
const ageList = document.querySelector(".item .age");
const typeList = document.querySelector(".item .type");
const weightList = document.querySelector(".item .weight");
const lengthList = document.querySelector(".item .length");
const colorList = document.querySelector(".item .color span");
const breedList = document.querySelector(".item .breed");
const vaccinatedList = document.querySelector(".item .vaccinated");
const dewormedList = document.querySelector(".item .dewormed");
const sterilizedList = document.querySelector(".item .sterilized");
const submitList = document.querySelector(
    ".button-wrapper button[type = 'submit']"
);
const delListBtn = document.querySelector(".item .action button");
const correctIcon = document.querySelector("fa-solid fa-circle-check");
const wrongIcon = document.querySelector("fa-solid fa-circle-xmark");
//////////////////////////////////////
//////////////////////////////////////
// Store Pets to local storage:
const storageApp = {
    // list:
    listItems: JSON.parse(localStorage.getItem("petsList")) ?? [],

    saveToStorage: function (key, value) {
        localStorage.setItem(key, value);
    },

    // Update breeds of each types:
    breedTypeUpdate: function () {
        const breedType = JSON.parse(localStorage.getItem("breedType"));
        typeInput.addEventListener("blur", () => {
            if (typeInput.value === "Cat") {
                breedInput.innerHTML = `
                <option value="select">
                    --Select Breed--
                </option>`;
                breedType.Cat.forEach((item) => {
                    breedInput.insertAdjacentHTML(
                        "beforeend",
                        `<option value="${item}">${item}</option>`
                    );
                });
            } else if (typeInput.value === "Dog") {
                breedInput.innerHTML = `
                <option value="select">
                    --Select Breed--
                </option>`;
                breedType.Dog.forEach((item) => {
                    breedInput.insertAdjacentHTML(
                        "beforeend",
                        `<option value="${item}">${item}</option>`
                    );
                });
            }
        });
    },

    // delete items:
    deleteItem: function () {
        listContainer.addEventListener("click", (event) => {
            let currentTarget = event.target;
            if (currentTarget.className === "delete") {
                currentTarget.closest(".item.grid").remove();
                this.listItems.splice(Number(currentTarget.dataset.index), 1);
                this.saveToStorage("petsList", JSON.stringify(this.listItems));
                this.renderListItems();
            }
        });
    },

    // push items to listItems collection:
    pushToList: function () {
        submitInput.addEventListener("click", (event) => {
            event.preventDefault();
            if (app.validateForm()) {
                this.listItems.push({
                    id: `${idInput.value}`,
                    name: `${nameInput.value}`,
                    age: `${ageInput.value}`,
                    type: `${typeInput.value}`,
                    weight: `${weightInput.value}`,
                    length: `${lengthInput.value}`,
                    color: `${colorInput.value}`,
                    breed: `${breedInput.value}`,
                    vaccinated: app.checkVaccinated(),
                    dewormed: app.checkDewormed(),
                    sterilized: app.checkSterilized(),
                    bmi: "?",
                });
                app.reloadInput();
                this.saveToStorage("petsList", JSON.stringify(this.listItems));
            }
            this.renderListItems();
        });
    },

    // render list items:
    renderListItems: function () {
        listContainer.innerHTML = "";
        this.listItems.forEach((item, index) => {
            listContainer.innerHTML += `
            <div class="item grid">
                <p class="id">${item.id}</p>
                <p class="name">${item.name}</p>
                <p class="age">${item.age}</p>
                <p class="type">${item.type}</p>
                <p class="weight">${item.weight}kg</p>
                <p class="length">${item.length}cm</p>
                <p class="breed">${item.breed}</p>
                <p class="color"><span style= "background-color: ${
                    item.color
                }"></span></p>
                <p class="vaccinated">
                    ${
                        item.vaccinated
                            ? '<i class="fa-solid fa-circle-check"></i>'
                            : '<i class="fa-sharp fa-solid fa-circle-xmark"></i>'
                    }
                </p>
                <p class="dewormed">
                    ${
                        item.dewormed
                            ? '<i class="fa-solid fa-circle-check"></i>'
                            : '<i class="fa-sharp fa-solid fa-circle-xmark"></i>'
                    }
                </p>
                <p class="sterilized">
                    ${
                        item.sterilized
                            ? '<i class="fa-solid fa-circle-check"></i>'
                            : '<i class="fa-sharp fa-solid fa-circle-xmark"></i>'
                    }
                </p>
                <p class="bmi">${item.bmi}</p>
                <p class="date">${today}</p>
                <p class="action">
                    <button class="delete" data-index="${index}">Delete</button>
                </p>
            </div>`;
        });
    },

    start: function () {
        this.breedTypeUpdate();
        this.renderListItems();
        this.pushToList();
        this.deleteItem();
    },
};

storageApp.start();
