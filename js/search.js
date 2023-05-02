"use srtict";
//////////////////////////////////////
//////////////////////////////////////
//Declare all variables:
const mainContent = document.querySelector("#main .content");
const idInput = document.querySelector("#id");
const nameInput = document.querySelector("#name");
const breedInput = document.querySelector("#breed-select");
const breedSelect = document.querySelector("#breed-select");
const typeInput = document.querySelector("#pet-select");
const vaccinatedInput = document.querySelector("#vaccinated");
const dewormedInput = document.querySelector("#dewormed");
const sterilizedInput = document.querySelector("#sterilized");
const findBtn = document.querySelector("button.find");

//////////////////////////////////////
//////////////////////////////////////
//Functions:

// Put all breeds into breed selection:
const allBreeds = [];
JSON.parse(localStorage.getItem("breedItems")).forEach((item) => {
    allBreeds.push(item.breed);
});

console.log(allBreeds);
allBreeds.forEach((item) => {
    breedSelect.insertAdjacentHTML(
        "beforeend",
        `<option value=${item}>${item}</option>`
    );
});

// find functions:

let searchedItems = [];

findBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // function for each input:
    JSON.parse(localStorage.getItem("petsList")).forEach((item) => {
        if (
            findInput(idInput, "id", item) &&
            findInput(nameInput, "name", item) &&
            findInput(breedInput, "breed", item) &&
            findInput(typeInput, "type", item) &&
            findCheckBoxes(vaccinatedInput, "vaccinated", item) &&
            findCheckBoxes(dewormedInput, "dewormed", item) &&
            findCheckBoxes(sterilizedInput, "sterilized", item)
        ) {
            searchedItems.push(item);
        }
    });
    console.log(searchedItems);
    render();
    searchedItems = [];
    console.log(searchedItems);
});
// find by inputs (id, name, breed, type):
function findInput(input, val, item) {
    const inputValue = input.value.toLowerCase();
    if (inputValue !== "" && inputValue !== "select") {
        if (item[val].toLowerCase().includes(inputValue)) {
            return true;
        } else return false;
    }
    return true;
}

// find by checkboxes(vaccinated, dewormed, sterilized):
function findCheckBoxes(checkBox, val, item) {
    const inputValue = checkBox.checked;
    if (inputValue) {
        if (item[val]) {
            return true;
        } else return false;
    }
    return true;
}

// function render searched list:
function render() {
    mainContent.insertAdjacentHTML(
        "beforeend",
        `
        <div id="list">
            <div class="title grid">
                <p class="id">ID</p>
                <p class="name">Name</p>
                <p class="age">Age</p>
                <p class="type">Type</p>
                <p class="weight">Weight</p>
                <p class="length">Length</p>
                <p class="breed">Breed</p>
                <p class="color">Color</p>
                <p class="vaccinated">Vaccinated</p>
                <p class="dewormed">Dewormed</p>
                <p class="sterilized">Sterilized</p>
                <p class="bmi">BMI</p>
                <p class="date">Date Added</p>
                <p class="action">Action</p>
            </div>

            <div class="list-wrapper">
                <!-- render list items here -->
            </div>
        </div>`
    );

    const listWrapper = document.querySelector("#list .list-wrapper");
    listWrapper.innerHTML = "";
    searchedItems.forEach((item, index) => {
        listWrapper.innerHTML += `
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
        </div>`;
    });
}
