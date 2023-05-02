//////////////////////////////////////////
//////////////////////////////////////////
// Declare Variable:
const inputBreed = document.querySelector("input#breed");
const inputType = document.querySelector("select#pet-select");
const submitBtn = document.querySelector('button[type="submit"]');
const listWrapper = document.querySelector("#list .list-wrapper");

//////////////////////////////////////////
//////////////////////////////////////////
// Breed Object:
const breed = {
    // Breed list:
    listItems: JSON.parse(localStorage.getItem("breedItems")) ?? [],

    // save Items:
    saveItems: function () {
        submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.checkInput()) {
                this.listItems.push({
                    breed: `${inputBreed.value}`,
                    type: `${inputType.value}`,
                });
                localStorage.setItem(
                    "breedItems",
                    JSON.stringify(this.listItems)
                );
                this.storeBreedType();
                this.reloadInput();
                console.log(this.listItems);
                console.log(this.breedTypeList);
            }
            this.renderItems();
        });
    },

    // reload Input function:
    reloadInput: function () {
        inputBreed.value = "";
        inputType.value = "select";
    },

    deleteItems: function () {
        listWrapper.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete")) {
                const deleteBtn = event.target;
                this.listItems.splice(deleteBtn.dataset.index, 1);
                localStorage.setItem(
                    "breedItems",
                    JSON.stringify(this.listItems)
                );
                this.renderItems();
                console.log(this.listItems);
            }
            this.storeBreedType();
        });
    },

    //// Breed types area:
    breedTypeList: JSON.parse(localStorage.getItem("breedType")) ?? {},

    updateBreedType: function (ele) {
        this.breedTypeList[ele] = [];
        let typesArray = this.listItems.filter((item) => {
            return item.type === ele;
        });

        typesArray.forEach((item) => {
            this.breedTypeList[ele].push(item.breed);
        });
    },

    checkInput: function () {
        // check duplicate
        let isDuplicate = breed.listItems.some(
            (item) =>
                item.type === inputType.value && item.breed === inputBreed.value
        );
        if (isDuplicate) {
            alert("Đã có!");
            return false;
        }

        if (!inputBreed.value || inputType.value === "select") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return false;
        }

        return true;
    },

    storeBreedType: function () {
        inputType.querySelectorAll("option").forEach((item) => {
            if (item.value !== "select") {
                this.updateBreedType(item.value);
                localStorage.setItem(
                    "breedType",
                    JSON.stringify(this.breedTypeList)
                );
            }
        });
    },

    // render Items:
    renderItems: function () {
        listWrapper.innerHTML = "";
        this.listItems.forEach((item, index) => {
            listWrapper.innerHTML += `
            <div class="item grid">
                <p class="id">${index + 1}</p>
                <p class="breed">${item.breed}</p>
                <p class="type">${item.type}</p>
                <p class="action">
                    <button
                        class="delete"
                        data-index="${index}"
                    >
                        Delete
                    </button>
                </p>
            </div>`;
        });
    },

    start: function () {
        this.saveItems();
        this.renderItems();
        this.deleteItems();
    },
};

breed.start();
