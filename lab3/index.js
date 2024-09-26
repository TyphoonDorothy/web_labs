import {
    addItemToPage,
    renderItemsList,
    clearInputs,
    getInputValues,
} from "./dom_util.js";

const create = document.getElementById('create');
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
