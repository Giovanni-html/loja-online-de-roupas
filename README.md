# The New Era - Loja Online de Roupas

## 🚀 Como Iniciar o Projeto

### Instalação
```bash
# Instalar todas as dependências (raiz + backend + frontend)
npm run install:all
```

### Opção 1: Iniciar tudo junto (Recomendado para desenvolvimento)
```bash
npm run dev
```
Isso inicia o backend (porta 3000) e o frontend com live-reload (porta 8080).

### Opção 2: Iniciar apenas o backend
```bash
npm run backend
```
O site estará disponível em `http://localhost:3000`

### Opção 3: Iniciar frontend e backend separadamente
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend (com live-reload)
npm run frontend
```

## ✨ Funcionalidades

- ✅ **Sistema de Login/Registro**: Autenticação completa com JWT
- ✅ **Banco de Dados**: SQLite para armazenar usuários
- ✅ **API REST**: Backend com Express.js
- ✅ **Design Responsivo**: Totalmente adaptado para mobile e desktop
- ✅ **Carrossel de Produtos**: Navegue entre os produtos com animações suaves
- ✅ **Senha Criptografada**: Usando bcrypt para segurança

## 🌐 URLs do Projeto

- **Aplicação (via backend)**: http://localhost:3000
- **Frontend Dev (live-reload)**: http://localhost:8080
- **API REST**: http://localhost:3000/api

## 📡 Rotas da API

### Autenticação
- `POST /api/register` - Registrar novo usuário
  ```json
  {
    "username": "usuario",
    "email": "email@exemplo.com",
    "password": "senha123"
  }
  ```

- `POST /api/login` - Fazer login
  ```json
  {
    "email": "email@exemplo.com",
    "password": "senha123"
  }
  ```

### Protegidas (requer token)
- `GET /api/profile` - Obter perfil do usuário
  - Header: `Authorization: Bearer {token}`

### Debug
- `GET /api/users` - Listar todos os usuários

## 📱 Testando no Mobile

1. Abra o navegador em `http://localhost:3000`
2. Pressione `F12` para abrir as ferramentas de desenvolvedor
3. Clique no ícone de dispositivo móvel (ou `Ctrl+Shift+M`)
4. Selecione um dispositivo móvel da lista

## 🛠️ Tecnologias

### Frontend
- HTML5
- CSS3 (com Media Queries para responsividade)
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js
- SQLite3
- bcryptjs (criptografia de senhas)
- jsonwebtoken (JWT para autenticação)
- CORS

## 📂 Estrutura do Projeto

```
.
├── frontend/                # Código do frontend
│   ├── index.html           # Página principal
│   ├── css/
│   │   ├── styles.css       # Estilos principais + responsivo
│   │   └── login.css        # Estilos do modal de login
│   ├── js/
│   │   └── scripts.js       # JavaScript do carrossel + API
│   ├── assets/
│   │   ├── img/             # Imagens dos produtos
│   │   └── fonts/           # Fontes customizadas
│   └── package.json         # Dependências do frontend
│
├── backend/                 # Código do backend
│   ├── src/
│   │   └── server.js        # Servidor Express + API
│   ├── data/
│   │   └── database.db      # Banco de dados SQLite
│   └── package.json         # Dependências do backend
│
├── package.json             # Scripts de conveniência (raiz)
├── README.md                # Esta documentação
├── start.bat                # Script Windows
└── start.sh                 # Script Linux/Mac
```

## 🎨 Breakpoints Responsivos

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## ⚙️ Requisitos

- Node.js (v14 ou superior)
- npm (vem com o Node.js)

## 🔧 Instalação das Dependências

```bash
# Instalar tudo de uma vez
npm run install:all

# Ou instalar separadamente
npm install                  # Raiz
cd backend && npm install    # Backend
cd frontend && npm install   # Frontend
```

## 🗄️ Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução.
Localização: `backend/data/database.db`

### Estrutura da Tabela `users`
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## 🔐 Segurança

- Senhas são criptografadas com bcrypt (10 rounds)
- Autenticação via JWT com expiração de 24h
- Tokens armazenados no localStorage do navegador
- CORS habilitado para desenvolvimento

## 📝 Notas

- O backend roda na porta `3000`
- O frontend dev (com live-reload) roda na porta `8080`
- Para parar o servidor, pressione `Ctrl+C` no terminal
- O banco de dados é criado automaticamente no primeiro uso
