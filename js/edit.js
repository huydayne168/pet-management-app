"use strict";

//////////////////////////////////////
//////////////////////////////////////
//Declare all variables:
const mainContent = document.querySelector("#main .content");
const listWrapper = document.querySelector("#list .list-wrapper");

const edit = {
    // list Items:
    listItems: JSON.parse(localStorage.getItem("petsList")),

    // render items form local storage:
    renderItems: function () {
        if (this.listItems) {
            listWrapper.innerHTML = "";
            this.listItems.forEach((item, index) => {
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
                <p class="action">
                    <button class="edit" data-index="${index}">Edit</button>
                </p>
            </div>`;
            });
        }
    },

    // when user click the edit button (in the list item):
    editFunction: function () {
        listWrapper.addEventListener("click", (e) => {
            if (e.target.classList.contains("edit")) {
                e.preventDefault();
                const editBtn = e.target;
                const number = editBtn.dataset.index;
                this.renderEditForm(this.listItems[number]);
                this.updatePetInfo(number);
            }
        });
    },

    // check checkBox input:
    checkCheckBox: function (checkbox) {
        if (checkbox.checked) return true;
        else {
            return false;
        }
    },

    // update pet information to edit form:
    updatePetInfo: function (number) {
        console.log(number);
        console.log(mainContent.querySelector("form"));
        const editForm = mainContent.querySelector("form");
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
        const editFormBtn = document.querySelector("form .edit-form");

        function updateBreedType() {
            const breedType = JSON.parse(localStorage.getItem("breedType"));
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
        }
        updateBreedType();

        function changeType() {
            typeInput.addEventListener("blur", () => {
                updateBreedType();
            });
        }
        changeType();

        // Form Validation:
        function validateForm() {
            // check Age:
            if (Number(ageInput.value) < 1 || Number(ageInput.value) > 15) {
                alert("Age must be between 1 and 15!");
                return false;
            }

            // check weight:
            if (
                Number(weightInput.value) < 1 ||
                Number(weightInput.value) > 15
            ) {
                alert("Weight must be between 1 and 15!");
                return false;
            }

            // check length:
            if (
                Number(lengthInput.value) < 1 ||
                Number(lengthInput.value) > 100
            ) {
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
        }

        editFormBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // update each inputs:
            if (validateForm()) {
                this.listItems[number].name = nameInput.value;
                this.listItems[number].age = ageInput.value;
                this.listItems[number].type = typeInput.value;
                this.listItems[number].weight = weightInput.value;
                this.listItems[number].length = lengthInput.value;
                this.listItems[number].color = colorInput.value;
                this.listItems[number].breed = breedInput.value;
                this.listItems[number].vaccinated =
                    this.checkCheckBox(vaccinatedInput);
                this.listItems[number].dewormed =
                    this.checkCheckBox(dewormedInput);
                this.listItems[number].sterilized =
                    this.checkCheckBox(sterilizedInput);

                // update local storage:
                localStorage.setItem(
                    "petsList",
                    JSON.stringify(this.listItems)
                );

                this.renderItems();
                console.log(this.listItems);
            }
        });
    },

    // Render Edit Form:
    renderEditForm: function (item) {
        //  delete edit form for a new one:
        if (mainContent.querySelector("form")) {
            mainContent.querySelector("form").remove();
        }
        // add input form to html
        mainContent.insertAdjacentHTML(
            "afterbegin",
            // edit form HTML:
            `<form class="input-form">
                <div class="grid">
                    <div class="id-wrapper">
                        <label for="id"> Pet ID </label>
                        <input
                            type="text"
                            name="id"
                            id="id"
                            placeholder="Input ID"
                            readonly
                            value = ${item.id}
                        />
                    </div>

                    <div class="name-wrapper">
                        <label for="name"> Pet Name </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Input Name"
                            value = ${item.name}

                        />
                    </div>

                    <div class="age-wrapper">
                        <label for="age"> Age </label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            placeholder="Input Age"
                            value = ${item.age}

                        />
                    </div>

                    <div class="type-wrapper">
                        <label for="pet-select"> Pet Type </label>
                        <select name="pets" id="pet-select">
                            <option value= ${item.type}
                            >
                                ${item.type}
                            </option>
                            ${
                                item.type === "cat"
                                    ? `<option value="Dog">Dog</option>`
                                    : `<option value="Cat">Cat</option>`
                            }
                        </select>
                    </div>

                    <div class="weight-wrapper">
                        <label for="weight"> Weight </label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            placeholder="Input Weight"
                            value = ${item.weight}
                        />
                    </div>

                    <div class="length-wrapper">
                        <label for="length"> Length </label>
                        <input
                            type="number"
                            name="length"
                            id="length"
                            placeholder="Input Length"
                            value = ${item.length}

                        />
                    </div>

                    <div class="color-wrapper">
                        <label for="color"> Color </label>
                            <input type="color" name="color" id="color" value = ${
                                item.color
                            }>
                    </div>

                    <div class="breed-wrapper">
                        <label for="breed-select"> Breed ID </label>
                        <select name="breeds" id="breed-select">
                            <option value="${item.breed}">
                                ${item.breed}
                            </option>
                            
                        </select>
                    </div>

                    <div class="check-heath">
                        <label for="vaccinated">
                            Vaccinated
                            <input
                                type="checkbox"
                                name="vaccinated"
                                id="vaccinated"
                                ${item.vaccinated ? "checked" : ""}
                            />
                        </label>

                        <label for="dewormed">
                            Dewormed
                            <input
                                type="checkbox"
                                name="dewormed"
                                id="dewormed"
                                ${item.dewormed ? "checked" : ""}

                            />
                        </label>

                        <label for="sterilized">
                            Sterilized
                            <input
                                type="checkbox"
                                name="sterilized"
                                id="sterilized"
                                ${item.sterilized ? "checked" : ""}
                            />
                        </label>
                    </div>
                </div>

                <div class="button-wrapper">
                    <button type="submit" class = "edit-form">Edit pet</button>
                </div>
            </form>`
        );
    },

    // start all function:
    start: function () {
        this.renderItems();
        this.editFunction();
    },
};

edit.start();
