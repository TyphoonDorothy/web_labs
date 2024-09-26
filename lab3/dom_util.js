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
    <button id="${id}-edit" type="button" class="btn-info">
      Edit
    </button>
  </div>
</li>`;

export const clearInputs = () => {
  inputName.value = "";
  inputVolume.value = "";
  inputPassengers.value = "";
};

export const addItemToPage = ({ id, name, volume, passengers }) => {
  console.log("Adding item:", id, name, volume, passengers);

  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, name, volume, passengers })
  );
};

export const getInputValues = () => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: inputName.value,
    volume: inputVolume.value,
    passengers: inputPassengers.value,
  };
};

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};
