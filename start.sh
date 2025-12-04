#!/bin/bash

echo "======================================"
echo "  Iniciando The New Era - Full Stack"
echo "======================================"
echo ""

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "Por favor, instale o Node.js: https://nodejs.org/"
    exit 1
fi

# Verifica se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo "🚀 Iniciando servidores..."
echo "📂 Diretório: $(pwd)"
echo "🌐 Frontend: http://localhost:3000"
echo "📡 Backend API: http://localhost:3000/api"
echo "🗄️  Banco de dados: SQLite (database.db)"
echo ""
echo "✨ O servidor irá recarregar automaticamente ao salvar arquivos"
echo "⏹️  Pressione Ctrl+C para parar os servidores"
echo ""
echo "======================================"
echo ""

# Inicia o servidor backend (que também serve o frontend)
node server.js
