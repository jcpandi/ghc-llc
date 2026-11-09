@echo off
title Hero Cleaning - dev server
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  call npm install
)
echo Starting dev server at http://localhost:3000
call npm run dev
pause
