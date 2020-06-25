let inputTitle = document.querySelector("#inputField input");
let inputText = document.querySelector("#inputField textarea");
let buttonElement = document.querySelector("#inputField button");
let cardElement = document.querySelector("#scrapsField");

let cards = JSON.parse(localStorage.getItem("card_list")) || [];

function renderCards() {
  cardElement.innerHTML = "";

  for (const item of cards) {
    // -----------------------------------------

    let card = document.createElement("div");
    card.setAttribute("class", "card text-white bg-dark m-2 w-25");
    card.setAttribute("style", "max-width: 1000px; min-width: 250px");

    let cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    let cardContent = document.createElement("p");
    cardContent.setAttribute("class", "card-text");

    let cardTitle = document.createTextNode(item.title);
    let cardText = document.createTextNode(item.text);

    let divButton = document.createElement("div");
    divButton.setAttribute("class", "d-flex justify-content-between");

    let removeButton = document.createElement("button");
    let editButton = document.createElement("button");

    let position = cards.indexOf(item);

    let textButton = document.createElement("i");
    textButton.setAttribute("class", "fas fa-trash-alt");

    removeButton.setAttribute("onclick", `deleteCard(${position})`);
    removeButton.setAttribute("class", "btn btn-danger");
    removeButton.setAttribute("type", "button");

    let textEditButton = document.createElement("i");
    textEditButton.setAttribute("class", "fas fa-edit");

    editButton.setAttribute("onclick", `####(${position})`);
    editButton.setAttribute("class", "btn btn-dark");
    editButton.setAttribute("type", "button");

    //  ---------------------------------------

    // ----------------------------------------

    cardElement.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardBody.appendChild(cardContent);

    cardContent.appendChild(cardText);
    cardHeader.appendChild(cardTitle);

    card.appendChild(divButton);

    divButton.appendChild(editButton);
    divButton.appendChild(removeButton);
    removeButton.appendChild(textButton);
    editButton.appendChild(textEditButton);
  }
}
renderCards();

function createCard() {
  let titleText = inputTitle.value;
  let text = inputText.value;
  if (validaDados(titleText, text)) {
    let card = {
      title: titleText,
      text: text,
    };
    cards.push(card);
    inputTitle.value = "";
    inputText.value = "";

    renderCards();
    saveInStorage();
  }
}

function validaDados(title, text) {
  if (title.length == 0) return alert(`Preencha todos os campos`);
  if (text.length == 0) return alert(`Preencha todos os campos`);
  return true;
}

buttonElement.onclick = createCard;

function saveInStorage() {
  localStorage.setItem("card_list", JSON.stringify(cards));
}

function deleteCard(position) {
  cards.splice(position, 1);
  renderCards();
}
