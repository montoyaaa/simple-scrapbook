let titleInput = document.getElementById("messageTitle");
let messageInput = document.getElementById("messageBody");
let addButton = document.getElementById("addButton");
let scrapsField = document.getElementById("scrapsField");

let scraps = [];

function addNewScrap() {
  let title = titleInput.value;
  let message = messageInput.value;

  scrapsField.innerHTML = "";

  scraps.push({ title, message });

  for (const scrap of scraps) {
    scrapsField.innerHTML = createScrapCard(scrap.title, scrap.message);
  }
}

function createScrapCard(title, message) {
  return `
  <div class="message-cards card text-white bg-dark m-2">
    <div class="card-header font-weight-bold">${title}</div>
    <div class="card-body">
      <p class="card-text">
        ${message}
      </p>
    </div>
  </div>
  `;
}

addButton.onclick = addNewScrap;
