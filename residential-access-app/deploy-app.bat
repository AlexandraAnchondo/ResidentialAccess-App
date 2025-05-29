@echo off
echo ======================================
echo   Iniciando proceso de despliegue...
echo ======================================

:: Paso 1: Build del proyecto (asegúrate de estar en la carpeta del frontend)
echo ======================================
echo   Ejecutando build del proyecto... 
echo ======================================
call npm run build

:: Paso 2: Borrar carpeta html en Nginx y copiar los nuevos archivos
echo ======================================
echo   Reemplazando archivos en C:\nginx\html... 
echo ======================================
rmdir /s /q C:\nginx\html
xcopy /s /e /y /i .\build C:\nginx\html

:: Paso 3: Detener Nginx
echo ======================================
echo   Deteniendo Nginx... 
echo ======================================
cd /d C:\nginx
nginx -s stop

:: Paso 4: Iniciar Nginx
echo ======================================
echo   Iniciando Nginx... 
echo ======================================
start nginx

echo ======================================
echo  Despliegue completado correctamente
echo ======================================
pause
