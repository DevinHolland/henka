@echo off

REM Check if the correct number of arguments are provided
if "%~2"=="" (
    echo Usage: %0 ^<registry-username^> ^<registry-password^>
    exit /b 1
)

REM Check if the user is logged in to Azure
echo Checking Azure login status...
call az account show >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo You are not logged in to Azure. Please run 'az login' to log in.
    exit /b 1
)

REM Assign command-line arguments to variables
set "REGISTRY_USERNAME=%1"
set "REGISTRY_PASSWORD=%2"

REM Hardcoded variables
set "RESOURCE_GROUP=henka-app"
set "REGISTRY_NAME=henka"
set "CONTAINER_NAME=henka"
set "IMAGE_NAME=henka:latest"

REM Build the Docker image
echo Building Docker image...
docker build -t %IMAGE_NAME% .

REM Login to Azure Container Registry
echo Logging in to Azure Container Registry...
call az acr login --name %REGISTRY_NAME%

REM Tag the Docker image
echo Tagging Docker image...
docker tag %IMAGE_NAME% %REGISTRY_NAME%.azurecr.io/%IMAGE_NAME%

REM Push the Docker image to Azure Container Registry
echo Pushing Docker image to Azure Container Registry...
docker push %REGISTRY_NAME%.azurecr.io/%IMAGE_NAME%

REM Delete the old container instance if it exists
echo Deleting old container instance if it exists...
call az container delete --resource-group %RESOURCE_GROUP% --name %CONTAINER_NAME% --yes

REM Create a new container instance
echo Creating new container instance...
call az container create ^
    --resource-group %RESOURCE_GROUP% ^
    --name %CONTAINER_NAME% ^
    --image %REGISTRY_NAME%.azurecr.io/%IMAGE_NAME% ^
    --cpu 1 ^
    --memory 1 ^
    --registry-login-server %REGISTRY_NAME%.azurecr.io ^
    --registry-username %REGISTRY_USERNAME% ^
    --registry-password %REGISTRY_PASSWORD% ^
    --ip-address Public ^
    --dns-name-label %CONTAINER_NAME% ^
    --ports 80 ^
    --os-type Linux

REM Check the status of the container instance
echo Checking container instance status...
call az container show --resource-group %RESOURCE_GROUP% --name %CONTAINER_NAME% --query "{FQDN:ipAddress.fqdn,Status:instanceView.state}" --out table

echo Deployment complete.