let titleInput = document.getElementById("messageTitle");
let editTitleInput = document.getElementById("editMessageTitle");
let messageInput = document.getElementById("messageBody");
let editMessageInput = document.getElementById("editMessageBody");
let addButton = document.getElementById("addButton");
let scrapsField = document.getElementById("scrapsField");
let btnSaveEdit = document.getElementById("saveEdit");

let scraps = JSON.parse(localStorage.getItem("scraps_list")) || [];

function renderScraps() {
  scrapsField.innerHTML = "";

  for (const scrap of scraps) {
    let position = scraps.indexOf(scrap);
    scrapsField.innerHTML += createScrapCard(
      scrap.title,
      scrap.message,
      position
    );
  }
  saveInStorage();
}
renderScraps();

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

function createScrapCard(title, message, position) {
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
                  onclick="openEditModal(${position})"
                ></button>
                <button class="btn btn-dark w-50 fas fa-trash-alt p-3" onclick="deleteCard(${position})"></button>
              </div>
            </div>
  `;
}

function deleteCard(position) {
  scraps.splice(position, 1);
  saveInStorage();
  renderScraps();
}

function openEditModal(position) {
  $("#editModal").modal("toggle");

  editTitleInput.value = scraps[position].title;
  editMessageInput.value = scraps[position].message;

  btnSaveEdit.setAttribute("onclick", `saveChanges(${position})`);
}

function saveChanges(position) {
  title = editTitleInput.value;
  message = editMessageInput.value;

  scraps[position].title = title;
  scraps[position].message = message;

  saveInStorage();
  renderScraps(position);
}

function saveInStorage() {
  localStorage.setItem("scraps_list", JSON.stringify(scraps));
}

btnSaveEdit.onclick = saveChanges;
addButton.onclick = addNewScrap;
