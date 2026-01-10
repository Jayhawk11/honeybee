@echo off
REM Windows Server Manager Script
REM Automatically kills existing processes and starts development server

echo ====================================
echo   HBCS Local Server Manager
echo ====================================
echo.

REM Check for Node processes on port 3000
echo Checking for existing server on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Found process %%a on port 3000
    taskkill //F //PID %%a 2>nul
    if !errorlevel! echo Killed process %%a
)

REM Wait a moment for cleanup
timeout /t 2 /nobreak >nul

REM Start development server
echo.
echo ====================================
echo   Starting Next.js Development Server
echo ====================================
echo.
echo   URL: http://localhost:3000
echo   Press Ctrl+C to stop
echo.
echo ====================================
echo.

npm run dev

endlocal
