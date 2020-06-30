let titleInput = document.getElementById("messageTitle");
let messageInput = document.getElementById("messageBody");
let addButton = document.getElementById("addButton");
let scrapsField = document.getElementById("scrapsField");

let scraps = [];

function renderScraps() {
  scrapsField.innerHTML = "";

  for (const scrap of scraps) {
    scrapsField.innerHTML += createScrapCard(scrap.title, scrap.message);
  }
}

function addNewScrap() {
  let title = titleInput.value;
  let message = messageInput.value;

  if (!messageTitle.value || !messageBody.value) {
    return alert("Todos os campos devem ser preenchidos!");
  }
  titleInput.value = "";
  messageInput.value = "";

  scraps.push({ title, message });

  renderScraps();
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
              <div class="w100 d-flex justify-content">
                <button
                  class="btn btn-dark w-50 fas fa-edit p-3"
                  data-toggle="modal"
                  data-target="#editModal"
                ></button>
                <button class="btn btn-dark w-50 fas fa-trash-alt p-3"></button>
              </div>
            </div>
  `;
}

addButton.onclick = addNewScrap;
