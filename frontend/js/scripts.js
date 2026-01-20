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
    // Verificar se o clique não foi no popup, no botão de abrir, ou nos ícones de senha
    const isPasswordIcon = event.target.closest('.senha-usuario, .s-usuario');
    if (!popupConta.contains(event.target) && event.target !== botaoAbrir && !isPasswordIcon) {
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

// API Backend
const API_URL = 'http://localhost:3000/api';

// Função para capitalizar primeira letra de cada palavra
function capitalizarNome(texto) {
  return texto
    .toLowerCase()
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
}

// Adicionar evento de capitalização nos campos de nome de usuário
const usernameInputs = document.querySelectorAll('input[type="text"][placeholder*="usuario"], input[type="text"][placeholder*="Nome"]');
usernameInputs.forEach(input => {
  input.addEventListener('blur', function() {
    this.value = capitalizarNome(this.value);
  });
  
  input.addEventListener('input', function() {
    const cursorPos = this.selectionStart;
    const valorAnterior = this.value;
    this.value = capitalizarNome(this.value);
    
    // Manter cursor na posição correta
    if (valorAnterior !== this.value) {
      this.setSelectionRange(cursorPos, cursorPos);
    }
  });
});

// Função de Login
const loginForm = document.querySelector('.login form');
if (loginForm) {
  const emailInput = loginForm.querySelector('input[type="email"]');
  const passwordInput = loginForm.querySelector('input[type="password"]');
  const emailInputWrapper = emailInput.parentElement;
  const passwordInputWrapper = passwordInput.parentElement;

  // Remover erro ao digitar
  emailInput.addEventListener('input', function() {
    emailInputWrapper.classList.remove('error');
    passwordInputWrapper.classList.remove('error');
  });

  passwordInput.addEventListener('input', function() {
    emailInputWrapper.classList.remove('error');
    passwordInputWrapper.classList.remove('error');
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Limpar erros anteriores
    emailInputWrapper.classList.remove('error');
    passwordInputWrapper.classList.remove('error');
    
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Fechar modal
        popupConta.classList.remove('mostrar');
        
        // Atualizar UI
        atualizarUIUsuario(data.user);
        
        console.log('✅ Login realizado com sucesso:', data);
      } else {
        // Marcar campos como erro
        if (data.field === 'credentials') {
          emailInputWrapper.classList.add('error');
          passwordInputWrapper.classList.add('error');
        }
        alert(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
      alert('❌ Erro ao conectar com o servidor');
    }
  });
}

// Função de Registro
const registerForm = document.querySelector('.register form');
if (registerForm) {
  const emailInput = registerForm.querySelector('input[type="email"]');
  const emailInputWrapper = emailInput.parentElement;
  const originalPlaceholder = emailInput.placeholder;

  // Remover erro ao digitar no campo de email
  emailInput.addEventListener('input', function() {
    emailInputWrapper.classList.remove('error');
    this.placeholder = originalPlaceholder;
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Limpar erros anteriores
    emailInputWrapper.classList.remove('error');
    emailInput.placeholder = originalPlaceholder;
    
    const username = registerForm.querySelector('input[type="text"]').value;
    const email = emailInput.value;
    const password = registerForm.querySelector('input[type="password"]').value;

    // Validação adicional no frontend
    if (password.length < 6) {
      alert('❌ A senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Fazer login automático após registro
        const loginResponse = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Salvar token no localStorage
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('user', JSON.stringify(loginData.user));
          
          // Fechar modal
          popupConta.classList.remove('mostrar');
          popupConta.classList.remove('ativo');
          registerForm.reset();
          
          // Atualizar UI
          atualizarUIUsuario(loginData.user);
          
          console.log('✅ Registro e login realizados com sucesso:', loginData);
        }
      } else {
        // Verificar se o erro é de email duplicado
        if (data.field === 'email') {
          emailInputWrapper.classList.add('error');
          emailInput.placeholder = 'Já existe uma conta com este email';
          emailInput.value = '';
          console.log('❌ Email já cadastrado');
        } else {
          alert(`❌ Erro: ${data.error}`);
        }
      }
    } catch (error) {
      console.error('❌ Erro ao registrar:', error);
      alert('❌ Erro ao conectar com o servidor');
    }
  });
}

// Toggle mostrar/ocultar senha
const senhaUsuarioIcon = document.querySelector('.senha-usuario');
const sUsuarioIcon = document.querySelector('.s-usuario');

if (senhaUsuarioIcon) {
  senhaUsuarioIcon.style.cursor = 'pointer';
  senhaUsuarioIcon.addEventListener('click', function(e) {
    e.stopPropagation(); // Impede que o clique feche o modal
    const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      // Ícone de cadeado aberto
      this.innerHTML = `
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/>
      `;
    } else {
      passwordInput.type = 'password';
      // Ícone de cadeado fechado
      this.innerHTML = `
        <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
      `;
    }
  });
}

if (sUsuarioIcon) {
  sUsuarioIcon.style.cursor = 'pointer';
  sUsuarioIcon.addEventListener('click', function(e) {
    e.stopPropagation(); // Impede que o clique feche o modal
    const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      // Ícone de cadeado aberto
      this.innerHTML = `
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/>
      `;
    } else {
      passwordInput.type = 'password';
      // Ícone de cadeado fechado
      this.innerHTML = `
        <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
      `;
    }
  });
}

// Função para atualizar UI do usuário
function atualizarUIUsuario(user) {
  botaoAbrir.textContent = user.username;
  
  // Mudar comportamento do botão para toggle dropdown
  botaoAbrir.onclick = function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('show');
  };
}

// Função para fazer logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  botaoAbrir.textContent = 'conta';
  
  // Restaurar comportamento original do botão
  botaoAbrir.onclick = function() {
    popupConta.classList.add('mostrar');
  };
  
  const dropdown = document.getElementById('dropdown-menu');
  dropdown.classList.remove('show');
  
  console.log('✅ Logout realizado');
}

// Event listeners do dropdown
document.addEventListener('DOMContentLoaded', () => {
  const sairLink = document.getElementById('sair-link');
  const perfilLink = document.getElementById('perfil-link');
  const carrinhoLink = document.getElementById('carrinho-link');
  const favoritosLink = document.getElementById('favoritos-link');
  const dropdown = document.getElementById('dropdown-menu');

  if (sairLink) {
    sairLink.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }

  if (perfilLink) {
    perfilLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🔜 Página de perfil em desenvolvimento');
      dropdown.classList.remove('show');
    });
  }

  if (carrinhoLink) {
    carrinhoLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🔜 Carrinho em desenvolvimento');
      dropdown.classList.remove('show');
    });
  }

  if (favoritosLink) {
    favoritosLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🔜 Favoritos em desenvolvimento');
      dropdown.classList.remove('show');
    });
  }

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.conta-wrapper')) {
      dropdown.classList.remove('show');
    }
  });
});

// Verificar se usuário está logado ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    const userData = JSON.parse(user);
    atualizarUIUsuario(userData);
    console.log('✅ Usuário logado:', userData);
  }
});
