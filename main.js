class TaskList {
  constructor() {
    this.titleInput = document.getElementById("messageTitle");

    this.messageInput = document.getElementById("messageBody");

    this.addButton = document.getElementById("addButton");

    this.scrapsField = document.getElementById("scrapsField");

    this.scraps = [];

    this.setAddButtonEvents();
  }

  generateScrapId() {
    return this.scraps.length + 1;
  }

  setAddButtonEvents() {
    this.addButton.onclick = () => this.addNewScrap();
  }

  setButtonEvents() {
    document.querySelectorAll(".delete-button").forEach((item) => {
      item.onclick = (event) => this.deleteScrap(event);
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

  addNewScrap() {
    let title = this.titleInput.value;
    let message = this.messageInput.value;

    this.titleInput.value = "";
    this.messageInput.value = "";

    const id = this.generateScrapId();

    this.scraps.push({ id, title, message });

    this.generateScrap(id, title, message);
  }

  deleteScrap(event) {
    event.path[2].remove();

    const scrapId = event.path[2].getAttribute("id-scrap");

    const scrapIndex = this.scraps.findIndex((scrap) => {
      return scrap.id == scrapId;
    });

    this.scraps.splice(scrapIndex, 1);
  }

  insertHtml(html) {
    this.scrapsField.innerHTML += html;
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
                  class="btn btn-dark w-50 fas fa-edit p-3"
                ></button>
                <button class="btn btn-dark w-50 fas fa-trash-alt p-3 delete-button"></button>
              </div>
            </div>
  `;
  }
}

new TaskList();
