@echo off
chcp 65001 >nul
cls

echo ======================================
echo   Iniciando The New Era - Full Stack
echo ======================================
echo.

REM Verifica se o Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js não encontrado!
    echo Por favor, instale o Node.js: https://nodejs.org/
    pause
    exit /b 1
)

REM Verifica se as dependências estão instaladas
if not exist "node_modules\" (
    echo 📦 Instalando dependências...
    call npm install
)

echo 🚀 Iniciando servidores...
echo 📂 Diretório: %CD%
echo 🌐 Frontend: http://localhost:3000
echo 📡 Backend API: http://localhost:3000/api
echo 🗄️  Banco de dados: SQLite (database.db)
echo.
echo ✨ O servidor irá recarregar automaticamente ao salvar arquivos
echo ⏹️  Pressione Ctrl+C para parar os servidores
echo.
echo ======================================
echo.

REM Inicia o servidor backend (que também serve o frontend)
node server.js
