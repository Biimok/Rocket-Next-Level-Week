import Modal from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

//Pegar todos os botôes que existe com a classe check
const checkButtons = document.querySelectorAll(".actions a.check");

checkButtons.forEach(button => {
  //adicionar a escuta
  button.addEventListener("click", handleClick);
});

const deleteButtons = document.querySelectorAll(".actions a.delete");

deleteButtons.forEach(button => {
  //adicionar a escuta
  button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true){
  event.preventDefault();
  const text = check ? "Marcar como lida" : "Excluir";
  const slug = check ? "check" : "delete";
  const roomId = document.querySelector("#room-id").dataset.id;
  const questionId = event.target.dataset.id;

  const form = document.querySelector(".modal form");
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

  modalTitle.innerHTML = `${text} essa pergunta`;
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} essa pergunta?`;
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
  check ? modalButton.classList.remove("red") : modalButton.classList.add("red");
  //Abrir modal
  modal.open();
}

var idRoomButton = document.querySelector("#room-id");

idRoomButton.addEventListener("click", copyText);

function copyText(){
  let el = document.createElement('textarea');
  el.value = idRoomButton.dataset.id;
  el.setAttribute('class', 'sr-only');
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  document.execCommand("copy");
}