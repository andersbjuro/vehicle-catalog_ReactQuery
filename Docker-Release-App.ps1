$env:DOCKER_BUILDKIT = 1


#yarn --cwd .\src\UI build

#New-Item -ItemType "directory" -Path .\src\backend\wwwroot\
#Copy-Item .\src\UI\dist\* .\src\backend\wwwroot\ -Recurse -Force

docker build -t forba/fa-catalog-app:2.1.22 -f .\Dockerfile .
docker push forba/fa-catalog-app:2.1.22

#Remove-Item .\src\backend\wwwroot\ -Recurse -Force
