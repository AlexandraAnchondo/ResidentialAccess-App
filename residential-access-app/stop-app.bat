@echo off
echo ======================================
echo   Deteniendo Nginx... 
echo ======================================
cd /d C:\nginx
taskkill /f /im nginx.exe
pause
