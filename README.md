# The New Era - Loja Online de Roupas

## 🚀 Como Iniciar o Projeto

### Opção 1: Usando npm (Recomendado)
```bash
npm install
npm start
```

### Opção 2: Usando o script batch (Windows)
```bash
start.bat
```

### Opção 3: Usando o script shell
```bash
./start.sh
```

## ✨ Funcionalidades

- ✅ **Sistema de Login/Registro**: Autenticação completa com JWT
- ✅ **Banco de Dados**: SQLite para armazenar usuários
- ✅ **API REST**: Backend com Express.js
- ✅ **Design Responsivo**: Totalmente adaptado para mobile e desktop
- ✅ **Carrossel de Produtos**: Navegue entre os produtos com animações suaves
- ✅ **Senha Criptografada**: Usando bcrypt para segurança

## 🌐 URLs do Projeto

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **Banco de Dados**: SQLite (database.db)

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
    "username": "usuario",
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
├── index.html          # Página principal
├── styles.css          # Estilos principais + responsivo
├── login.css           # Estilos do modal de login
├── scripts.js          # JavaScript do carrossel + API
├── server.js           # Backend Node.js + Express
├── database.db         # Banco de dados SQLite
├── package.json        # Dependências do projeto
├── img/                # Imagens dos produtos
├── font/               # Fontes customizadas
└── start.bat/start.sh  # Scripts de inicialização
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
npm install
```

## 🗄️ Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução.

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

- O servidor roda na porta `3000`
- O backend serve os arquivos estáticos do frontend
- Para parar o servidor, pressione `Ctrl+C` no terminal
- O banco de dados é criado automaticamente no primeiro uso
