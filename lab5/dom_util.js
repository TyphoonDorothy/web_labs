const inputName = document.getElementById('input-name');
const inputVolume = document.getElementById('input-volume');
const inputPassengers = document.getElementById('input-passengers');
const itemsContainer = document.getElementById('items-container');

const itemTemplate = ({ id, name, volume, passengers }) => `
<li id="${id}" class="card mb-3 item-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/5566/5566691.png"
    class="item-container__image card-img-top" alt="card" style="width=45px">
  <div class="card-body">
    <p class="card-title">Name: ${name}</p>
    <p class="card-text-volume">Fuel volume: ${volume} litres</p>
    <p class="card-text-passengers">Number of passengers: ${passengers} people</p>
    <button id="${id}${EDIT_BUTTON_SUFFIX}" type="button" class="btn-info">
      Edit
    </button>
    <button id="${id}-delete" type="button" class="btn-del">
      Delete
    </button>
  </div>
</li>`;

export const EDIT_BUTTON_SUFFIX = '-edit';

export const clearInputs = () => {
  inputName.value = "";
  inputVolume.value = "";
  inputPassengers.value = "";
};

export const addItemToPage = ({ id, name, volume, passengers }, onEditItem) => {
  itemsContainer.insertAdjacentHTML(
      "afterbegin",
      itemTemplate({ id, name, volume, passengers })
  );

  const editButton = document.getElementById(`${id}${EDIT_BUTTON_SUFFIX}`);
  editButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event bubbling
      onEditItem(id); // Pass the ID directly
  });
};


export const getInputValues = () => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: inputName.value.trim(),
    volume: inputVolume.value.trim(),
    passengers: inputPassengers.value.trim(),
  };
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item, onEditItem, onRemoveItem);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("create-plane");
  const closeModalBtn = document.getElementsByClassName("close-btn")[0];

  openModalBtn.onclick = function() {
    modal.style.display = "block";
  };

  closeModalBtn.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
