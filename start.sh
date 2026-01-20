#!/bin/bash

echo "========================================"
echo "  The New Era - Loja Online de Roupas"
echo "========================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "[ERRO] Node.js não encontrado!"
    echo "Por favor, instale o Node.js: https://nodejs.org/"
    exit 1
fi

echo "[INFO] Node.js encontrado: $(node --version)"
echo ""

# Verificar se as dependencias estao instaladas
if [ ! -d "backend/node_modules" ]; then
    echo "[INFO] Instalando dependências do backend..."
    cd backend
    npm install
    cd ..
fi

echo ""
echo "[INFO] Iniciando o servidor backend..."
echo "[INFO] Acesse: http://localhost:3000"
echo "[INFO] Pressione Ctrl+C para parar"
echo ""

cd backend
node src/server.js
