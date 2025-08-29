const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const itens = document.querySelectorAll(".item");

if (prevButton && nextButton && itens.length > 0) {
  const pontos = document.querySelectorAll(".ponto");
  const numero = document.querySelector(".numero-pg");
  let ativo = 0;
  const total = itens.length;
  let timer;

  const updateCarousel = (direction) => {
    clearInterval(timer);

    document.querySelector(".item.ativo").classList.remove("ativo");
    document.querySelector(".ponto.ativo").classList.remove("ativo");

    if (direction > 0) {
      ativo = (ativo + 1) % total;
    } else {
      ativo = (ativo - 1 + total) % total;
    }

    itens[ativo].classList.add("ativo");
    pontos[ativo].classList.add("ativo");
    numero.textContent = ativo + 1;

    timer = setInterval(() => updateCarousel(1), 5000);
  };

  prevButton.addEventListener("click", () => {
    updateCarousel(-1);
  });

  nextButton.addEventListener("click", () => {
    updateCarousel(1);
  });

  timer = setInterval(() => updateCarousel(1), 5000);
}

const botaoAbrir = document.getElementById("abrir-popup");
const popupConta = document.querySelector(".container-conta");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

if (botaoAbrir && popupConta && registerBtn && loginBtn) {
  botaoAbrir.addEventListener("click", () => {
    popupConta.classList.add("mostrar");
  });

  window.addEventListener("click", (event) => {
    if (!popupConta.contains(event.target) && event.target !== botaoAbrir) {
      popupConta.classList.remove("mostrar");
    }
  });

  registerBtn.addEventListener("click", () => {
    popupConta.classList.add("ativo");
  });

  loginBtn.addEventListener("click", () => {
    popupConta.classList.remove("ativo");
  });
}
