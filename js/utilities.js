"use strict";
//////////////////////////////////////
//////////////////////////////////////
//Declare all variables:

// sidebar:
const sideBar = document.querySelector("#side-bar");
const navApp = sideBar.querySelector(".app");
const navMore = sideBar.querySelector(".more");

//////////////////////////////////////
//////////////////////////////////////
// Date:
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

//////////////////////////////////////
//////////////////////////////////////
// Active Side Bar:
// handle sidebar:
function handleSidebar() {
    sideBar.classList.toggle("active");
    navApp.classList.toggle("hidden");
    navMore.classList.toggle("hidden");
}

sideBar.addEventListener("click", (event) => {
    const click = event.target;
    if (click === event.currentTarget) {
        handleSidebar();
    }
});
navMore.addEventListener("click", handleSidebar);
