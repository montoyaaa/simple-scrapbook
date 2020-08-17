import api from "./services/api";

// async function teste() {
//   const response = await api.get("/");

//   console.log(response.data);
// }

// teste();

class TaskList {
  constructor() {
    this.titleInput = document.getElementById("messageTitle");

    this.editTitleInput = document.getElementById("editMessageTitle");

    this.messageInput = document.getElementById("messageBody");

    this.editMessageInput = document.getElementById("editMessageBody");

    this.addButton = document.getElementById("addButton");

    this.btnSaveEdit = document.getElementById("saveEdit");

    this.scrapsField = document.getElementById("scrapsField");

    this.scraps = [];

    this.getScraps();
    this.setAddButtonEvents();
  }

  async getScraps() {
    const { data } = await api.get("/");

    this.scraps = data;
    this.renderScraps();
  }

  setAddButtonEvents() {
    this.addButton.onclick = () => this.addNewScrap();
  }

  setButtonEvents() {
    document.querySelectorAll(".delete-button").forEach((item) => {
      item.onclick = (event) => this.deleteScrap(event);
    });

    document.querySelectorAll(".edit-button").forEach((item) => {
      item.onclick = (event) => this.openEditModal(event);
    });
  }

  renderScraps() {
    this.scrapsField.innerHTML = "";

    for (const scrap of this.scraps) {
      this.generateScrap(scrap.id, scrap.title, scrap.message);
    }
    this.setButtonEvents();
  }

  generateScrap(id, title, message) {
    const cardHtml = this.createScrapCard(id, title, message);

    this.insertHtml(cardHtml);
    this.setButtonEvents();
  }

  async addNewScrap() {
    let newTitle = this.titleInput.value;
    let newMessage = this.messageInput.value;

    if (title == "" || message == "") {
      return alert("Preencha todos os campos ;)");
    }

    this.titleInput.value = "";
    this.messageInput.value = "";

    const {
      data: { id, title, message },
    } = await api.post("/", {
      title: newTitle,
      message: newMessage,
    });

    this.scraps.push({ id, title, message });

    this.generateScrap(id, title, message);
  }

  insertHtml(html) {
    this.scrapsField.innerHTML += html;
  }

  async deleteScrap(event) {
    event.path[2].remove();

    const scrapId = event.path[2].getAttribute("id-scrap");

    const scrapIndex = this.scraps.findIndex((scrap) => {
      return scrap.id == scrapId;
    });

    const response = await api.delete(`/${scrapId}`);

    this.scraps.splice(scrapIndex, 1);
  }

  openEditModal(event) {
    $("#editModal").modal("toggle");

    const scrapId = event.path[2].getAttribute("id-scrap");

    const scrapIndex = this.scraps.findIndex((scrap) => {
      return scrap.id == scrapId;
    });

    this.editTitleInput.value = this.scraps[scrapIndex].title;
    this.editMessageInput.value = this.scraps[scrapIndex].message;

    this.btnSaveEdit.onclick = () => this.saveChanges(scrapIndex, scrapId);
  }

  async saveChanges(scrapIndex, scrapId) {
    let title = this.editTitleInput.value;
    let message = this.editMessageInput.value;

    await api.put(`/${scrapId}`, {
      title,
      message,
    });

    this.scraps[scrapIndex] = { title, message };

    this.renderScraps();

    $("#editModal").modal("hide");
  }

  createScrapCard(id, title, message) {
    return `
  <div class="message-cards card text-white bg-dark m-2" id-scrap="${id}">
  <div class="card-header font-weight-bold">${title}</div>
  <div class="card-body">
                <p class="card-text">
                  ${message}
                </p>
              </div>
              <div class="w100 d-flex justify-content">
                <button
                  class="btn btn-dark w-50 fas fa-edit p-3 edit-button"
                ></button>
                <button class="btn btn-dark w-50 fas fa-trash-alt p-3 delete-button"></button>
              </div>
            </div>
  `;
  }
}

new TaskList();
