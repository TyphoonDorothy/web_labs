import {
    addItemToPage,
    renderItemsList,
    clearInputs,
    getInputValues,
} from "./dom_util.js";

const create = document.getElementById('create');
const findInput = document.getElementById('search-input');
const findButton = document.getElementById('search');
const cancelFindButton = document.getElementById('cancel');

let planes = []; 

create.addEventListener('click', (event) => {
    event.preventDefault();
    let value = getInputValues();
    if (value != -1) {
        console.log(value);
        planes.push(value);
        addItemToPage(value);
        console.log(planes);
    }
});

findButton.addEventListener("click", () => {
    const foundPlane = planes.filter(
      (planes) => planes.name.search(findInput.value) !== -1
    );
  
    renderItemsList(foundPlane);
  });
  
  cancelFindButton.addEventListener("click", () => {
    renderItemsList(planes);
  
    findInput.value = "";
  });