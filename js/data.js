"use strict";

const exportFileBtn = document.querySelector("button.export-btn");
const importFileBtn = document.querySelector("button.import-btn");
/////// Export files:
exportFileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // var userInput = document.getElementById("myText").value;

    var blob = new Blob([JSON.parse(localStorage.getItem("petsList"))], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "dynamic.txt");
});

/////// Import Files:

var file = document.getElementById("file").files[0];
if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        document.getElementById("file").innerHTML = evt.target.result;
    };
    reader.onerror = function (evt) {
        document.getElementById("file").innerHTML = "error reading file";
    };
}
importFileBtn.addEventListener("click", (e) => {
    e.preventDefault();
});
