const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const itens = document.querySelectorAll(".item");
const pontos = document.querySelectorAll(".ponto");
const numero = document.querySelector(".numero-pg");
const list = document.querySelector(".itens-carrocel");

let ativo = 0;
const total = itens.length;
let timer;

function update(direction) {
  document.querySelector(".item.ativo").classList.remove("ativo");
  document.querySelector(".ponto.ativo").classList.remove("ativo");

  if (direction > 0) {
    ativo = ativo + 1;

    if (ativo === total) {
      ativo = 0;
    }
  } else if (direction < 0) {
    ativo = ativo - 1;

    if (ativo < 0) {
      ativo = total - 1;
    }
  }

  itens[ativo].classList.add("ativo");
  pontos[ativo].classList.add("ativo");

  numero.textContent = ativo + 1;
}

clearInterval(timer);
timer = setInterval(() => {
  update(1);
}, 5000);

prevButton.addEventListener("click", function () {
  update(-1);
});

nextButton.addEventListener("click", function () {
  update(1);
});

const botaoAbir = document.getElementById("abrir-popup");
const popupConta = document.querySelector(".container-conta ");

botaoAbir.addEventListener("click", () => {
  popupConta.classList.add("mostrar");
});

window.addEventListener("click", (event) => {
  if (!popupConta.contains(event.target) && event.target !== botaoAbir) {
    popupConta.classList.remove("mostrar");
  }
});
