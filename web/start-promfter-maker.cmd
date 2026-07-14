@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js 가 필요합니다.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo 의존성 설치 중...
  call npm install
)

if not exist "dist\index.html" (
  echo 빌드 중...
  call npm run build
)

start "" cmd /c "npm run preview -- --host 127.0.0.1 --port 4173"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173/"
