@echo off
echo Starting Weather App Backend...
cd backend
mvn spring-boot:run "-Dspring-boot.run.arguments=--weather.api.key=22299282fbe6c815dbac151e6a86444d"
pause
