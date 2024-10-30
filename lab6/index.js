import {
    addItemToPage,
    renderItemsList,
    clearInputs,
    getInputValues,
} from "./dom_util.js";

import {
    getAllPLanes,
    postPlanes,
    deletePlanes,
    updatePlanes,
} from "./API/api.js";

const inputName = document.getElementById('input-name');
const inputVolume = document.getElementById('input-volume');
const inputPassengers = document.getElementById('input-passengers');
const itemsContainer = document.getElementById('items-container');
const modal = document.getElementById("modal");
const create = document.getElementById('create');
const findInput = document.getElementById('search-input');
const findButton = document.getElementById('search');
const cancelFindButton = document.getElementById('cancel');
const countPassengersButton = document.getElementById('count-passengers');
const passengerCountDisplay = document.getElementById('passenger-count');
const sortButton = document.getElementById('sort-button');
const sortOptions = document.getElementById('sort-options');
const openModalBtn = document.getElementById("create-plane");
const closeModalBtn = document.getElementsByClassName("close-btn")[0];

let planes = [];
let currentEditId = null;

create.addEventListener('click', async (event) => {
    event.preventDefault();

    const { name, volume, passengers } = getInputValues();
    clearInputs();

    if (currentEditId) {
        await updatePlanes(currentEditId, { name, volume, passengers });
        currentEditId = null;
    } else {
        await postPlanes({ name, volume, passengers });
    }

    refetchAllPlanes();
});

document.addEventListener("DOMContentLoaded", () => {
    modal.style.display = "none";
    document.body.classList.add('loaded');
    refetchAllPlanes();
});

const onRemoveItem = async (element) => {
    const id = element.target.id.split('-')[0];
    await deletePlanes(id);
    refetchAllPlanes();
}

const onEditItem = async (id) => {

    const planeToEdit = planes.find(plane => plane.id == id);
    if (planeToEdit) {
        inputName.value = planeToEdit.name;
        inputVolume.value = planeToEdit.volume;
        inputPassengers.value = planeToEdit.passengers;
        currentEditId = planeToEdit.id;
        modal.style.display = "block";
    } else {
        console.error("Plane not found for ID:", id);
        alert("Error: Plane not found.");
    }
};


document.addEventListener("click", async (event) => {
    if (event.target && event.target.classList.contains("btn-info")) {
        console.log("Edit button clicked, ID:", event.target.id);
        await onEditItem(event);
    }

    if (event.target && event.target.classList.contains("btn-del")) {
        const confirmDelete = confirm("Are you sure you want to delete this plane?");
        if (confirmDelete) {
            try {
                await onRemoveItem(event);
            } catch (error) {
                console.error(`Error deleting plane:`, error);
                alert('Error deleting plane. Please try again.');
            }
        }
    }
});

document.addEventListener("click", async (event) => {
    if (event.target && event.target.classList.contains("btn-info")) {
        const id = event.target.id.split("-")[0];
        console.log("Edit button clicked, ID:", id);
        await onEditItem(event);
    }

    if (event.target && event.target.classList.contains("btn-del")) {
        if (confirmDelete) {
            try {
                await onRemoveItem(event);
            } catch (error) {
                console.error(`Error deleting plane:`, error);
                alert('Error deleting plane. Please try again.');
            }
        }
    }
});



findButton.addEventListener("click", () => {
    const foundPlane = planes.filter(
      (plane) => plane.name.search(findInput.value) !== -1
    );

    renderItemsList(foundPlane, onEditItem, onRemoveItem);
});
  
cancelFindButton.addEventListener("click", () => {
    renderItemsList(planes, onEditItem, onRemoveItem);
    findInput.value = "";
});

countPassengersButton.addEventListener('click', () => {
    const totalPassengers = planes.reduce((sum, plane) => sum + Number(plane.passengers), 0);
    passengerCountDisplay.textContent = `Total number of passengers: ${totalPassengers}`;
});

sortButton.addEventListener('click', () => {
    const sortBy = sortOptions.value;

    if (sortBy === 'name') {
        planes.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'volume') {
        planes.sort((a, b) => Number(b.volume) - Number(a.volume));
    } else if (sortBy === 'passengers') {
        planes.sort((a, b) => Number(b.passengers) - Number(a.passengers)); 
    }

    renderItemsList(planes, onEditItem, onRemoveItem);
});

openModalBtn.onclick = function() {
    modal.style.display = "block";
};

closeModalBtn.onclick = function() {
    modal.style.display = "none";
    clearInputs();
    currentEditId = null;
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearInputs();
        currentEditId = null;
    }
};

async function refetchAllPlanes() {
    const allPlanes = await getAllPLanes();
    planes = allPlanes;
    renderItemsList(planes, onEditItem, onRemoveItem);
}

refetchAllPlanes();
