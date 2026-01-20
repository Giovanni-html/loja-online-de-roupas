@echo off
echo ========================================
echo   The New Era - Loja Online de Roupas
echo ========================================
echo.

:: Verificar se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Node.js encontrado: 
node --version
echo.

:: Verificar se as dependencias estao instaladas
if not exist "backend\node_modules" (
    echo [INFO] Instalando dependencias do backend...
    cd backend
    call npm install
    cd ..
)

echo.
echo [INFO] Iniciando o servidor backend...
echo [INFO] Acesse: http://localhost:3000
echo [INFO] Pressione Ctrl+C para parar
echo.

cd backend
node src/server.js
