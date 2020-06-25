let inputTitle = document.querySelector("#inputField input");
let inputText = document.querySelector("#inputField textarea");
let buttonElement = document.querySelector("#inputField button");
let cardElement = document.querySelector("#scrapsField");

let cards = JSON.parse(localStorage.getItem("card_list")) || [];

function renderCards() {
  cardElement.innerHTML = "";

  for (const item of cards) {
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

    let removeButton = document.createElement("button");

    let position = cards.indexOf(item);

    removeButton.setAttribute("onclick", `deleteCard(${position})`);

    let textButton = document.createTextNode("Remover");
    removeButton.setAttribute("class", "btn btn-danger w-100");
    removeButton.setAttribute("type", "button");
    removeButton.onclick;

    cardElement.appendChild(card);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardBody.appendChild(cardContent);

    cardContent.appendChild(cardText);
    cardHeader.appendChild(cardTitle);

    card.appendChild(removeButton);
    removeButton.appendChild(textButton);
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
