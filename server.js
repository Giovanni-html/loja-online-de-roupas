const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'the-new-era-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('✅ Conectado ao banco de dados SQLite');
  }
});

// Criar tabela de usuários
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('❌ Erro ao criar tabela:', err.message);
  } else {
    console.log('✅ Tabela users criada/verificada com sucesso');
  }
});

// Função para capitalizar primeira letra de cada palavra
function capitalizarNome(texto) {
  return texto
    .toLowerCase()
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
}

// Rota de registro
app.post('/api/register', async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Validar tamanho mínimo da senha
  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres' });
  }

  try {
    // Capitalizar nome de usuário
    username = capitalizarNome(username.trim());
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verificar se o email já existe
    db.get(
      'SELECT email FROM users WHERE email = ?',
      [email.toLowerCase()],
      (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao verificar email' });
        }

        if (row) {
          return res.status(400).json({ 
            error: 'Email já cadastrado',
            field: 'email'
          });
        }

        // Inserir usuário no banco
        db.run(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email.toLowerCase(), hashedPassword],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Erro ao criar usuário' });
            }

            console.log(`✅ Novo usuário registrado: ${username}`);
            res.status(201).json({ 
              message: 'Usuário criado com sucesso',
              userId: this.lastID 
            });
          }
        );
      }
    );
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de login
app.post('/api/login', (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Normalizar email
  email = email.toLowerCase().trim();

  db.get(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuário' });
      }

      if (!user) {
        return res.status(401).json({ 
          error: 'Email ou senha incorretos',
          field: 'credentials'
        });
      }

      try {
        // Verificar senha
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return res.status(401).json({ 
            error: 'Email ou senha incorretos',
            field: 'credentials'
          });
        }

        // Gerar token JWT
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        console.log(`✅ Login bem-sucedido: ${user.username} (${email})`);
        res.json({
          message: 'Login realizado com sucesso',
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        });
      } catch (error) {
        console.error('❌ Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  );
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rota protegida (exemplo)
app.get('/api/profile', authenticateToken, (req, res) => {
  db.get(
    'SELECT id, username, email, created_at FROM users WHERE id = ?',
    [req.user.id],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar perfil' });
      }
      res.json(user);
    }
  );
});

// Rota para listar todos os usuários (apenas para debug)
app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, email, created_at FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
    res.json(rows);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('  🚀 The New Era - Backend Server');
  console.log('========================================');
  console.log(`  📡 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`  🗄️  Banco de dados: SQLite (database.db)`);
  console.log('  📋 Rotas disponíveis:');
  console.log('     POST /api/register - Registrar usuário');
  console.log('     POST /api/login - Login');
  console.log('     GET  /api/profile - Perfil (autenticado)');
  console.log('     GET  /api/users - Listar usuários');
  console.log('========================================');
  console.log('');
});

// Fechar banco ao encerrar
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('🔒 Banco de dados fechado');
    process.exit(0);
  });
});
