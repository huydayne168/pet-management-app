"use strict";
//////////////////////////////////////
//////////////////////////////////////
// app Object:
let app = {
    // check checkBox input:
    checkVaccinated: function () {
        if (vaccinatedInput.checked) return true;
        else {
            return false;
        }
    },

    checkDewormed: function () {
        if (dewormedInput.checked) return true;
        else {
            return false;
        }
    },

    checkSterilized: function () {
        if (sterilizedInput.checked) return true;
        else {
            return false;
        }
    },

    // Form Validation:
    validateForm: function () {
        // check unique id:
        let isDuplicateID = storageApp.listItems.some(
            (item) => item.id.toUpperCase() === idInput.value.toUpperCase()
        );
        if (isDuplicateID) {
            alert("ID must be unique!");
            return false;
        }

        // check Age:
        if (Number(ageInput.value) < 1 || Number(ageInput.value) > 15) {
            alert("Age must be between 1 and 15!");
            return false;
        }

        // check weight:
        if (Number(weightInput.value) < 1 || Number(weightInput.value) > 15) {
            alert("Weight must be between 1 and 15!");
            return false;
        }

        // check length:
        if (Number(lengthInput.value) < 1 || Number(lengthInput.value) > 100) {
            alert("Length must be between 1 and 15!");
            return false;
        }

        // check Type:
        if (typeInput.value === "select") {
            alert("Please select Type!");
            return false;
        }

        // check breed:
        if (breedInput.value === "select") {
            alert("Please select Breed!");
            return false;
        }
        return true;
    },

    // calculate BMI:
    calcBmi: function () {
        calcBmiButton.addEventListener("click", (event) => {
            event.preventDefault();
            storageApp.listItems.forEach((item) => {
                if (item.type === "Dog") {
                    item.bmi = `${
                        Math.round(
                            ((Number(item.weight) * 703) /
                                Number(item.length) ** 2) *
                                100
                        ) / 100
                    }`;
                } else if (item.type === "Cat") {
                    item.bmi = `${
                        Math.round(
                            ((Number(item.weight) * 886) /
                                Number(item.length) ** 2) *
                                100
                        ) / 100
                    }`;
                }
            });
            storageApp.renderListItems();
        });
    },

    // reload input after click submit:
    reloadInput: function () {
        idInput.value = "";
        nameInput.value = "";
        ageInput.value = "";
        typeInput.value = "select";
        weightInput.value = "";
        lengthInput.value = "";
        colorInput.value = "#000000";
        breedInput.value = "select";
        vaccinatedInput.checked = false;
        dewormedInput.checked = false;
        sterilizedInput.checked = false;
    },

    //heathy list:
    healthyListItems: [],

    // Filter healthy pet:
    filterHealthyPet: function () {
        filterHeathyBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (event.currentTarget.innerText === "Show Healthy Pet") {
                event.currentTarget.innerText = "Show All Pets";
                this.healthyListItems = storageApp.listItems.filter(
                    (item) =>
                        item.vaccinated && item.dewormed && item.sterilized
                );
                this.renderHealthyPet();
            }
            //show back all pets:
            else if (event.currentTarget.innerText === "Show All Pets") {
                event.currentTarget.innerText = "Show Healthy Pet";
                storageApp.renderListItems();
            }
        });
    },

    //render healthy pet:
    renderHealthyPet: function () {
        listContainer.innerHTML = "";
        this.healthyListItems.forEach((item, index) => {
            listContainer.innerHTML += `
                <div class="item grid">
                    <p class="id">${item.id}</p>
                    <p class="name">${item.name}</p>
                    <p class="age">${item.age}</p>
                    <p class="type">${item.type}</p>
                    <p class="weight">${item.weight}kg</p>
                    <p class="length">${item.length}cm</p>
                    <p class="breed">${item.breed}</p>
                    <p class="color"><span style= "background-color: ${item.color}"></span></p>
                    <p class="vaccinated">
                        <i class="fa-solid fa-circle-check"></i>
                    </p>
                    <p class="dewormed">
                        <i class="fa-solid fa-circle-check"></i>
                    </p>
                    <p class="sterilized">
                        <i class="fa-solid fa-circle-check"></i>
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
        this.calcBmi();
        this.filterHealthyPet();
    },
};

app.start();
